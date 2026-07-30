"""
core/state_manager.py
Thread-safe state manager with atomic JSON persistence, metrics, and safe recovery.
"""
from __future__ import annotations

import json
import tempfile
import threading
import time
from pathlib import Path
from typing import Any, Dict, Optional


DEFAULT_STATE: Dict[str, Any] = {
    "engine": {"status": "stopped", "updated_at": None},
    "trades": [],
    "metrics": {},
}


class StateManager:
    def __init__(self, path: str = "data/engine_status.json", fallback: Optional[Dict[str, Any]] = None):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._lock = threading.RLock()
        self._state: Dict[str, Any] = fallback or DEFAULT_STATE.copy()
        self._load()

    def _load(self) -> None:
        with self._lock:
            try:
                if self.path.exists():
                    with self.path.open("r", encoding="utf-8") as f:
                        payload = json.load(f)
                        if isinstance(payload, dict):
                            self._state = payload
                        else:
                            # unexpected shape
                            self._state = DEFAULT_STATE.copy()
                else:
                    self._atomic_write(self._state)
            except Exception:
                # Corrupted file or unreadable — reset to default and write atomically
                self._state = DEFAULT_STATE.copy()
                try:
                    self._atomic_write(self._state)
                except Exception:
                    pass

    def _atomic_write(self, obj: Dict[str, Any]) -> None:
        tmp_dir = str(self.path.parent)
        fd, tmp_path = tempfile.mkstemp(prefix=self.path.name, dir=tmp_dir)
        try:
            with open(fd, "w", encoding="utf-8") as tf:
                json.dump(obj, tf, indent=2, default=str)
                tf.flush()
            Path(tmp_path).replace(self.path)
        finally:
            # ensure tmp removed if still present
            t = Path(tmp_path)
            if t.exists():
                try:
                    t.unlink()
                except Exception:
                    pass

    def get(self, key: Optional[str] = None, default: Any = None) -> Any:
        with self._lock:
            if key is None:
                # return a shallow copy to avoid accidental mutation
                return dict(self._state)
            return self._state.get(key, default)

    def set(self, key: str, value: Any, persist: bool = True) -> None:
        with self._lock:
            self._state[key] = value
            self._state.setdefault("metrics", {})
            self._state["engine"]["updated_at"] = time.time()
            if persist:
                try:
                    self._atomic_write(self._state)
                except Exception:
                    # best-effort persistence
                    pass

    def update_metrics(self, name: str, value: Any) -> None:
        with self._lock:
            self._state.setdefault("metrics", {})[name] = {"value": value, "ts": time.time()}
            try:
                self._atomic_write(self._state)
            except Exception:
                pass


# singleton convenience
state_manager = StateManager()
