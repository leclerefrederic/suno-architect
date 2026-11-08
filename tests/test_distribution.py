"""Actual field boundaries, CLI errors and portable archive integrity."""
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


def module(name, relative):
    spec = importlib.util.spec_from_file_location(name, ROOT / relative)
    loaded = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(loaded)
    return loaded


counter = module("counter", "skills/suno-prompt-architect/scripts/check_fields.py")
builder = module("builder", "scripts/build_skill.py")


class FieldTests(unittest.TestCase):
    def test_each_budget_boundary(self):
        for mode, fields in counter.LIMITS.items():
            for field, limit in fields.items():
                with self.subTest(mode=mode, field=field):
                    values = {"style": "Instrumental"} if mode == "advanced" else {}
                    values[field] = "a" * limit
                    self.assertTrue(counter.check_fields(mode, values)["valid"])
                    values[field] += "b"
                    self.assertFalse(counter.check_fields(mode, values)["valid"])

    def test_budgets_are_separate(self):
        self.assertFalse(counter.check_fields("advanced", {"style": "x" * 1001, "lyrics": "short"})["valid"])
        self.assertTrue(counter.check_fields("advanced", {"style": "x" * 1000, "lyrics": "y" * 5000})["valid"])

    def test_unicode_and_line_breaks(self):
        result = counter.check_fields("earn", {"prompt": "é🎷\r\n "})["fields"]["prompt"]
        self.assertEqual(result["code_points"], 5)
        self.assertEqual(result["utf16_units"], 6)
        self.assertFalse(counter.check_fields("earn", {"prompt": "🎷" * 101})["valid"])

    def test_missing_empty_or_wrong_fields(self):
        for mode, fields in [("earn", {}), ("simple", {"prompt": " "}),
                             ("advanced", {"lyrics": "Words"}),
                             ("earn", {"prompt": "Funk", "lyrics": "Words"})]:
            with self.subTest(mode=mode, fields=fields), self.assertRaises(ValueError):
                counter.check_fields(mode, fields)

    def test_cli_keeps_exact_file_bytes(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "prompt.txt"
            path.write_bytes(b"x" * 198 + b"\r\n")
            command = [sys.executable, str(ROOT / "skills/suno-prompt-architect/scripts/check_fields.py"),
                       "--mode", "earn", "--prompt", str(path)]
            run = subprocess.run(command, capture_output=True, text=True)
            self.assertEqual(run.returncode, 0, run.stderr)
            self.assertEqual(json.loads(run.stdout)["fields"]["prompt"]["code_points"], 200)
            path.write_bytes(b"x" * 201)
            self.assertEqual(subprocess.run(command, capture_output=True).returncode, 1)
            path.write_bytes(b"\xff")
            self.assertEqual(subprocess.run(command, capture_output=True).returncode, 2)


class PackageTests(unittest.TestCase):
    def test_reproducible_and_complete(self):
        with tempfile.TemporaryDirectory() as folder:
            first = builder.build(Path(folder) / "first.skill")
            second = builder.build(Path(folder) / "second.skill")
            self.assertEqual(first.read_bytes(), second.read_bytes())
            builder.verify(first)

    def test_rejects_corrupt_payload(self):
        import zipfile
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "wrong.skill"
            with zipfile.ZipFile(path, "w") as archive:
                archive.writestr("suno-prompt-architect/SKILL.md", "wrong")
            with self.assertRaises(ValueError):
                builder.verify(path)

    def test_document_links_are_local_and_exist(self):
        import re
        for path in builder.SKILL.rglob("*.md"):
            for link in re.findall(r"\]\(([^)]+)\)", path.read_text()):
                if link.startswith("https://"):
                    continue
                target = (path.parent / link).resolve()
                self.assertTrue(target.is_relative_to(builder.SKILL.resolve()), link)
                self.assertTrue(target.is_file(), link)

    def test_observed_prompt_budgets(self):
        cases = json.loads((ROOT / "tests/experience-samples.json").read_text())
        for case in cases:
            for turn in case["turns"]:
                fields_to_check = ([turn["fields"]] if "fields" in turn else []) + turn.get("prompts", [])
                for fields in fields_to_check:
                    with self.subTest(case=case["id"]):
                        self.assertTrue(counter.check_fields(case["mode"], fields)["valid"])


if __name__ == "__main__":
    unittest.main()
