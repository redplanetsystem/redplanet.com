"""
api/mt5_connector.py
Thin MetaTrader5 wrapper with mock fallback and health checks.
"""
from __future__ import annotations

import logging
from typing import Dict, Any, Optional

logger = logging.getLogger("mt5_connector")
logger.setLevel(logging.INFO)

try:
    import MetaTrader5 as mt5  # type: ignore
    MT5_AVAILABLE = True
except Exception:
    MT5_AVAILABLE = False


class MT5Connector:
    def __init__(self):
        self.connected = False
        self._init()

    def _init(self) -> None:
        if not MT5_AVAILABLE:
            logger.warning("MetaTrader5 package not available; running in mock mode.")
            self.connected = False
            return
        try:
            self.connected = mt5.initialize()
        except Exception:
            logger.exception("mt5 initialize failed")
            self.connected = False

    def is_healthy(self) -> bool:
        if not MT5_AVAILABLE:
            return False
        try:
            return bool(mt5.terminal_info())
        except Exception:
            return False

    def symbol_info(self, symbol: str) -> Dict[str, Any]:
        if not MT5_AVAILABLE:
            return {"symbol": symbol, "mock": True}
        try:
            s = mt5.symbol_info(symbol)
            if s is None:
                return {"symbol": symbol, "found": False}
            return {"symbol": symbol, "found": True, "tick_size": getattr(s, 'trade_tick_size', getattr(s, 'point', None))}
        except Exception as e:
            logger.exception("symbol_info failed")
            return {"symbol": symbol, "error": str(e)}

    def place_order(self, order_request: Dict[str, Any]) -> Dict[str, Any]:
        if not MT5_AVAILABLE:
            return {"status": "mocked", "order_request": order_request}
        try:
            # Real mt5 order call requires constructing request dict and calling mt5.order_send
            res = mt5.order_send(order_request)  # placeholder
            return {"status": "submitted", "result": getattr(res, '_asdict', lambda: str(res))()}
        except Exception as e:
            logger.exception("order_send failed")
            return {"status": "error", "error": str(e)}
