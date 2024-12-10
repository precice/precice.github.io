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

## Release schedule

The core library repository follows semantic versioning.

We group together breaking changes and release a new breaking (major) version as needed. There is no fixed schedule for major releases, and we take time to ensure that no further breaking changes are needed soon after. This aims to give time and motivation to users to adopt new versions, and spreads the effort of preparing a release over a longer period of time.

We aim for feature releases twice per year, so that new features can be continuously shipped to new users, but we again don't get overly burdened by the release process, and feature releases maintain their significance. We define a feature freeze date (date after which no new feature contributions can be merged to the release branch) and a release date (date of merging the release branch to the main branch and tagging the release). Since most of the development happens in universities, we align these dates with the lecture-free periods between semesters in these universities:

- spring release: feature freeze on March 20 at 23:59 CET, release as soon as possible in April
- fall release: feature freeze on September 20 at 23:59 CET, release as soon as possible in October

Bugfix releases are allowed at any time and any frequency.

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
