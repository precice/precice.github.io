#!python3

import pathlib
import argparse
from sys import exit, stderr


def oldAPI():
    return [entry
            for entry in (pathlib.Path(__file__).parent / "old-precice.txt").read_text().splitlines()
            if entry and not entry.startswith("#")]


def fileFilter(file: pathlib.Path):
    for s in ["porting", "CHANGELOG"]:
        if s in file.name:
            return False
    return True


def checkFiles(files: list[pathlib.Path], root:pathlib.Path):
    old = oldAPI()
    success = True
    for file in filter(fileFilter, files):
        content = file.read_text().splitlines()
        for n, line in enumerate(content):
            for ex in old:
                if ex in line:
                    print(f"{file.resolve().relative_to(root)}:l{n}:{ex}", file=stderr)
                    success = False
    return success


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("files", type=pathlib.Path, nargs="+")
    args = parser.parse_args()
    root = pathlib.Path(__file__).parent.parent
    return 0 if checkFiles(args.files, root) else 1


if __name__ == '__main__':
    exit(main())
