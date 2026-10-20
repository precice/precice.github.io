#!/usr/bin/env python3
"""Synchronize Hugo module revisions with their upstream default branches."""

import argparse
from pathlib import Path
import re
import subprocess
import sys


PRECICE_MODULE_PREFIX = "github.com/precice/"
IMPORT_HEADER = "[[imports]]"
IMPORT_PATH = re.compile(r'^path\s*=\s*"([^"]+)"\s*$')


def run(command: list[str], *, cwd: Path, capture_output: bool = False) -> str:
    completed = subprocess.run(
        command,
        cwd=cwd,
        check=False,
        text=True,
        capture_output=capture_output,
    )
    if completed.returncode:
        if capture_output:
            sys.stderr.write(completed.stderr)
        raise RuntimeError(f"Command failed: {' '.join(command)}")
    return completed.stdout if capture_output else ""


def hugo_imports(module_toml: Path) -> list[str]:
    imports: list[str] = []
    in_import = False

    for raw_line in module_toml.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if line.startswith("[["):
            in_import = line == IMPORT_HEADER
            continue
        if not in_import:
            continue
        match = IMPORT_PATH.match(line)
        if match:
            imports.append(match.group(1))
            in_import = False

    return imports


def module_revisions(repository: Path, module_toml: Path) -> list[tuple[str, str]]:
    revisions: list[tuple[str, str]] = []

    for module in hugo_imports(module_toml):
        if not module.startswith(PRECICE_MODULE_PREFIX):
            continue
        output = run(
            ["git", "ls-remote", f"https://{module}.git", "HEAD"],
            cwd=repository,
            capture_output=True,
        )
        for line in output.splitlines():
            fields = line.split()
            if len(fields) == 2 and fields[1] == "HEAD":
                revisions.append((module, fields[0]))
                break
        else:
            raise RuntimeError(f"Could not resolve the default branch for {module}")

    return revisions


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Synchronize Hugo module revisions with upstream default branches."
    )
    parser.add_argument("--module-toml", default="config/_default/module.toml")
    parser.add_argument("--hugo-bin", default="hugo")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    repository = Path.cwd()
    revisions = module_revisions(repository, repository / args.module_toml)
    dependencies = [f"{module}@{revision}" for module, revision in revisions]

    for dependency in dependencies:
        print(f"Synchronizing {dependency}")

    if args.dry_run:
        return

    run([args.hugo_bin, "mod", "get", *dependencies], cwd=repository)
    run([args.hugo_bin, "mod", "tidy"], cwd=repository)


if __name__ == "__main__":
    try:
        main()
    except (OSError, RuntimeError, ValueError) as error:
        print(f"error: {error}", file=sys.stderr)
        sys.exit(1)
