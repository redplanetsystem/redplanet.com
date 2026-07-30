"""
core/trade_executor.py
Suggest and execute trades (dry-run by default). Persist intents to data/trade_state.json via StateManager.
"""
from __future__ import annotations

import logging
from typing import Dict, Any, Optional

import pandas as pd

from core.TEDx_git import explainable_confluence, atr
from core.state_manager import state_manager

logger = logging.getLogger("trade_executor")
logger.setLevel(logging.INFO)


def determine_lot_size(equity: float, risk_pct: float, atr_value: float, price: float, risk_multiplier: float = 1.0) -> float:
    try:
        if atr_value <= 0 or price <= 0 or equity <= 0:
            return 0.0
        # simple lot sizing: risk_amount / (atr * price) scaled
        dollar_risk_per_unit = atr_value
        risk_amount = equity * float(risk_pct) * float(risk_multiplier)
        units = risk_amount / max(dollar_risk_per_unit, 1e-8)
        return max(0.0, float(units))
    except Exception:
        return 0.0


def suggest_trade(df: pd.DataFrame, symbol: str, equity: float = 10000.0, api_key: Optional[str] = None) -> Dict[str, Any]:
    explanation = explainable_confluence(df, symbol, api_key)
    score = float(explanation.get("score", 0.0))
    latest_close = float(df['close'].iloc[-1]) if 'close' in df and len(df['close']) else 0.0
    current_atr = float(atr(df).iloc[-1]) if 'high' in df and 'low' in df and not atr(df).empty else 0.0

    side = "none"
    if score > 0.66:
        side = "buy"
    elif score < 0.33:
        side = "sell"

    lot = determine_lot_size(equity=equity, risk_pct=0.01, atr_value=current_atr or 1e-8, price=latest_close or 1.0)

    return {
        "symbol": symbol,
        "side": side,
        "score": score,
        "price": latest_close,
        "atr": current_atr,
        "lot": lot,
        "explanation": explanation,
    }


def execute_trade(trade: Dict[str, Any], dry_run: bool = True) -> Dict[str, Any]:
    try:
        if trade.get("side") == "none" or trade.get("lot", 0) <= 0:
            return {"status": "skipped", "reason": "no-signal-or-size-zero"}

        record = {
            "trade": trade,
            "ts": pd.Timestamp.utcnow().isoformat(),
            "result": "simulated" if dry_run else "submitted",
        }

        trades = state_manager.get("trades", [])
        if not isinstance(trades, list):
            trades = []
        trades.append(record)
        state_manager.set("trades", trades)
        return {"status": "ok", "record": record}
    except Exception as e:
        logger.exception("execute_trade failed")
        return {"status": "error", "error": str(e)}
