#!/usr/bin/env python3
"""Prepare the static Sites deployment from the same skill UI source."""
import argparse
import json
from pathlib import Path
import shutil
from build_skill import build_interface, ROOT


def build_site(output):
    output = Path(output).resolve()
    if output == ROOT or output in ROOT.parents:
        raise ValueError("Choose a dedicated staging directory, not the source repository")
    manifest = ROOT / ".openai/hosting.json"
    config = json.loads(manifest.read_text())
    assert config["project_id"] and config["static"]["directory"] == "dist"
    (output / ".openai").mkdir(parents=True, exist_ok=True)
    shutil.copyfile(manifest, output / ".openai/hosting.json")
    build_interface(output / "dist/index.html")
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    print(build_site(args.output))
