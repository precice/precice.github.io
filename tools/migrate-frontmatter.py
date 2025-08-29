#!python3

import pathlib
import yaml

root = pathlib.Path(__file__).parent.parent
files = list((root / "content").rglob("*.md")) + list((root / "imported").rglob("*.md"))

for file in files:
    lines = file.read_text().splitlines(keepends=False)

    if lines[0] != "---":
        continue

    end = lines[1:].index("---", 2) + 1
    frontmatter: dict = yaml.safe_load("\n".join(lines[1:end]))

    for key in list(frontmatter.keys()):
        if frontmatter[key] is None:
            frontmatter.pop(key)

    content = lines[end+1:]
    if "aliases" not in frontmatter:
        frontmatter["aliases"] = list()

    if "permalink" in frontmatter:
        perma = frontmatter.pop("permalink")
        frontmatter["aliases"].append(perma if perma.startswith("/") else "/" + perma)

    if "redirect_from" in frontmatter:
        redirects = frontmatter.pop("redirect_from")
        if not isinstance(redirects, list):
            redirects = [redirects]

        for redirect in redirects:
            frontmatter["aliases"].append(redirect if redirect.startswith("/") else "/" + redirect)

    if "keywords" in frontmatter:
        frontmatter["keywords"] = [
            kw.strip()
            for kw in frontmatter.get("keywords").split(",")
        ]

    text = "---\n{}---\n{}\n".format(
        yaml.dump(frontmatter, indent=2),
        "\n".join(content)
    )

    file.write_text(text)
