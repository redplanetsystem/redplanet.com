"""
app.py - Streamlit Mission Control (strict left sidebar and pages)
Feature-flagged live TV (reads data/engine_status.json) and safe fallbacks.
"""
from __future__ import annotations

import json
import os
import threading
import time
from pathlib import Path
from typing import Any, Dict

import pandas as pd
import streamlit as st

from core.state_manager import StateManager

DATA_DIR = Path("data")
DATA_DIR.mkdir(parents=True, exist_ok=True)

ENGINE_STATUS = DATA_DIR / "engine_status.json"
TRADE_STATE = DATA_DIR / "trade_state.json"

# ensure files exist
if not ENGINE_STATUS.exists():
    ENGINE_STATUS.write_text(json.dumps({"engine": {"status": "stopped"}, "metrics": {}}, indent=2))
if not TRADE_STATE.exists():
    TRADE_STATE.write_text(json.dumps({"trades": []}, indent=2))

# cinematic CSS (compact)
CINEMATIC_CSS = """
<style>
:root{--bg-1:#04060b;--bg-2:#080e1a;--accent-cyan:#00f3ff;--accent-magenta:#ff0055;--accent-amber:#ffb700;--accent-emerald:#00ff66;--accent-violet:#7928ca;--glass:rgba(0,243,255,0.15)}
[data-testid="stAppViewContainer"] > .main {background: linear-gradient(180deg,var(--bg-1),var(--bg-2)); color: #e8fbff;}
.app-card{background:rgba(255,255,255,0.02);padding:12px;border-radius:12px;border:1px solid rgba(0,243,255,0.06);backdrop-filter:blur(6px)}
.sidebar {position: fixed; left: 12px; top: 12px; bottom: 12px; width: 300px;}
.main-area {margin-left: 336px; padding: 24px;}
.tv-frame{border-radius:10px;padding:8px;background:linear-gradient(180deg,rgba(8,12,20,0.9),rgba(0,0,0,0.6));border:1px solid rgba(121,40,202,0.08)}
.tv-screen{border-radius:6px;padding:14px;color:var(--accent-amber);min-height:220px;position:relative}
</style>
"""

st.set_page_config(page_title="Red Planet — Mission Control", layout="wide")
st.markdown(CINEMATIC_CSS, unsafe_allow_html=True)

PAGES = [
    "System Status",
    "Portfolio Overview",
    "Live TV & Global Signal Feed",
    "Trade History",
    "Risk Management",
    "Indicators & Analytics",
    "Symbols & Assets",
    "Streaming & API Hub",
    "VPN & Proxy Tunneling",
    "Marketing Suite",
    "External Platform Integrations",
    "Community Members Portal",
    "Collaborators",
    "Activity Log",
    "Terminal Report",
]

# left sidebar (strict placement)
with st.container():
    st.markdown('<div class="sidebar app-card">', unsafe_allow_html=True)
    st.title("RED PLANET")
    st.write("The Operating System of Reality")
    page = st.radio("Navigation", PAGES, index=2)
    st.markdown('</div>', unsafe_allow_html=True)

# main area
st.markdown('<div class="main-area">', unsafe_allow_html=True)
st.markdown('<div class="app-card">', unsafe_allow_html=True)
st.header(page)

state = StateManager(path=str(ENGINE_STATUS))

if page == "Live TV & Global Signal Feed":
    st.subheader("RED PLANET & INTERZONE LIVE BROADCAST TV")
    st.markdown('<div class="tv-frame">', unsafe_allow_html=True)
    st.markdown('<div class="tv-screen">', unsafe_allow_html=True)

    # Read engine status safely
    try:
        engine = state.get('engine', {})
    except Exception:
        engine = {"status": "unknown"}

    st.write(f"Engine status: {engine.get('status')}")

    # live news: optional
    FINNHUB = os.environ.get('FINNHUB_API_KEY') or os.environ.get('NEXT_PUBLIC_FINNHUB_API_KEY')
    news = []
    if FINNHUB:
        try:
            import requests

            r = requests.get(f"https://finnhub.io/api/v1/news?category=general&token={FINNHUB}", timeout=5)
            if r.ok:
                items = r.json()[:6]
                news = [i.get('headline') or i.get('summary') for i in items]
        except Exception:
            news = ["news fetch error — using demo feed"]
    if not news:
        news = ["Demo: Markets mixed; telemetry nominal", "Demo: No API key configured for Finnhub"]

    for i, n in enumerate(news, 1):
        st.markdown(f"**{i}.** {n}")

    st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

elif page == "System Status":
    st.subheader("System Status")
    st.write(state.get())

elif page == "Trade History":
    st.subheader("Trade History")
    trades = state.get('trades', [])
    df = pd.DataFrame(trades)
    if not df.empty:
        st.dataframe(df, use_container_width=True)
    else:
        st.info("No trades recorded yet")

else:
    st.write(f"{page} — Module coming soon. Placeholders are available for integrations and management.")

st.markdown('</div>', unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)
