---
title: Publication strategy
keywords: Publication, release, distribution, DaRUS
permalink: dev-docs-publication-strategy.html
---

## Publication of distribution on DaRUS

For every new (major) distribution release, we publish an archive of all included sources on [DaRUS](https://darus.uni-stuttgart.de/). As an example, see the [v2104.0 data set](https://doi.org/10.18419/darus-2125).

### Authorship

Authors of the data set are:

- All current [maintainers](./community-contributors.html#maintainers)
- Everybody who significantly contributed to the delta between the last and this major distribution release. Significant contributions need to go beyond *good first issues*. Actively maintaining a component or significant reviewing does also qualify as significant contribution.
- Supervisors who actively contributed ideas to the delta between the last and this major distribution release

Order of authors: maintainers are listed first followed by everybody else, both in alphabetical order.

### Automation

1. Install [EasyDataverse](https://github.com/gdcc/easyDataverse)

    As of March 2024, a specific branch was required:

    ```bash
    pip install git+https://github.com/gdcc/easyDataverse@flexible-connect
    ```

    These new required features are, however, scheduled to be released. Likely, installation from PyPI is possible in the future.

2. Download previous distribution

    ```python
    from easyDataverse import Dataverse

    SERVER_URL = "https://darus.uni-stuttgart.de"

    # get the token from DaRUS after logging in; valid for one year
    API_TOKEN = "yourToken"

    # DOI of preCICE Distribution Version v2211.0
    PID = "doi:10.18419/darus-3576"

    darus = Dataverse(SERVER_URL, API_TOKEN)
    # pull data and metadata, data is written into subfolder old_files, which is also created
    dataset = darus.load_dataset(PID, filedir="old_files")

    # write metadata into a json file
    with open("dataset.json", "w") as f:
      f.write(dataset.json())
    ```

3. Edit metadata manually

    Copy `dataset.json` to `dataset_new.json` and update manually. Keep the old `dataset_id`.

4. Download components

    ```bash
    #!/bin/bash

    repo_names=()
    is_releases=() # whether a component is a release (true) or a commit (false)
    versions=() # for a release, this is the version number (without "v"); for a commit, this is the hash (of length  7)

    # TODO: update all version; current example reflects distribution v2404.0

    # preCICE
    repo_names+=("precice"); is_releases+=(true); versions+=("3.1.1")

    # Tools
    repo_names+=("aste"); is_releases+=(true); versions+=("3.1.0")
    repo_names+=("ci-images"); is_releases+=(false); versions+=("b421a49")
    repo_names+=("config-visualizer"); is_releases+=(true); versions+=("1.1.3")
    repo_names+=("config-visualizer-gui"); is_releases+=(true); versions+=("0.1.0")
    repo_names+=("fmi-runner"); is_releases+=(true); versions+=("0.2.1")
    repo_names+=("micro-manager"); is_releases+=(true); versions+=("0.4.0")

    # Bindings
    repo_names+=("fortran-module"); is_releases+=(false); versions+=("dc88c3b")
    repo_names+=("PreCICE.jl"); is_releases+=(true); versions+=("3.1.0")
    repo_names+=("matlab-bindings"); is_releases+=(true); versions+=("3.1.0")
    repo_names+=("python-bindings"); is_releases+=(true); versions+=("3.1.0")
    repo_names+=("rust-bindings"); is_releases+=(true); versions+=("3.1.0")

    # Adapters
    repo_names+=("calculix-adapter"); is_releases+=(true); versions+=("2.20.1")
    repo_names+=("code_aster-adapter"); is_releases+=(false); versions+=("b797fcc")
    repo_names+=("dealii-adapter"); is_releases+=(false); versions+=("4c6d092")
    repo_names+=("dune-adapter"); is_releases+=(false); versions+=("75edcc3")
    repo_names+=("dumux-adapter"); is_releases+=(true); versions+=("2.0.0")
    repo_names+=("fenics-adapter"); is_releases+=(true); versions+=("2.1.0")
    repo_names+=("openfoam-adapter"); is_releases+=(true); versions+=("1.3.0")
    repo_names+=("su2-adapter"); is_releases+=(false); versions+=("64d4aff")

    # Tutorials
    repo_names+=("tutorials"); is_releases+=(true); versions+=("202404.0")

    # VM
    repo_names+=("vm"); is_releases+=(true); versions+=("202404.0.0")

    # Website and documentation
    repo_names+=("precice.github.io"); is_releases+=(true); versions+=("202404.0.0")

    download_release () {
      repo_name=$1
      version=$2
      wget -nv -O ${repo_name}-${version}.tar.gz https://github.com/precice/${repo_name}/archive/refs/tags/v${version}.tar.gz
    }

    download_commit () {
      repo_name=$1
      hash=$2
      
      wget -nv https://github.com/precice/${repo_name}/archive/${hash}.zip
      unzip -q ${hash}.zip
      rm ${hash}.zip
      mv ${repo_name}-${hash}* ${repo_name}-${hash}
      tar -czf ${repo_name}-${hash}.tar.gz ${repo_name}-${hash}
      rm -r ${repo_name}-${hash}
    }

    # prepare separate folder for new components
    rm -rf new_files
    mkdir new_files
    cd new_files

    for ((i=0; i<${#repo_names[@]}; i++)); do
        repo_name="${repo_names[$i]}"
        is_release="${is_releases[$i]}"
        version="${versions[$i]}"

        if [ "$is_release" == "true" ]; then
            download_release "$repo_name" "$version"
        else
            download_commit "$repo_name" "$version"
        fi
    done
    ```

    Once there is a machine-readable distribution, simplify the bash script accordingly.

5. Upload to DaRUS

    ```python
    from easyDataverse import Dataverse

    SERVER_URL = "https://darus.uni-stuttgart.de"

    # get the token from DaRUS after logging in; valid for one year
    API_TOKEN = "yourToken"

    darus = Dataverse(SERVER_URL, API_TOKEN)

    dataset = darus.dataset_from_json(open("./dataset_new.json"))

    # datasetContactEmail is a field that cannot yet be downloaded, need to provide manually
    dataset.citation.dataset_contact[0].email = "benjamin.uekermann@ipvs.uni-stuttgart.de"

    dataset.add_directory(
      dirpath="./new_files/",
    )

    # delete pid to upload to new dataset, otherwise existing one overwritten
    dataset.p_id = None
    # upload to dataverse of US3
    dataset.upload("ipvs_us3")

6. Review and publish

    The upload returns a url, which gives you access to the dataset. Review carefully. Currently, for example, licenses still need manual editing. One ready, publish (i.e. send to DaRUS team for review).
