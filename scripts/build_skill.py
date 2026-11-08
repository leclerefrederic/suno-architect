#!/usr/bin/env python3
"""Build a reproducible .skill archive from the repository source (Python 3 only)."""
import argparse
from pathlib import Path
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "suno-prompt-architect"


def source_files(source=SKILL):
    files = sorted(p for p in source.rglob("*") if p.is_file()
                   and "__pycache__" not in p.parts and not any(x.startswith(".") for x in p.relative_to(source).parts))
    for path in files:
        if path.is_symlink():
            raise ValueError(f"Symlink not allowed: {path}")
    if not files or source / "SKILL.md" not in files:
        raise ValueError("Missing SKILL.md")
    return files


def version(source=SKILL):
    text = (source / "SKILL.md").read_text(encoding="utf-8")
    match = re.search(r"^# Suno Prompt Architect v(\d+\.\d+\.\d+)\b", text, re.M)
    if not match:
        raise ValueError("Missing semantic version in SKILL.md heading")
    return match.group(1)


def build(output, source=SKILL):
    files = source_files(source)
    output = Path(output).resolve()
    if output == source.resolve() or source.resolve() in output.parents:
        raise ValueError("Archive must be outside the skill source")
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in files:
            name = f"{source.name}/{path.relative_to(source).as_posix()}"
            info = zipfile.ZipInfo(name, date_time=(2020, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes())
    verify(output, source)
    return output


def verify(output, source=SKILL):
    expected = {f"{source.name}/{p.relative_to(source).as_posix()}": p.read_bytes()
                for p in source_files(source)}
    with zipfile.ZipFile(output) as archive:
        if archive.testzip() is not None or len(archive.namelist()) != len(expected) or set(archive.namelist()) != set(expected):
            raise ValueError("Archive inventory differs from source")
        for name, data in expected.items():
            if archive.read(name) != data:
                raise ValueError(f"Archive content differs: {name}")



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "suno-prompt-architect.skill")
    parser.add_argument("--check", action="store_true", help="Verify existing archive without rebuilding")
    args = parser.parse_args()
    if args.check:
        verify(args.output)
    else:
        build(args.output)
    print(f"Verified Suno Prompt Architect {version()}: {args.output}")
