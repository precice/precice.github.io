---
title: Performance analysis
permalink: tooling-performance-analysis.html
keywords: tooling, json, performance, events, analysis, cpu time, hpc, profiling
summary: "preCICE comes with an internal performance analysis framework"
---

## Introduction

preCICE uses an internal profiling framework to measure code sections inside and between API calls of the library.
These named sections are called `events` and each event generates records duing runtime.
Each rank gathers local records and writes them to a JSON file in the `precice-events` directory.
These files then need to be post-processed and merged to a single file using the `precice-events` python script.
You can then use the resulting file to analyse the profiling data.

## Fundamental Events

Some events are useful for everyone, while others are only useful for developers.
To keep this feature as useful as possible, we pre-selected a set of events, which we deem fundamental.
These include the main preCICE API functions and the time spend between these calls inside the solvers.
Fundamental events should give you an insight in the overhead of preCICE as well as load imbalance between ranks etc.

Fundamental events are:

* `SolverInterface` construction. This includes configuration and setting up the Intra-communication of each participant.
* `solver.initialize` time spend in the solver until `initialize()` is called. This includes setting meshes, defining initial data and preparing the solver.
* `initialize()` time spend in preCICE `initialize()`. This includes establishing communication between participants, mesh and data transfer, as well as mapping computation.
* `solver.advance` time spend in the solver between `advance()` calls, including the time between `initialize()` and the first `advance()` call.
* `advance()` time spend in preCICE `advance()`. This includes data mapping, data transfer, acceleration.

## Measuring Blocking Operations

Some parts of preCICE involve communication, which cannot be interleaved efficiently with other computations.
Measuring the runtime of such operations can be tricky, as the time spend waiting should be ignored.
Synchronizing all ranks using a barrier solved the issue, but has an impact on performance.

To keep this waiting component of the overall measurement to a minimum without affecting performance, we added a configuration option to toggle the synchonization before required events.
Use the `sync-mode` attribute to enable such synchonization if you need it.

```xml
<precice-configuration sync-mode="1">
    ...
</precice-configuration>
```

## Configuration

You can configure the profiling using the configuration file with the `<profiling/>` tag located inside `<precice-configuration>`.
The default settings enable profiling of fundamental events and write the event files the working directory of each solver.

The full configuration consists of:

* `mode` either `off`, `fundamental` (default), or `all`
* `directory` location to create the `precice-events` folder in and write the event files to
* the flush frequency  `flush-every`: `0` means only at the end of the simulation, `n>0` means to flush every n-records

### Examples

To turn the profiling off:

```xml
<precice-configuration>
  <profiling mode="off" />
</precice-configuration>
```

To write all files into a common directory (often `..` works too):

```xml
<precice-configuration>
  <profiling director="/path/to/dir" />
</precice-configuration>
```

To prevent any write operations of the filesystem until the end of the simulation:

```xml
<precice-configuration>
  <profiling flush-every="0" />
</precice-configuration>
```

To profile blocking operations:

```xml
<precice-configuration sync-mode="1">
  <profiling mode="all" />
</precice-configuration>
```

## Post-processing workflow

The general workflow looks as follows:

1. Run the simulation
2. Merge the event files
3. Analyse each participants that executes a mapping
4. Analyse each participant to check for load-imbalance between ranks
5. Visualize the simulation to check for load-imbalance between participants

The rest of the section will go through this process step by step.

### Merging Event Files

After the simulation completes, you can find `precice-events` folders in the configured location, defaulting to the working directory of each solver.
An example could look like this:

```txt
.
├── A
│   └── precice-events
│       └── A-0-1.json
├── B
│   └── precice-events
│       └── B-0-1.json
└── precice-config.xml
```

To find and merge these files run:

```console
$ ls
A
B
$ precice-events merge A B
Searching A : found 1 files in A/precice-events
Searching B : found 1 files in B/precice-events
Found 2 unique event files
Found a single run for participant B
Found a single run for participant A
Loading event files
Globalizing event names
Grouping events
Aligning B (-179us) with A
Writing to events.json
```

The merge command searches passed directories for the event files.
You can also pass individual files if you are not interested in the other ranks

