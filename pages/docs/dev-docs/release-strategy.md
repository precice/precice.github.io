---
title: Release strategy
keywords: pages, authoring, release, hotfix, development
permalink: dev-docs-release-strategy.html
---

## Terminology

- Release: A tagged release which is visible in git as tag and in github as release
- Hotfix: same as a release but modifies a single master version without side effects
- Release branch: a branch in a repository, based on develop.

## Dependency tree

![Release dependencies](images/docs/dev-docs-release-dependencies.svg)

## Release procedure

1. Repository R needs to release a new version V
   The name of the release branch is "R-vV" pyprecice-v{{ site.precice_version }}.1
2. Prepare the release in the branch (bump version etc)
3. Find R in the dependency tree and the subtree with root R
4. Every R' in subtree (R != R) needs to create a release branch with the name deduced above.
   The branch should be based on develop of the repository R'. The base commit of the release branch is the last commit to be released (feature freeze).
5. Run systemtests with the subtree of R using release branches and the rest using
   1. develop (do all the develop versions still work together)
   2. master (do all the releases still work together)
6. Make sure everything is working
7. Release from R down to the leaves of the dependency tree if necessary.

## Hotfix procedure

1. Repository R needs to release a new version V
   The name of the release branch is "R-vV" pyprecice-v{{ site.precice_version }}.1
2. Prepare the release in the branch (bump version etc)
3. Find R in the dependency tree
4. Run systemtests with R using release branches and the rest using master
5. Make sure everything is working
6. Release R

## Umbrella / distribution

- twice per year, following the preCICE feature releases.
- last precice/precice release branch (off every repo) + concrete solver versions.
- Forms the base of the Vagrant box

{% note %}
Note: this means repositories don't all need versions.
{% endnote %}

## Example

Goal: Release pyprecice version `1.2.3`.
Root repository: `precice/pyprecice`
Name of release branch: `pyprecice-v1.2.3`

![Release example](images/docs/dev-docs-release-example.svg)

1. Create branch `pyprecice-v1.2.3` from `precice/pyprecice:develop`
2. Prepare the release (bump version etc)
3. Create branch `pyprecice-v1.2.3` in repositories:
   `a`, `b`
4. Run systemtests and fix errors until none appear
    1. for develop version
    2. for master version
5. Release the repositories if required.
