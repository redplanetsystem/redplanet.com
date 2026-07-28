"""
run_expert_sniper_pro_v2.py
Autonomous engine skeleton that updates engine_status.json atomically. Dry-run by default.
"""
from __future__ import annotations

import argparse
import logging
import signal
import sys
import threading
import time
from pathlib import Path
from typing import Optional

import pandas as pd

from core.state_manager import StateManager
from core.trade_executor import suggest_trade, execute_trade

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s - %(message)s")
logger = logging.getLogger("expert_sniper")


def run_engine(loop_interval: float = 10.0, dry_run: bool = True, symbols: Optional[list] = None):
    state = StateManager(path="data/engine_status.json")
    stop_event = threading.Event()

    def _signal_handler(signum, frame):
        logger.info("signal received: %s", signum)
        stop_event.set()

    signal.signal(signal.SIGINT, _signal_handler)
    signal.signal(signal.SIGTERM, _signal_handler)

    symbols = symbols or ["MOCK:USD"]
    logger.info("engine starting (dry_run=%s) symbols=%s", dry_run, symbols)
    state.set("engine", {"status": "starting", "pid": None})

    try:
        while not stop_event.is_set():
            for sym in symbols:
                try:
                    # In real scenario you'd pull real market data. Here we mock a short dataframe.
                    df = pd.DataFrame({
                        "open": [1.0, 1.05, 1.02],
                        "high": [1.06, 1.07, 1.08],
                        "low": [0.98, 1.0, 1.01],
                        "close": [1.03, 1.04, 1.05],
                    })
                    suggestion = suggest_trade(df, symbol=sym, equity=10000.0, api_key=None)
                    result = execute_trade(suggestion, dry_run=dry_run)
                    state.set("engine", {"status": "running", "last_tick": time.time(), "last_result": result})
                except Exception:
                    logger.exception("symbol loop error")
            # heartbeat
            state.update_metrics("last_loop", time.time())
            time.sleep(loop_interval)
    except Exception:
        logger.exception("engine encountered an error")
    finally:
        state.set("engine", {"status": "stopped", "stopped_at": time.time()})
        logger.info("engine stopped")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--interval", type=float, default=10.0)
    parser.add_argument("--dry-run", action="store_true", default=True)
    parser.add_argument("--symbols", nargs="*", default=["MOCK:USD"])
    args = parser.parse_args()
    run_engine(loop_interval=args.interval, dry_run=args.dry_run, symbols=args.symbols)