The merge command is written in pure python without external dependencies to make it easy to use on clusters.
After you run `precice-events merge`, you end up with a single file, which can be additionally compressed and transferred to another machine.
This is especially handy for very large and/or long simulations on clusters or supercomputers.

The result of this step is a single `events.json` file.

### Visualizing the Simulation

You can run `precice-events trace` to export the `events.json` file as `trace.json` in the [trace events format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview).

```console
$ precice-events trace
Reading events file events.json
Writing to trace.json
```

This trace format can then be visualized using the following tools:

* [ui.perfetto.dev](https://ui.perfetto.dev)
* [profiler.firefox.com](https://profiler.firefox.com/)
* [speedscope.app](https://www.speedscope.app/)
* [`chrome://tracing/`](chrome://tracing/) in Chromium browsers [_(see full list)_](https://en.wikipedia.org/wiki/Chromium_(web_browser)#Active)

An example trace visualization using `ui.perfetto.dev` of a serial ASTE run looks as follows:

![example of serial ASTE visualized by perfetto](images/docs/tooling/profiling-aste-perfetto-serial.png)

An example trace visualization using `ui.perfetto.dev` of a paralle ASTE run on two ranks each looks as follows:

![example of parallel ASTE visualized by perfetto](images/docs/tooling/profiling-aste-perfetto-parallel.png)

### Analysing Participants

You can run `precice-events analyze NAME` to analyze the participant `NAME` and display a table of recorded events.
The output differs for serial and parallel participants.

The output for serial solvers contains a table displaying the name of the event, followed by the sum, count, mean, min, and max runtime.

<div style="display:contents;overflow-x:auto" markdown="1">

```console
$ precice-events analyze B
Reading events file events.json
Output timing are in us.
                                            event |       sum    count      mean       min       max
                                          _GLOBAL | 1520885.0        1 1520885.0 1520885.0 1520885.0
                                          advance |  183083.0        1  183083.0  183083.0  183083.0
                          advance/m2n.receiveData |    1362.0        1    1362.0    1362.0    1362.0
       advance/map.bbm.mapData.FromA-MeshToB-Mesh |      86.0        1      86.0      86.0      86.0
advance/map.vci.computeMapping.FromA-MeshToB-Mesh |  181377.0        1  181377.0  181377.0  181377.0
     advance/query.index.getTetraIndexTree.A-Mesh |  172770.0        1  172770.0  172770.0  172770.0
                                        configure |      71.0        1      71.0      71.0      71.0
                                         finalize |     704.0        1     704.0     704.0     704.0
                                       initialize | 1333426.0        1 1333426.0 1333426.0 1333426.0
     initialize/m2n.acceptPrimaryRankConnection.A |  810972.0        1  810972.0  810972.0  810972.0
    initialize/m2n.acceptSecondaryRanksConnection |   47853.0        1   47853.0   47853.0   47853.0
      initialize/m2n.broadcastVertexDistributions |       1.0        1       1.0       1.0       1.0
             initialize/m2n.buildCommunicationMap |    5491.0        1    5491.0    5491.0    5491.0
              initialize/m2n.createCommunications |     426.0        1     426.0     426.0     426.0
        initialize/m2n.exchangeVertexDistribution |   41864.0        1   41864.0   41864.0   41864.0
          initialize/partition.prepareMesh.B-Mesh |      36.0        1      36.0      36.0      36.0
    initialize/partition.receiveGlobalMesh.A-Mesh |  468944.0        1  468944.0  468944.0  468944.0
                     initialize/preprocess.B-Mesh |      26.0        1      26.0      26.0      26.0
                                   solver.advance |    2278.0        1    2278.0    2278.0    2278.0
                       solver.initialize.postinit |     178.0        1     178.0     178.0     178.0
                        solver.initialize.preinit |     925.0        1     925.0     925.0     925.0
```

</div>

The output for parallel solvers is slightly more complex.
After the name of the event, the table contains three block, each containing the sum, count, mean, min, and max runtime for a specific rank.

1. the first block displays the primary rank (0)
2. the second block displays the secondary rank which spend the least total time in `advance`
3. the third block displays the secondary rank which spend the most total time in `advance`

<div style="display:block;overflow-x:auto" markdown="1">

```console
$ precice-events analyze B
Reading events file events.json
Output timing are in us.
Selection contains the primary rank 0, the cheapest secondary rank 1, and the most expensive secondary rank 1.
                                                  event |   R0:sum R0:count  R0:mean   R0:min   R0:max |   R1:sum R1:count  R1:mean   R1:min   R1:max |   R1:sum R1:count  R1:mean   R1:min   R1:max
                                                _GLOBAL | 682837.0        1 682837.0 682837.0 682837.0 | 688767.0      1.0 688767.0 688767.0 688767.0 | 688767.0      1.0 688767.0 688767.0 688767.0
                                                advance | 148232.0        1 148232.0 148232.0 148232.0 | 279741.0      1.0 279741.0 279741.0 279741.0 | 279741.0      1.0 279741.0 279741.0 279741.0
                                advance/m2n.receiveData |     62.0        1     62.0     62.0     62.0 |    135.0      1.0    135.0    135.0    135.0 |    135.0      1.0    135.0    135.0    135.0
             advance/map.bbm.mapData.FromA-MeshToB-Mesh |    370.0        1    370.0    370.0    370.0 |    816.0      1.0    816.0    816.0    816.0 |    816.0      1.0    816.0    816.0    816.0
       advance/map.np.computeMapping.FromA-MeshToB-Mesh | 147005.0        1 147005.0 147005.0 147005.0 | 277955.0      1.0 277955.0 277955.0 277955.0 | 277955.0      1.0 277955.0 277955.0 277955.0
            advance/query.index.getEdgeIndexTree.A-Mesh |    600.0        1    600.0    600.0    600.0 |   1472.0      1.0   1472.0   1472.0   1472.0 |   1472.0      1.0   1472.0   1472.0   1472.0
        advance/query.index.getTriangleIndexTree.A-Mesh |    595.0        1    595.0    595.0    595.0 |   1363.0      1.0   1363.0   1363.0   1363.0 |   1363.0      1.0   1363.0   1363.0   1363.0
          advance/query.index.getVertexIndexTree.A-Mesh |    137.0        1    137.0    137.0    137.0 |    323.0      1.0    323.0    323.0    323.0 |    323.0      1.0    323.0    323.0    323.0
                                 com.initializeIntraCom |    218.0        1    218.0    218.0    218.0 |    249.0      1.0    249.0    249.0    249.0 |    249.0      1.0    249.0    249.0    249.0
                                              configure |    195.0        1    195.0    195.0    195.0 |    183.0      1.0    183.0    183.0    183.0 |    183.0      1.0    183.0    183.0    183.0
                                               finalize |    948.0        1    948.0    948.0    948.0 |    608.0      1.0    608.0    608.0    608.0 |    608.0      1.0    608.0    608.0    608.0
                                             initialize | 388972.0        1 388972.0 388972.0 388972.0 | 387525.0      1.0 387525.0 387525.0 387525.0 | 387525.0      1.0 387525.0 387525.0 387525.0
           initialize/m2n.acceptPrimaryRankConnection.A |  34160.0        1  34160.0  34160.0  34160.0 |  32905.0      1.0  32905.0  32905.0  32905.0 |  32905.0      1.0  32905.0  32905.0  32905.0
          initialize/m2n.acceptSecondaryRanksConnection |  49414.0        1  49414.0  49414.0  49414.0 |  49558.0      1.0  49558.0  49558.0  49558.0 |  49558.0      1.0  49558.0  49558.0  49558.0
            initialize/m2n.broadcastVertexDistributions |    756.0        1    756.0    756.0    756.0 |  47515.0      1.0  47515.0  47515.0  47515.0 |  47515.0      1.0  47515.0  47515.0  47515.0
                   initialize/m2n.buildCommunicationMap |    214.0        1    214.0    214.0    214.0 |    254.0      1.0    254.0    254.0    254.0 |    254.0      1.0    254.0    254.0    254.0
                    initialize/m2n.createCommunications |   1433.0        1   1433.0   1433.0   1433.0 |   1682.0      1.0   1682.0   1682.0   1682.0 |   1682.0      1.0   1682.0   1682.0   1682.0
              initialize/m2n.exchangeVertexDistribution |  46859.0        1  46859.0  46859.0  46859.0 |                                              |                                             
initialize/map.bbm.tagMeshFirstRound.FromA-MeshToB-Mesh | 157790.0        1 157790.0 157790.0 157790.0 | 284166.0      1.0 284166.0 284166.0 284166.0 | 284166.0      1.0 284166.0 284166.0 284166.0
    initialize/map.np.computeMapping.FromA-MeshToB-Mesh | 157310.0        1 157310.0 157310.0 157310.0 | 283217.0      1.0 283217.0 283217.0 283217.0 | 283217.0      1.0 283217.0 283217.0 283217.0
              initialize/partition.broadcastMesh.A-Mesh |   1174.0        1   1174.0   1174.0   1174.0 |   3702.0      1.0   3702.0   3702.0   3702.0 |   3702.0      1.0   3702.0   3702.0   3702.0
     initialize/partition.createOwnerInformation.A-Mesh | 131409.0        1 131409.0 131409.0 131409.0 |    803.0      1.0    803.0    803.0    803.0 |    803.0      1.0    803.0    803.0    803.0
               initialize/partition.feedbackMesh.A-Mesh |   2063.0        1   2063.0   2063.0   2063.0 |     91.0      1.0     91.0     91.0     91.0 |     91.0      1.0     91.0     91.0     91.0
               initialize/partition.filterMeshBB.A-Mesh |   3098.0        1   3098.0   3098.0   3098.0 |   4587.0      1.0   4587.0   4587.0   4587.0 |   4587.0      1.0   4587.0   4587.0   4587.0
          initialize/partition.filterMeshMappingsA-Mesh |   1608.0        1   1608.0   1608.0   1608.0 |   3487.0      1.0   3487.0   3487.0   3487.0 |   3487.0      1.0   3487.0   3487.0   3487.0
                initialize/partition.prepareMesh.B-Mesh |    239.0        1    239.0    239.0    239.0 |    381.0      1.0    381.0    381.0    381.0 |    381.0      1.0    381.0    381.0    381.0
          initialize/partition.receiveGlobalMesh.A-Mesh |   4822.0        1   4822.0   4822.0   4822.0 |      1.0      1.0      1.0      1.0      1.0 |      1.0      1.0      1.0      1.0      1.0
                           initialize/preprocess.B-Mesh |     54.0        1     54.0     54.0     54.0 |     50.0      1.0     50.0     50.0     50.0 |     50.0      1.0     50.0     50.0     50.0
         initialize/query.index.getEdgeIndexTree.A-Mesh |   1228.0        1   1228.0   1228.0   1228.0 |   1884.0      1.0   1884.0   1884.0   1884.0 |   1884.0      1.0   1884.0   1884.0   1884.0
     initialize/query.index.getTriangleIndexTree.A-Mesh |   1224.0        1   1224.0   1224.0   1224.0 |   1781.0      1.0   1781.0   1781.0   1781.0 |   1781.0      1.0   1781.0   1781.0   1781.0
       initialize/query.index.getVertexIndexTree.A-Mesh |    281.0        1    281.0    281.0    281.0 |    431.0      1.0    431.0    431.0    431.0 |    431.0      1.0    431.0    431.0    431.0
                                         solver.advance | 138517.0        1 138517.0 138517.0 138517.0 |  12985.0      1.0  12985.0  12985.0  12985.0 |  12985.0      1.0  12985.0  12985.0  12985.0
                             solver.initialize.postinit |   1223.0        1   1223.0   1223.0   1223.0 |   1559.0      1.0   1559.0   1559.0   1559.0 |   1559.0      1.0   1559.0   1559.0   1559.0
                              solver.initialize.preinit |   4275.0        1   4275.0   4275.0   4275.0 |   5581.0      1.0   5581.0   5581.0   5581.0 |   5581.0      1.0   5581.0   5581.0   5581.0
```

</div>

### Processing in other software

You can run `precice-events export` to export the `events.json` file as `events.csv`.
This contains a CSV data including all individual events from all participants and ranks.
It also contains data entries attached events.
The header of the result CSV is `participant,rank,size,event,timestamp,duration,data`.

```console
$ precice-events export
Reading events file events.json
Writing to events.csv
```

Example of loading the csv into pandas and extracting rank 0 of participant A:

```py
import pandas
df = pandas.read_csv("events.csv")
selection = df[ (df["participant"] == "A") & (df["rank"] == 0) ]
```
