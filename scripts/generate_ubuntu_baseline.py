#!/usr/bin/env python3

import subprocess
import yaml
import argparse
from pathlib import Path
from datetime import datetime, UTC

ROOT = Path(__file__).resolve().parent.parent
DEPENDENCIES_FILE = ROOT / "scripts" / "dependencies.yml"
OUTPUT_FILE = ROOT / "_data" / "ubuntu-baseline.yml"


def load_dependencies():
    with open(DEPENDENCIES_FILE, "r") as f:
        data = yaml.safe_load(f)

    packages = data.get("packages", {})

    return {
        "required": sorted(packages.get("required", [])),
        "optional": sorted(packages.get("optional", [])),
    }


def run_command(cmd):
    result = subprocess.run(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    if result.returncode != 0:
        print(result.stderr)
        return None
    return result.stdout.strip()


def get_version_docker(ubuntu_version, package):
    cmd = [
        "docker",
        "run",
        "--rm",
        f"ubuntu:{ubuntu_version}",
        "bash",
        "-c",
        f"apt-get update -qq && apt-cache policy {package} | grep Candidate | awk '{{print $2}}'",
    ]
    raw = run_command(cmd)

    if not raw or raw == "(none)":
        return None

    # Remove epoch (e.g. "1:")
    if ":" in raw:
        raw = raw.split(":", 1)[1]

    # Remove Debian revision (e.g. "-1ubuntu1")
    raw = raw.split("-", 1)[0]

    return raw


def get_version_mock(package):
    return "0.0.0-mock"


def generate_data(lts_versions, mock=False):
    package_groups = load_dependencies()

    result = {
        "generated_at": datetime.now(UTC).isoformat(),
        "ubuntu": {},
    }

    for version in lts_versions:
        result["ubuntu"][version] = {
            "required": {},
            "optional": {},
        }

        for group in ["required", "optional"]:
            for pkg in package_groups[group]:
                if mock:
                    ver = get_version_mock(pkg)
                else:
                    ver = get_version_docker(version, pkg)

                result["ubuntu"][version][group][pkg] = ver or "not-found"

    return result


def write_yaml(data):
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w") as f:
        yaml.dump(data, f, sort_keys=True)


def main():
    parser = argparse.ArgumentParser(
        description="Generate Ubuntu baseline package versions using Docker."
    )
    parser.add_argument(
        "--mock",
        action="store_true",
        help="Use mock versions instead of querying Docker (useful for testing the pipeline).",
    )
    parser.add_argument(
        "--lts",
        nargs="+",
        required=True,
        help="Ubuntu LTS versions to query (e.g. 22.04 24.04)",
    )
    args = parser.parse_args()

    data = generate_data(args.lts, mock=args.mock)
    write_yaml(data)

    print(f"Generated {OUTPUT_FILE}")


if __name__ == "__main__":
    main()