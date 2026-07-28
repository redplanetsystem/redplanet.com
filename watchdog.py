"""
watchdog.py
Process supervisor with exponential backoff, safe log capture, and drawdown guard.
"""
from __future__ import annotations

import json
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, Any

STATUS_FILE = Path("data/engine_status.json")
ENGINE_CMD = [sys.executable, "run_expert_sniper_pro_v2.py", "--dry-run"]


def read_status() -> Dict[str, Any]:
    if not STATUS_FILE.exists():
        return {}
    try:
        with STATUS_FILE.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def main():
    backoff = 5
    max_backoff = 300
    while True:
        started_at = datetime.utcnow().isoformat()
        proc = subprocess.Popen(ENGINE_CMD, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print(f"[watchdog] started engine pid={proc.pid} at {started_at}")
        try:
            # non-blocking read loop with timeout chunk
            while True:
                ret = proc.poll()
                if ret is not None:
                    stdout, stderr = proc.communicate(timeout=1)
                    if stdout:
                        print(stdout)
                    if stderr:
                        print(stderr, file=sys.stderr)
                    break
                time.sleep(1)
        except subprocess.TimeoutExpired:
            # shouldn't happen because we use poll loop
            pass
        except Exception as e:
            print(f"[watchdog] error while monitoring: {e}")
        finally:
            ended_at = datetime.utcnow().isoformat()
            status = read_status()
            drawdown = status.get("metrics", {}).get("max_drawdown", {}).get("value", 0)
            if drawdown and drawdown > 0.5:
                print("[watchdog] large drawdown detected, not restarting automatically")
                break
            # restart with backoff
            print(f"[watchdog] engine exited; restarting in {backoff}s")
            time.sleep(backoff)
            backoff = min(max_backoff, backoff * 2)


if __name__ == "__main__":
    main()
