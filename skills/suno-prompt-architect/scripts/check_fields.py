#!/usr/bin/env python3
"""Check the exact Suno field text against the project's supplied budgets."""
import argparse
import json
from pathlib import Path

LIMITS = {"earn": {"prompt": 200}, "simple": {"prompt": 3000},
          "advanced": {"style": 1000, "lyrics": 5000}}


def check_fields(mode, fields):
    allowed = LIMITS[mode]
    required = "style" if mode == "advanced" else "prompt"
    if required not in fields:
        raise ValueError(f"Missing required field: {required}")
    if set(fields) - set(allowed):
        raise ValueError(f"Unsupported fields for {mode}: {sorted(set(fields) - set(allowed))}")
    results = {}
    for name, value in fields.items():
        if not isinstance(value, str) or not value.strip():
            raise ValueError(f"Field {name} must contain text")
        points = len(value)
        units = len(value.encode("utf-16-le")) // 2
        results[name] = {"code_points": points, "utf16_units": units,
                         "limit": allowed[name], "valid": max(points, units) <= allowed[name]}
    return {"mode": mode, "valid": all(r["valid"] for r in results.values()), "fields": results}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", required=True, choices=LIMITS)
    for field in ("prompt", "style", "lyrics"):
        parser.add_argument(f"--{field}", type=Path, help="UTF-8 file containing exact field text")
    args = parser.parse_args()
    try:
        # Decode bytes directly: keep CRLF and trailing newlines exactly as supplied.
        fields = {name: getattr(args, name).read_bytes().decode("utf-8")
                  for name in ("prompt", "style", "lyrics") if getattr(args, name) is not None}
        result = check_fields(args.mode, fields)
    except (OSError, UnicodeError, ValueError) as error:
        parser.error(str(error))
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
