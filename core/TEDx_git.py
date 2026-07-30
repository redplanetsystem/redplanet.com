"""
core/TEDx_git.py
Indicator implementations (EMA, RSI, ATR) and explainable confluence scoring.
"""
from __future__ import annotations

import math
from typing import Dict, Any, Optional

import numpy as np
import pandas as pd
import requests


def ema(series: pd.Series, period: int) -> pd.Series:
    if series is None or period <= 0:
        return pd.Series(dtype=float)
    return series.ewm(span=period, adjust=False).mean()


def rsi(series: pd.Series, period: int = 14) -> pd.Series:
    if series is None or len(series) < 2:
        return pd.Series(dtype=float)
    delta = series.diff()
    up = delta.clip(lower=0)
    down = -1 * delta.clip(upper=0)
    ma_up = up.ewm(alpha=1 / period, min_periods=period).mean()
    ma_down = down.ewm(alpha=1 / period, min_periods=period).mean()
    rs = ma_up / ma_down
    rs = rs.replace([np.inf, -np.inf], np.nan).fillna(0)
    return 100 - (100 / (1 + rs))


def atr(df: pd.DataFrame, period: int = 14) -> pd.Series:
    if df is None or not {'high', 'low', 'close'}.issubset(df.columns):
        return pd.Series(dtype=float)
    high = df['high']
    low = df['low']
    close = df['close']
    tr1 = high - low
    tr2 = (high - close.shift()).abs()
    tr3 = (low - close.shift()).abs()
    tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
    return tr.rolling(window=period, min_periods=1).mean()


def sentiment_from_finnhub(symbol: str, api_key: str) -> Dict[str, Any]:
    if not api_key:
        return {"score": 0.0, "summary": "no-api-key"}
    try:
        url = f"https://finnhub.io/api/v1/news-sentiment?symbol={symbol}&token={api_key}"
        resp = requests.get(url, timeout=5)
        resp.raise_for_status()
        payload = resp.json()
        # defensive extraction
        score = float(payload.get('companyProfile', {}).get('score', 0.0)) if isinstance(payload, dict) else 0.0
        return {"score": score, "summary": str(payload)[:400]}
    except Exception as e:
        return {"score": 0.0, "summary": f"error:{e}"}


def explainable_confluence(df: pd.DataFrame, symbol: str = "", api_key: Optional[str] = None) -> Dict[str, Any]:
    """
    Compute a confluence score and return both numeric score and human-readable reasoning.
    """
    try:
        reasons = []
        score = 0.0
        weight_total = 0.0

        close = df['close'].dropna() if 'close' in df else pd.Series(dtype=float)
        if len(close) < 3:
            return {"score": 0.0, "reasons": ["insufficient data"]}

        # EMA bias (short vs long)
        ema_short = ema(close, 12).iloc[-1]
        ema_long = ema(close, 50).iloc[-1]
        if ema_short > ema_long:
            score += 0.25
            reasons.append("EMA: short-term trend above long-term (bullish)")
        else:
            reasons.append("EMA: short-term not above long-term (bearish or neutral)")
        weight_total += 0.25

        # RSI neutrality
        r = float(rsi(close).iloc[-1]) if not rsi(close).empty else 50.0
        r_score = max(0.0, 1.0 - abs((r - 50) / 50.0))
        score += 0.25 * r_score
        reasons.append(f"RSI: {r:.1f} (scaled contribution {0.25 * r_score:.3f})")
        weight_total += 0.25

        # ATR volatility: lower ATR relative to price suggests tighter risk
        a = float(atr(df).iloc[-1]) if not atr(df).empty else 0.0
        price = float(close.iloc[-1]) if len(close) else 1.0
        vol_score = 1.0 if a < (0.02 * price) else 0.5
        score += 0.25 * vol_score
        reasons.append(f"ATR: {a:.5f} (volatility score {vol_score})")
        weight_total += 0.25

        # Sentiment
        s = sentiment_from_finnhub(symbol, api_key or "")
        sent_score = 1.0 if s.get('score', 0) > 0 else 0.5
        score += 0.25 * sent_score
        reasons.append(f"Sentiment: {s.get('score', 0)}")
        weight_total += 0.25

        normalized = min(max(score / max(weight_total, 1e-6), 0.0), 1.0)
        return {"score": normalized, "raw_score": score, "reasons": reasons}
    except Exception as e:
        return {"score": 0.0, "reasons": [f"error:{e}"]}
