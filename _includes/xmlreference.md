<!-- generated with preCICE 2.5.0 -->
# precice-configuration

Main tag containing preCICE configuration.

**Example:**  
```xml
<precice-configuration sync-mode="0">
  <log enabled="1">
    ...
  </log>
  <solver-interface dimensions="2" experimental="0">
    ...
  </solver-interface>
</precice-configuration>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| sync-mode | boolean | sync-mode enabled additional inter- and intra-participant synchronizations | `0` | none |

**Valid Subtags:**

* [log](#log) `0..1`
* [solver-interface](#solver-interface) `1`


## log

Configures logging sinks based on Boost log.

**Example:**  
```xml
<log enabled="1">
  <sink filter="(%Severity% > debug) and not ((%Severity% = info) and (%Rank% != 0))" format="(%Rank%) %TimeStamp(format="%H:%M:%S")% [%Module%]:%Line% in %Function%: %ColorizedSeverity%%Message%" output="stdout" type="stream" enabled="1"/>
</log>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| enabled | boolean | Enables logging | `1` | none |

**Valid Subtags:**

* [sink](#sink) `0..*`


### sink

Contains the configuration of a single log sink, which allows fine grained control of what to log where. Available attributes in filter and format strings are `%Severity%`, `%ColorizedSeverity%`, `%File%`, `%Line%`, `%Function%`, `%Module%`, `%Rank%`, and `%Participant%`

**Example:**  
```xml
<sink filter="(%Severity% > debug) and not ((%Severity% = info) and (%Rank% != 0))" format="(%Rank%) %TimeStamp(format="%H:%M:%S")% [%Module%]:%Line% in %Function%: %ColorizedSeverity%%Message%" output="stdout" type="stream" enabled="1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| filter | string | Boost Log Filter String | `(%Severity% > debug) and not ((%Severity% = info) and (%Rank% != 0))` | none |
| format | string | Boost Log Format String | `(%Rank%) %TimeStamp(format="%H:%M:%S")% [%Module%]:%Line% in %Function%: %ColorizedSeverity%%Message%` | none |
| output | string | Depends on the type of the sink. For streams, this can be stdout or stderr. For files, this is the filename. | `stdout` | none |
| type | string | The type of sink. | `stream` | `stream`, `file` |
| enabled | boolean | Enables the sink | `1` | none |





## solver-interface

Configuration of simulation relevant features.

**Example:**  
```xml
<solver-interface dimensions="2" experimental="0">
  <data:scalar name="{string}"/>
  <mesh name="{string}" flip-normals="0">
    ...
  </mesh>
  <m2n:sockets port="0" exchange-directory="" from="{string}" network="lo" to="{string}" enforce-gather-scatter="0" use-two-level-initialization="0"/>
  <participant name="{string}">
    ...
  </participant>
  <coupling-scheme:serial-explicit>
    ...
  </coupling-scheme:serial-explicit>
</solver-interface>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| dimensions | integer | Determines the spatial dimensionality of the configuration | `2` | `2`, `3` |
| experimental | boolean | Enable experimental features. | `0` | none |

**Valid Subtags:**

* [mesh](#mesh) `1..*`
* [participant](#participant) `1..*`
* coupling-scheme
  * [serial-explicit](#coupling-schemeserial-explicit) `0..*`
  * [parallel-explicit](#coupling-schemeparallel-explicit) `0..*`
  * [serial-implicit](#coupling-schemeserial-implicit) `0..*`
  * [parallel-implicit](#coupling-schemeparallel-implicit) `0..*`
  * [multi](#coupling-schememulti) `0..*`
* data
  * [scalar](#datascalar) `0..*`
  * [vector](#datavector) `0..*`
* m2n
  * [sockets](#m2nsockets) `0..*`
  * [mpi-multiple-ports](#m2nmpi-multiple-ports) `0..*`
  * [mpi](#m2nmpi) `0..*`
  * [mpi-singleports](#m2nmpi-singleports) `0..*`


### data:scalar

Defines a scalar data set to be assigned to meshes.

**Example:**  
```xml
<data:scalar name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Unique name for the data set. | _none_ | none |



### data:vector

Defines a vector data set to be assigned to meshes. The number of components of each data entry depends on the spatial dimensions set in tag <solver-interface>.

**Example:**  
```xml
<data:vector name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Unique name for the data set. | _none_ | none |



### mesh

Surface mesh consisting of vertices and (optional) of edges and triangles (only in 3D). The vertices of a mesh can carry data, configured by tag <use-data>. The mesh coordinates have to be defined by a participant (see tag <use-mesh>).

**Example:**  
```xml
<mesh name="{string}" flip-normals="0">
  <use-data name="{string}"/>
</mesh>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Unique name for the mesh. | _none_ | none |
| flip-normals | boolean | Deprecated. | `0` | none |

**Valid Subtags:**

* [use-data](#use-data) `0..*`


#### use-data

Assigns a before defined data set (see tag <data>) to the mesh.

**Example:**  
```xml
<use-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data set. | _none_ | none |





### m2n:sockets

Communication via Sockets.

**Example:**  
```xml
<m2n:sockets port="0" exchange-directory="" from="{string}" network="lo" to="{string}" enforce-gather-scatter="0" use-two-level-initialization="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| port | integer | Port number (16-bit unsigned integer) to be used for socket communication. The default is "0", what means that the OS will dynamically search for a free port (if at least one exists) and bind it automatically. | `0` | none |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen, and both solvers have to be started in the same directory. | `` | none |
| from | string | First participant name involved in communication. For performance reasons, we recommend to use the participant with less ranks at the coupling interface as "from" in the m2n communication. | _none_ | none |
| network | string | Interface name to be used for socket communication. Default is the canonical name of the loopback interface of your platform. Might be different on supercomputing systems, e.g. "ib0" for the InfiniBand on SuperMUC.  | `lo` | none |
| to | string | Second participant name involved in communication. | _none_ | none |
| enforce-gather-scatter | boolean | Enforce the distributed communication to a gather-scatter scheme. Only recommended for trouble shooting. | `0` | none |
| use-two-level-initialization | boolean | Use a two-level initialization scheme. Recommended for large parallel runs (>5000 MPI ranks). | `0` | none |



### m2n:mpi-multiple-ports

Communication via MPI with startup in separated communication spaces, using multiple communicators.

**Example:**  
```xml
<m2n:mpi-multiple-ports exchange-directory="" from="{string}" to="{string}" enforce-gather-scatter="0" use-two-level-initialization="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen, and both solvers have to be started in the same directory. | `` | none |
| from | string | First participant name involved in communication. For performance reasons, we recommend to use the participant with less ranks at the coupling interface as "from" in the m2n communication. | _none_ | none |
| to | string | Second participant name involved in communication. | _none_ | none |
| enforce-gather-scatter | boolean | Enforce the distributed communication to a gather-scatter scheme. Only recommended for trouble shooting. | `0` | none |
| use-two-level-initialization | boolean | Use a two-level initialization scheme. Recommended for large parallel runs (>5000 MPI ranks). | `0` | none |



### m2n:mpi

Communication via MPI with startup in separated communication spaces, using a single communicator

**Example:**  
```xml
<m2n:mpi exchange-directory="" from="{string}" to="{string}" enforce-gather-scatter="0" use-two-level-initialization="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen, and both solvers have to be started in the same directory. | `` | none |
| from | string | First participant name involved in communication. For performance reasons, we recommend to use the participant with less ranks at the coupling interface as "from" in the m2n communication. | _none_ | none |
| to | string | Second participant name involved in communication. | _none_ | none |
| enforce-gather-scatter | boolean | Enforce the distributed communication to a gather-scatter scheme. Only recommended for trouble shooting. | `0` | none |
| use-two-level-initialization | boolean | Use a two-level initialization scheme. Recommended for large parallel runs (>5000 MPI ranks). | `0` | none |



### m2n:mpi-singleports

Communication via MPI with startup in separated communication spaces, using a single communicator

**Example:**  
```xml
<m2n:mpi-singleports exchange-directory="" from="{string}" to="{string}" enforce-gather-scatter="0" use-two-level-initialization="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen, and both solvers have to be started in the same directory. | `` | none |
| from | string | First participant name involved in communication. For performance reasons, we recommend to use the participant with less ranks at the coupling interface as "from" in the m2n communication. | _none_ | none |
| to | string | Second participant name involved in communication. | _none_ | none |
| enforce-gather-scatter | boolean | Enforce the distributed communication to a gather-scatter scheme. Only recommended for trouble shooting. | `0` | none |
| use-two-level-initialization | boolean | Use a two-level initialization scheme. Recommended for large parallel runs (>5000 MPI ranks). | `0` | none |



### participant

Represents one solver using preCICE. At least two participants have to be defined.

**Example:**  
```xml
<participant name="{string}">
  <write-data mesh="{string}" name="{string}"/>
  <read-data waveform-order="0" mesh="{string}" name="{string}"/>
  <mapping:rbf-thin-plate-splines solver-rtol="1e-09" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
  <action:multiply-by-area mesh="{string}" timing="{string}">
    ...
  </action:multiply-by-area>
  <export:vtk every-n-time-windows="1" directory="" every-iteration="0" normals="0"/>
  <watch-point mesh="{string}" name="{string}" coordinate="{vector}"/>
  <watch-integral mesh="{string}" name="{string}" scale-with-connectivity="{boolean}"/>
  <use-mesh safety-factor="0.5" from="" geometric-filter="on-secondary-ranks" name="{string}" direct-access="0" provide="0"/>
  <master:sockets port="0" exchange-directory="" network="lo"/>
  <intra-comm:sockets port="0" exchange-directory="" network="lo"/>
</participant>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the participant. Has to match the name given on construction of the precice::SolverInterface object used by the participant. | _none_ | none |

**Valid Subtags:**

* [write-data](#write-data) `0..*`
* [read-data](#read-data) `0..*`
* [watch-point](#watch-point) `0..*`
* [watch-integral](#watch-integral) `0..*`
* [use-mesh](#use-mesh) `0..*`
* action
  * [multiply-by-area](#actionmultiply-by-area) `0..*`
  * [divide-by-area](#actiondivide-by-area) `0..*`
  * [scale-by-computed-dt-ratio](#actionscale-by-computed-dt-ratio) `0..*`
  * [scale-by-computed-dt-part-ratio](#actionscale-by-computed-dt-part-ratio) `0..*`
  * [scale-by-dt](#actionscale-by-dt) `0..*`
  * [summation](#actionsummation) `0..*`
  * [compute-curvature](#actioncompute-curvature) `0..*`
  * [recorder](#actionrecorder) `0..*`
  * [python](#actionpython) `0..*`
* export
  * [vtk](#exportvtk) `0..*`
  * [vtu](#exportvtu) `0..*`
  * [vtp](#exportvtp) `0..*`
  * [csv](#exportcsv) `0..*`
* intra-comm
  * [sockets](#intra-commsockets) `0..1`
  * [mpi](#intra-commmpi) `0..1`
  * [mpi-single](#intra-commmpi-single) `0..1`
* mapping
  * [rbf-thin-plate-splines](#mappingrbf-thin-plate-splines) `0..*`
  * [rbf-multiquadrics](#mappingrbf-multiquadrics) `0..*`
  * [rbf-inverse-multiquadrics](#mappingrbf-inverse-multiquadrics) `0..*`
  * [rbf-volume-splines](#mappingrbf-volume-splines) `0..*`
  * [rbf-gaussian](#mappingrbf-gaussian) `0..*`
  * [rbf-compact-tps-c2](#mappingrbf-compact-tps-c2) `0..*`
  * [rbf-compact-polynomial-c0](#mappingrbf-compact-polynomial-c0) `0..*`
  * [rbf-compact-polynomial-c6](#mappingrbf-compact-polynomial-c6) `0..*`
  * [nearest-neighbor](#mappingnearest-neighbor) `0..*`
  * [nearest-projection](#mappingnearest-projection) `0..*`
  * [nearest-neighbor-gradient](#mappingnearest-neighbor-gradient) `0..*`
  * [linear-cell-interpolation](#mappinglinear-cell-interpolation) `0..*`
* master
  * [sockets](#mastersockets) `0..1`
  * [mpi](#mastermpi) `0..1`
  * [mpi-single](#mastermpi-single) `0..1`
  * [sockets](#mastersockets-1) `0..1`
  * [mpi](#mastermpi-1) `0..1`
  * [mpi-single](#mastermpi-single-1) `0..1`


#### write-data

Sets data to be written by the participant to preCICE. Data is defined by using the <data> tag.

**Example:**  
```xml
<write-data mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Mesh the data belongs to. If data should be read/written to several meshes, this has to be specified separately for each mesh. | _none_ | none |
| name | string | Name of the data. | _none_ | none |



#### read-data

Sets data to be read by the participant from preCICE. Data is defined by using the <data> tag.

**Example:**  
```xml
<read-data waveform-order="0" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| waveform-order | integer | Interpolation order used by waveform iteration when reading data. | `0` | none |
| mesh | string | Mesh the data belongs to. If data should be read/written to several meshes, this has to be specified separately for each mesh. | _none_ | none |
| name | string | Name of the data. | _none_ | none |



#### mapping:rbf-thin-plate-splines

Global radial-basis-function mapping based on the thin plate splines.

**Example:**  
```xml
<mapping:rbf-thin-plate-splines solver-rtol="1e-09" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| preallocation | string | Sets kind of preallocation for PETSc RBF implementation | `tree` | `estimate`, `compute`, `off`, `save`, `tree` |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |
| use-qr-decomposition | boolean | If set to true, QR decomposition is used to solve the RBF system | `0` | none |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `0` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `0` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `0` | none |



#### mapping:rbf-multiquadrics

Global radial-basis-function mapping based on the multiquadrics RBF.

**Example:**  
```xml
<mapping:rbf-multiquadrics shape-parameter="{float}" solver-rtol="1e-09" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| preallocation | string | Sets kind of preallocation for PETSc RBF implementation | `tree` | `estimate`, `compute`, `off`, `save`, `tree` |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |
| use-qr-decomposition | boolean | If set to true, QR decomposition is used to solve the RBF system | `0` | none |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `0` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `0` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `0` | none |



#### mapping:rbf-inverse-multiquadrics

Global radial-basis-function mapping based on the inverse multiquadrics RBF.

**Example:**  
```xml
<mapping:rbf-inverse-multiquadrics shape-parameter="{float}" solver-rtol="1e-09" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| preallocation | string | Sets kind of preallocation for PETSc RBF implementation | `tree` | `estimate`, `compute`, `off`, `save`, `tree` |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |
| use-qr-decomposition | boolean | If set to true, QR decomposition is used to solve the RBF system | `0` | none |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `0` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `0` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `0` | none |



#### mapping:rbf-volume-splines

Global radial-basis-function mapping based on the volume-splines RBF.

**Example:**  
```xml
<mapping:rbf-volume-splines solver-rtol="1e-09" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| preallocation | string | Sets kind of preallocation for PETSc RBF implementation | `tree` | `estimate`, `compute`, `off`, `save`, `tree` |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |
| use-qr-decomposition | boolean | If set to true, QR decomposition is used to solve the RBF system | `0` | none |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `0` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `0` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `0` | none |



#### mapping:rbf-gaussian

Local radial-basis-function mapping based on the Gaussian RBF using a cut-off threshold.

**Example:**  
```xml
<mapping:rbf-gaussian shape-parameter="nan" solver-rtol="1e-09" support-radius="nan" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | `nan` | none |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |
| support-radius | float | Support radius of each RBF basis function (global choice). | `nan` | none |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| preallocation | string | Sets kind of preallocation for PETSc RBF implementation | `tree` | `estimate`, `compute`, `off`, `save`, `tree` |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |
| use-qr-decomposition | boolean | If set to true, QR decomposition is used to solve the RBF system | `0` | none |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `0` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `0` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `0` | none |



#### mapping:rbf-compact-tps-c2

Local radial-basis-function mapping based on the C2-polynomial RBF.

**Example:**  
```xml
<mapping:rbf-compact-tps-c2 solver-rtol="1e-09" support-radius="{float}" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| preallocation | string | Sets kind of preallocation for PETSc RBF implementation | `tree` | `estimate`, `compute`, `off`, `save`, `tree` |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |
| use-qr-decomposition | boolean | If set to true, QR decomposition is used to solve the RBF system | `0` | none |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `0` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `0` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `0` | none |



#### mapping:rbf-compact-polynomial-c0

Local radial-basis-function mapping based on the C0-polynomial RBF.

**Example:**  
```xml
<mapping:rbf-compact-polynomial-c0 solver-rtol="1e-09" support-radius="{float}" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| preallocation | string | Sets kind of preallocation for PETSc RBF implementation | `tree` | `estimate`, `compute`, `off`, `save`, `tree` |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |
| use-qr-decomposition | boolean | If set to true, QR decomposition is used to solve the RBF system | `0` | none |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `0` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `0` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `0` | none |



#### mapping:rbf-compact-polynomial-c6

Local radial-basis-function mapping based on the C6-polynomial RBF.

**Example:**  
```xml
<mapping:rbf-compact-polynomial-c6 solver-rtol="1e-09" support-radius="{float}" constraint="{string}" direction="{string}" from="{string}" polynomial="separate" preallocation="tree" timing="initial" to="{string}" use-qr-decomposition="0" x-dead="0" y-dead="0" z-dead="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| preallocation | string | Sets kind of preallocation for PETSc RBF implementation | `tree` | `estimate`, `compute`, `off`, `save`, `tree` |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |
| use-qr-decomposition | boolean | If set to true, QR decomposition is used to solve the RBF system | `0` | none |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `0` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `0` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `0` | none |



#### mapping:nearest-neighbor

Nearest-neighbour mapping which uses a rstar-spacial index tree to index meshes and run nearest-neighbour queries.

**Example:**  
```xml
<mapping:nearest-neighbor constraint="{string}" direction="{string}" from="{string}" timing="initial" to="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |



#### mapping:nearest-projection

Nearest-projection mapping which uses a rstar-spacial index tree to index meshes and locate the nearest projections.

**Example:**  
```xml
<mapping:nearest-projection constraint="{string}" direction="{string}" from="{string}" timing="initial" to="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |



#### mapping:nearest-neighbor-gradient

Nearest-neighbor-gradient mapping which uses nearest-neighbor mapping with an additional linear approximation using gradient data.

**Example:**  
```xml
<mapping:nearest-neighbor-gradient constraint="{string}" direction="{string}" from="{string}" timing="initial" to="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |



#### mapping:linear-cell-interpolation

Linear cell interpolation mapping which uses a rstar-spacial index tree to index meshes and locate the nearest cell. Only supports 2D meshes.

**Example:**  
```xml
<mapping:linear-cell-interpolation constraint="{string}" direction="{string}" from="{string}" timing="initial" to="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent for normalized quantities where conservation of integral values is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent` |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| from | string | The mesh to map the data from. | _none_ | none |
| timing | string | This allows to defer the mapping of the data to advance or to a manual call to mapReadDataTo and mapWriteDataFrom. | `initial` | `initial`, `onadvance`, `ondemand` |
| to | string | The mesh to map the data to. | _none_ | none |



#### action:multiply-by-area

Multiplies data values with mesh area associated to vertex holding the value.

**Example:**  
```xml
<action:multiply-by-area mesh="{string}" timing="{string}">
  <target-data name="{string}"/>
</action:multiply-by-area>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |

**Valid Subtags:**

* [target-data](#target-data) `1`


##### target-data

Data to read from and write to.

**Example:**  
```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





#### action:divide-by-area

Divides data values by mesh area associated to vertex holding the value.

**Example:**  
```xml
<action:divide-by-area mesh="{string}" timing="{string}">
  <target-data name="{string}"/>
</action:divide-by-area>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |

**Valid Subtags:**

* [target-data](#target-data-1) `1`


##### target-data

Data to read from and write to.

**Example:**  
```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





#### action:scale-by-computed-dt-ratio

Multiplies source data values by ratio of last time step size / time window size, and writes the result into target data.

**Example:**  
```xml
<action:scale-by-computed-dt-ratio mesh="{string}" timing="{string}">
  <source-data name="{string}"/>
  <target-data name="{string}"/>
</action:scale-by-computed-dt-ratio>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |

**Valid Subtags:**

* [source-data](#source-data) `1`
* [target-data](#target-data-1) `1`


##### source-data

Single data to read from. 

**Example:**  
```xml
<source-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



##### target-data

Data to read from and write to.

**Example:**  
```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





#### action:scale-by-computed-dt-part-ratio

Multiplies source data values by ratio of computed time window part / time window size, and writes the result into target data.

**Example:**  
```xml
<action:scale-by-computed-dt-part-ratio mesh="{string}" timing="{string}">
  <source-data name="{string}"/>
  <target-data name="{string}"/>
</action:scale-by-computed-dt-part-ratio>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |

**Valid Subtags:**

* [source-data](#source-data-1) `1`
* [target-data](#target-data-1) `1`


##### source-data

Single data to read from. 

**Example:**  
```xml
<source-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



##### target-data

Data to read from and write to.

**Example:**  
```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





#### action:scale-by-dt

Multiplies source data values by the time window size, and writes the result into target data.

**Example:**  
```xml
<action:scale-by-dt mesh="{string}" timing="{string}">
  <source-data name="{string}"/>
  <target-data name="{string}"/>
</action:scale-by-dt>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |

**Valid Subtags:**

* [source-data](#source-data-1) `1`
* [target-data](#target-data-1) `1`


##### source-data

Single data to read from. 

**Example:**  
```xml
<source-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



##### target-data

Data to read from and write to.

**Example:**  
```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





#### action:summation

Sums up multiple source data values and writes the result into target data.

**Example:**  
```xml
<action:summation mesh="{string}" timing="{string}">
  <source-data name="{string}"/>
  <target-data name="{string}"/>
</action:summation>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |

**Valid Subtags:**

* [source-data](#source-data-1) `1..*`
* [target-data](#target-data-1) `1`


##### source-data

Multiple data to read from.

**Example:**  
```xml
<source-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



##### target-data

Data to read from and write to.

**Example:**  
```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





#### action:compute-curvature

Computes curvature values at mesh vertices.

**Example:**  
```xml
<action:compute-curvature mesh="{string}" timing="{string}">
  <target-data name="{string}"/>
</action:compute-curvature>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |

**Valid Subtags:**

* [target-data](#target-data-1) `1`


##### target-data

Data to read from and write to.

**Example:**  
```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





#### action:recorder

Records action invocations for testing purposes.

**Example:**  
```xml
<action:recorder mesh="{string}" timing="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |



#### action:python

Calls Python script to execute action. See preCICE file "src/action/PythonAction.py" for an overview.

**Example:**  
```xml
<action:python mesh="{string}" timing="{string}">
  <path name=""/>
  <module name="{string}"/>
  <source-data name="{string}"/>
  <target-data name="{string}"/>
</action:python>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Determines mesh used in action. | _none_ | none |
| timing | string | Determines when (relative to advancing the coupling scheme) the action is executed. | _none_ | `regular-prior`, `regular-post`, `on-exchange-prior`, `on-exchange-post`, `on-time-window-complete-post`, `write-mapping-prior`, `write-mapping-post`, `read-mapping-prior`, `read-mapping-post` |

**Valid Subtags:**

* [path](#path) `0..1`
* [module](#module) `1`
* [source-data](#source-data-1) `0..1`
* [target-data](#target-data-1) `0..1`


##### path

Directory path to Python module, i.e. script file. If it doesn't occur, the current path is used

**Example:**  
```xml
<path name=""/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | The path to the directory of the module. | `` | none |



##### module

Name of Python module, i.e. Python script file without file ending. The module name has to differ from existing (library) modules, otherwise, the existing module will be loaded instead of the user script.

**Example:**  
```xml
<module name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



##### source-data

Source data to be read is handed to the Python module. Can be omitted, if only a target data is needed.

**Example:**  
```xml
<source-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



##### target-data

Target data to be read and written to is handed to the Python module. Can be omitted, if only source data is needed.

**Example:**  
```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





#### export:vtk

Exports meshes to VTK legacy format files. Parallel participants will use the VTU exporter instead.

**Example:**  
```xml
<export:vtk every-n-time-windows="1" directory="" every-iteration="0" normals="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| every-n-time-windows | integer | preCICE does an export every X time windows. Choose -1 for no exports. | `1` | none |
| directory | string | Directory to export the files to. | `` | none |
| every-iteration | boolean | Exports in every coupling (sub)iteration. For debug purposes. | `0` | none |
| normals | boolean | Deprecated | `0` | none |



#### export:vtu

Exports meshes to VTU files in serial or PVTU files with VTU piece files in parallel.

**Example:**  
```xml
<export:vtu every-n-time-windows="1" directory="" every-iteration="0" normals="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| every-n-time-windows | integer | preCICE does an export every X time windows. Choose -1 for no exports. | `1` | none |
| directory | string | Directory to export the files to. | `` | none |
| every-iteration | boolean | Exports in every coupling (sub)iteration. For debug purposes. | `0` | none |
| normals | boolean | Deprecated | `0` | none |



#### export:vtp

Exports meshes to VTP files in serial or PVTP files with VTP piece files in parallel.

**Example:**  
```xml
<export:vtp every-n-time-windows="1" directory="" every-iteration="0" normals="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| every-n-time-windows | integer | preCICE does an export every X time windows. Choose -1 for no exports. | `1` | none |
| directory | string | Directory to export the files to. | `` | none |
| every-iteration | boolean | Exports in every coupling (sub)iteration. For debug purposes. | `0` | none |
| normals | boolean | Deprecated | `0` | none |



#### export:csv

Exports vertex coordinates and data to CSV files.

**Example:**  
```xml
<export:csv every-n-time-windows="1" directory="" every-iteration="0" normals="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| every-n-time-windows | integer | preCICE does an export every X time windows. Choose -1 for no exports. | `1` | none |
| directory | string | Directory to export the files to. | `` | none |
| every-iteration | boolean | Exports in every coupling (sub)iteration. For debug purposes. | `0` | none |
| normals | boolean | Deprecated | `0` | none |



#### watch-point

A watch point can be used to follow the transient changes of data and mesh vertex coordinates at a given point

**Example:**  
```xml
<watch-point mesh="{string}" name="{string}" coordinate="{vector}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Mesh to be watched. | _none_ | none |
| name | string | Name of the watch point. Is taken in combination with the participant name to construct the filename the watch point data is written to. | _none_ | none |
| coordinate | vector | The coordinates of the watch point. If the watch point is not put exactly on the mesh to observe, the closest projection of the point onto the mesh is considered instead, and values/coordinates are interpolated linearly to that point. | _none_ | none |



#### watch-integral

A watch integral can be used to follow the transient change of integral data and surface area for a given coupling mesh.

**Example:**  
```xml
<watch-integral mesh="{string}" name="{string}" scale-with-connectivity="{boolean}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | Mesh to be watched. | _none_ | none |
| name | string | Name of the watch integral. Is taken in combination with the participant name to construct the filename the watch integral data is written to. | _none_ | none |
| scale-with-connectivity | boolean | Whether the vertex data is scaled with the element area before summing up or not. In 2D, vertex data is scaled with the average length of neighboring edges. In 3D, vertex data is scaled with the average surface of neighboring triangles. If false, vertex data is directly summed up. | _none_ | none |



#### use-mesh

Makes a mesh (see tag <mesh> available to a participant.

**Example:**  
```xml
<use-mesh safety-factor="0.5" from="" geometric-filter="on-secondary-ranks" name="{string}" direct-access="0" provide="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| safety-factor | float | If a mesh is received from another partipant (see tag <from>), it needs to bedecomposed at the receiving participant. To speed up this process, a geometric filter (see tag <geometric-filter>), i.e. filtering by bounding boxes around the local mesh, can be used. This safety factor defines by which factor this local information is increased. An example: 0.5 means that the bounding box is 150% of its original size. | `0.5` | none |
| from | string | If a created mesh should be used by another solver, this attribute has to specify the creating participant's name. The creator has to use the attribute "provide" to signal he is providing the mesh geometry. | `` | none |
| geometric-filter | string | If a mesh is received from another partipant (see tag <from>), it needs to bedecomposed at the receiving participant. To speed up this process, a geometric filter, i.e. filtering by bounding boxes around the local mesh, can be used. Two different variants are implemented: a filter "on-master" strategy, which is beneficial for a huge mesh and a low number of processors, and a filter "on-slaves" strategy, which performs better for a very high number of processors. Both result in the same distribution (if the safety factor is sufficiently large). "on-master" is not supported if you use two-level initialization. For very asymmetric cases, the filter can also be switched off completely ("no-filter"). | `on-secondary-ranks` | `on-master`, `on-slaves`, `no-filter`, `on-primary-rank`, `on-secondary-ranks` |
| name | string | Name of the mesh. | _none_ | none |
| direct-access | boolean | If a mesh is received from another partipant (see tag <from>), it needs to bedecomposed at the receiving participant. In case a mapping is defined, the mesh is decomposed according to the local provided mesh associated to the mapping. In case no mapping has been defined (you want to access the mesh and related data direct), there is no obvious way on how to decompose the mesh, since no mesh needs to be provided by the participant. For this purpose, bounding boxes can be defined (see API function "setMeshAccessRegion") and used by selecting the option direct-access="true". | `0` | none |
| provide | boolean | If this attribute is set to "on", the participant has to create the mesh geometry before initializing preCICE. | `0` | none |



#### master:sockets

A solver in parallel needs a communication between its ranks. By default, the participant's MPI_COM_WORLD is reused.Use this tag to use TCP/IP sockets instead.

**Example:**  
```xml
<master:sockets port="0" exchange-directory="" network="lo"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| port | integer | Port number (16-bit unsigned integer) to be used for socket communication. The default is "0", what means that OS will dynamically search for a free port (if at least one exists) and bind it automatically. | `0` | none |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen. | `` | none |
| network | string | Interface name to be used for socket communication. Default is the canonical name of the loopback interface of your platform. Might be different on supercomputing systems, e.g. "ib0" for the InfiniBand on SuperMUC.  | `lo` | none |



#### master:mpi

A solver in parallel needs a communication between its ranks. By default, the participant's MPI_COM_WORLD is reused.Use this tag to use MPI with separated communication spaces instead instead.

**Example:**  
```xml
<master:mpi exchange-directory=""/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen. | `` | none |



#### master:mpi-single

A solver in parallel needs a communication between its ranks. By default (which is this option), the participant's MPI_COM_WORLD is reused.This tag is only used to ensure backwards compatibility.

**Example:**  
```xml
<master:mpi-single/>
```



#### master:sockets

A solver in parallel needs a communication between its ranks. By default, the participant's MPI_COM_WORLD is reused.Use this tag to use TCP/IP sockets instead.

**Example:**  
```xml
<master:sockets port="0" exchange-directory="" network="lo"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| port | integer | Port number (16-bit unsigned integer) to be used for socket communication. The default is "0", what means that OS will dynamically search for a free port (if at least one exists) and bind it automatically. | `0` | none |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen. | `` | none |
| network | string | Interface name to be used for socket communication. Default is the canonical name of the loopback interface of your platform. Might be different on supercomputing systems, e.g. "ib0" for the InfiniBand on SuperMUC.  | `lo` | none |



#### master:mpi

A solver in parallel needs a communication between its ranks. By default, the participant's MPI_COM_WORLD is reused.Use this tag to use MPI with separated communication spaces instead instead.

**Example:**  
```xml
<master:mpi exchange-directory=""/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen. | `` | none |



#### master:mpi-single

A solver in parallel needs a communication between its ranks. By default (which is this option), the participant's MPI_COM_WORLD is reused.This tag is only used to ensure backwards compatibility.

**Example:**  
```xml
<master:mpi-single/>
```



#### intra-comm:sockets

A solver in parallel needs a communication between its ranks. By default, the participant's MPI_COM_WORLD is reused.Use this tag to use TCP/IP sockets instead.

**Example:**  
```xml
<intra-comm:sockets port="0" exchange-directory="" network="lo"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| port | integer | Port number (16-bit unsigned integer) to be used for socket communication. The default is "0", what means that OS will dynamically search for a free port (if at least one exists) and bind it automatically. | `0` | none |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen. | `` | none |
| network | string | Interface name to be used for socket communication. Default is the canonical name of the loopback interface of your platform. Might be different on supercomputing systems, e.g. "ib0" for the InfiniBand on SuperMUC.  | `lo` | none |



#### intra-comm:mpi

A solver in parallel needs a communication between its ranks. By default, the participant's MPI_COM_WORLD is reused.Use this tag to use MPI with separated communication spaces instead instead.

**Example:**  
```xml
<intra-comm:mpi exchange-directory=""/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen. | `` | none |



#### intra-comm:mpi-single

A solver in parallel needs a communication between its ranks. By default (which is this option), the participant's MPI_COM_WORLD is reused.This tag is only used to ensure backwards compatibility.

**Example:**  
```xml
<intra-comm:mpi-single/>
```





### coupling-scheme:serial-explicit

Explicit coupling scheme according to conventional serial staggered procedure (CSS).

**Example:**  
```xml
<coupling-scheme:serial-explicit>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1" valid-digits="10" method="fixed"/>
  <participants first="{string}" second="{string}"/>
  <exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
</coupling-scheme:serial-explicit>
```

**Valid Subtags:**

* [max-time](#max-time) `0..1`
* [max-time-windows](#max-time-windows) `0..1`
* [time-window-size](#time-window-size) `1`
* [participants](#participants) `1`
* [exchange](#exchange) `1..*`


#### max-time

Defined the end of the simulation as total time.

**Example:**  
```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



#### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  
```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



#### time-window-size

Defines the size of the time window.

**Example:**  
```xml
<time-window-size value="-1" valid-digits="10" method="fixed"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |
| valid-digits | integer | Precision to use when checking for end of time windows used this many digits. \\(\phi = 10^{-validDigits}\\) | `10` | none |
| method | string | The method used to determine the time window size. Use `fixed` to fix the time window size for the participants. | `fixed` | `fixed`, `first-participant` |



#### participants

Defines the participants of the coupling scheme.

**Example:**  
```xml
<participants first="{string}" second="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| first | string | First participant to run the solver. | _none_ | none |
| second | string | Second participant to run the solver. | _none_ | none |



#### exchange

Defines the flow of data between meshes of participants.

**Example:**  
```xml
<exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initializeData? | `0` | none |





### coupling-scheme:parallel-explicit

Explicit coupling scheme according to conventional parallel staggered procedure (CPS).

**Example:**  
```xml
<coupling-scheme:parallel-explicit>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1" valid-digits="10" method="fixed"/>
  <participants first="{string}" second="{string}"/>
  <exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
</coupling-scheme:parallel-explicit>
```

**Valid Subtags:**

* [max-time](#max-time-1) `0..1`
* [max-time-windows](#max-time-windows-1) `0..1`
* [time-window-size](#time-window-size-1) `1`
* [participants](#participants-1) `1`
* [exchange](#exchange-1) `1..*`


#### max-time

Defined the end of the simulation as total time.

**Example:**  
```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



#### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  
```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



#### time-window-size

Defines the size of the time window.

**Example:**  
```xml
<time-window-size value="-1" valid-digits="10" method="fixed"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |
| valid-digits | integer | Precision to use when checking for end of time windows used this many digits. \\(\phi = 10^{-validDigits}\\) | `10` | none |
| method | string | The method used to determine the time window size. Use `fixed` to fix the time window size for the participants. | `fixed` | `fixed` |



#### participants

Defines the participants of the coupling scheme.

**Example:**  
```xml
<participants first="{string}" second="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| first | string | First participant to run the solver. | _none_ | none |
| second | string | Second participant to run the solver. | _none_ | none |



#### exchange

Defines the flow of data between meshes of participants.

**Example:**  
```xml
<exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initializeData? | `0` | none |





### coupling-scheme:serial-implicit

Implicit coupling scheme according to block Gauss-Seidel iterations (S-System). Improved implicit iterations are achieved by using a acceleration (recommended!).

**Example:**  
```xml
<coupling-scheme:serial-implicit>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1" valid-digits="10" method="fixed"/>
  <participants first="{string}" second="{string}"/>
  <exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
  <acceleration:constant>
    ...
  </acceleration:constant>
  <absolute-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <residual-relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <min-iteration-convergence-measure min-iterations="{integer}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <max-iterations value="{integer}"/>
  <extrapolation-order value="{integer}"/>
</coupling-scheme:serial-implicit>
```

**Valid Subtags:**

* [max-time](#max-time-1) `0..1`
* [max-time-windows](#max-time-windows-1) `0..1`
* [time-window-size](#time-window-size-1) `1`
* [participants](#participants-1) `1`
* [exchange](#exchange-1) `1..*`
* [absolute-convergence-measure](#absolute-convergence-measure) `0..*`
* [relative-convergence-measure](#relative-convergence-measure) `0..*`
* [residual-relative-convergence-measure](#residual-relative-convergence-measure) `0..*`
* [min-iteration-convergence-measure](#min-iteration-convergence-measure) `0..*`
* [max-iterations](#max-iterations) `1`
* [extrapolation-order](#extrapolation-order) `0..1`
* acceleration
  * [constant](#accelerationconstant) `0..1`
  * [aitken](#accelerationaitken) `0..1`
  * [IQN-ILS](#accelerationiqn-ils) `0..1`
  * [IQN-IMVJ](#accelerationiqn-imvj) `0..1`
  * [broyden](#accelerationbroyden) `0..1`


#### max-time

Defined the end of the simulation as total time.

**Example:**  
```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



#### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  
```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



#### time-window-size

Defines the size of the time window.

**Example:**  
```xml
<time-window-size value="-1" valid-digits="10" method="fixed"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |
| valid-digits | integer | Precision to use when checking for end of time windows used this many digits. \\(\phi = 10^{-validDigits}\\) | `10` | none |
| method | string | The method used to determine the time window size. Use `fixed` to fix the time window size for the participants. | `fixed` | `fixed`, `first-participant` |



#### participants

Defines the participants of the coupling scheme.

**Example:**  
```xml
<participants first="{string}" second="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| first | string | First participant to run the solver. | _none_ | none |
| second | string | Second participant to run the solver. | _none_ | none |



#### exchange

Defines the flow of data between meshes of participants.

**Example:**  
```xml
<exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initializeData? | `0` | none |



#### acceleration:constant

Accelerates coupling data with constant underrelaxation.

**Example:**  
```xml
<acceleration:constant>
  <relaxation value="{float}"/>
</acceleration:constant>
```

**Valid Subtags:**

* [relaxation](#relaxation) `1`


##### relaxation



**Example:**  
```xml
<relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Constant relaxation factor. | _none_ | none |





#### acceleration:aitken

Accelerates coupling data with dynamic Aitken under-relaxation.

**Example:**  
```xml
<acceleration:aitken>
  <initial-relaxation value="{float}"/>
  <data mesh="{string}" name="{string}"/>
</acceleration:aitken>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation) `1`
* [data](#data) `1..*`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |





#### acceleration:IQN-ILS

Accelerates coupling data with the interface quasi-Newton inverse least-squares method.

**Example:**  
```xml
<acceleration:IQN-ILS>
  <initial-relaxation value="{float}" enforce="0"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
  <filter limit="1e-16" type="{string}"/>
  <preconditioner freeze-after="-1" type="{string}"/>
</acceleration:IQN-ILS>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [max-used-iterations](#max-used-iterations) `1`
* [time-windows-reused](#time-windows-reused) `1`
* [data](#data-1) `1..*`
* [filter](#filter) `0..1`
* [preconditioner](#preconditioner) `0..1`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `0` | none |



##### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian.

**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian.

**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of time windows. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |



##### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:
 - `QR1-filter`: updateQR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
 - `QR1_absolute-filter`: updateQR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
 - `QR2-filter`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  
```xml
<filter limit="1e-16" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | _none_ | `QR1`, `QR1-absolute`, `QR2` |



##### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.  A value preconditioner scales every acceleration data by the norm of the data in the previous time window. A residual preconditioner scales every acceleration data by the current residual. A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

**Example:**  
```xml
<preconditioner freeze-after="-1" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |





#### acceleration:IQN-IMVJ

Accelerates coupling data with the interface quasi-Newton inverse multi-vector Jacobian method.

**Example:**  
```xml
<acceleration:IQN-IMVJ always-build-jacobian="0">
  <initial-relaxation value="{float}" enforce="0"/>
  <imvj-restart-mode truncation-threshold="0.0001" chunk-size="8" reused-time-windows-at-restart="8" type="RS-SVD"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
  <filter limit="1e-16" type="{string}"/>
  <preconditioner freeze-after="-1" type="{string}"/>
</acceleration:IQN-IMVJ>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| always-build-jacobian | boolean | If set to true, the IMVJ will set up the Jacobian matrix in each coupling iteration, which is inefficient. If set to false (or not set) the Jacobian is only build in the last iteration and the updates are computed using (relatively) cheap MATVEC products. | `0` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [imvj-restart-mode](#imvj-restart-mode) `0..1`
* [max-used-iterations](#max-used-iterations-1) `1`
* [time-windows-reused](#time-windows-reused-1) `1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `0` | none |



##### imvj-restart-mode

Type of IMVJ restart mode that is used:
- `no-restart`: IMVJ runs in normal mode with explicit representation of Jacobian
- `RS-ZERO`:    IMVJ runs in restart mode. After M time windows all Jacobain information is dropped, restart with no information
- `RS-LS`:      IMVJ runs in restart mode. After M time windows a IQN-LS like approximation for the initial guess of the Jacobian is computed.
- `RS-SVD`:     IMVJ runs in restart mode. After M time windows a truncated SVD of the Jacobian is updated.
- `RS-SLIDE`:   IMVJ runs in sliding window restart mode.


**Example:**  
```xml
<imvj-restart-mode truncation-threshold="0.0001" chunk-size="8" reused-time-windows-at-restart="8" type="RS-SVD"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| truncation-threshold | float | If IMVJ restart-mode=RS-SVD, the truncation threshold for the updated SVD can be set. | `0.0001` | none |
| chunk-size | integer | Specifies the number of time windows M after which the IMVJ restarts, if run in restart-mode. Default value is M=8. | `8` | none |
| reused-time-windows-at-restart | integer | If IMVJ restart-mode=RS-LS, the number of reused time windows at restart can be specified. | `8` | none |
| type | string | Type of the restart mode. | `RS-SVD` | `no-restart`, `RS-0`, `RS-LS`, `RS-SVD`, `RS-SLIDE` |



##### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian.

**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian.

**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |



##### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:
 - `QR1-filter`: updateQR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
 - `QR1_absolute-filter`: updateQR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
 - `QR2-filter`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  
```xml
<filter limit="1e-16" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | _none_ | `QR1`, `QR1-absolute`, `QR2` |



##### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.
- A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.


**Example:**  
```xml
<preconditioner freeze-after="-1" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |
| type | string | Type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |





#### acceleration:broyden

Accelerates coupling data with the (single-vector) Broyden method.

**Example:**  
```xml
<acceleration:broyden>
  <initial-relaxation value="{float}" enforce="0"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
</acceleration:broyden>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [max-used-iterations](#max-used-iterations-1) `1`
* [time-windows-reused](#time-windows-reused-1) `1`
* [data](#data-1) `1..*`


##### initial-relaxation



**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float |  | _none_ | none |
| enforce | boolean |  | `0` | none |



##### max-used-iterations



**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer |  | _none_ | none |



##### time-windows-reused



**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer |  | _none_ | none |



##### data



**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string |  | _none_ | none |
| name | string |  | _none_ | none |





#### absolute-convergence-measure

Absolute convergence criterion based on the two-norm difference of data values between iterations.
\$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{limit}\$$

**Example:**  
```xml
<absolute-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### relative-convergence-measure

Relative convergence criterion based on the relative two-norm difference of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{limit} \$$

**Example:**  
```xml
<relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \\((0, 1]\\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### residual-relative-convergence-measure

Residual relative convergence criterion based on the relative two-norm differences of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^{k-1}) - x^{k-1} \right\rVert_2} < \text{limit}\$$

**Example:**  
```xml
<residual-relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### min-iteration-convergence-measure

Convergence criterion used to ensure a miminimal amount of iterations. Specifying a mesh and data is required for technical reasons and does not influence the measure.

**Example:**  
```xml
<min-iteration-convergence-measure min-iterations="{integer}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| min-iterations | integer | The minimal amount of iterations. | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### max-iterations

Allows to specify a maximum amount of iterations per time window.

**Example:**  
```xml
<max-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum value of iterations. | _none_ | none |



#### extrapolation-order

Sets order of predictor of interface values for first participant.

**Example:**  
```xml
<extrapolation-order value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The extrapolation order to use. | _none_ | none |





### coupling-scheme:parallel-implicit

Parallel Implicit coupling scheme according to block Jacobi iterations (V-System). Improved implicit iterations are achieved by using a acceleration (recommended!).

**Example:**  
```xml
<coupling-scheme:parallel-implicit>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1" valid-digits="10" method="fixed"/>
  <participants first="{string}" second="{string}"/>
  <exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
  <acceleration:constant>
    ...
  </acceleration:constant>
  <absolute-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <residual-relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <min-iteration-convergence-measure min-iterations="{integer}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <max-iterations value="{integer}"/>
  <extrapolation-order value="{integer}"/>
</coupling-scheme:parallel-implicit>
```

**Valid Subtags:**

* [max-time](#max-time-1) `0..1`
* [max-time-windows](#max-time-windows-1) `0..1`
* [time-window-size](#time-window-size-1) `1`
* [participants](#participants-1) `1`
* [exchange](#exchange-1) `1..*`
* [absolute-convergence-measure](#absolute-convergence-measure-1) `0..*`
* [relative-convergence-measure](#relative-convergence-measure-1) `0..*`
* [residual-relative-convergence-measure](#residual-relative-convergence-measure-1) `0..*`
* [min-iteration-convergence-measure](#min-iteration-convergence-measure-1) `0..*`
* [max-iterations](#max-iterations-1) `1`
* [extrapolation-order](#extrapolation-order-1) `0..1`
* acceleration
  * [constant](#accelerationconstant-1) `0..1`
  * [aitken](#accelerationaitken-1) `0..1`
  * [IQN-ILS](#accelerationiqn-ils-1) `0..1`
  * [IQN-IMVJ](#accelerationiqn-imvj-1) `0..1`
  * [broyden](#accelerationbroyden-1) `0..1`


#### max-time

Defined the end of the simulation as total time.

**Example:**  
```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



#### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  
```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



#### time-window-size

Defines the size of the time window.

**Example:**  
```xml
<time-window-size value="-1" valid-digits="10" method="fixed"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |
| valid-digits | integer | Precision to use when checking for end of time windows used this many digits. \\(\phi = 10^{-validDigits}\\) | `10` | none |
| method | string | The method used to determine the time window size. Use `fixed` to fix the time window size for the participants. | `fixed` | `fixed` |



#### participants

Defines the participants of the coupling scheme.

**Example:**  
```xml
<participants first="{string}" second="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| first | string | First participant to run the solver. | _none_ | none |
| second | string | Second participant to run the solver. | _none_ | none |



#### exchange

Defines the flow of data between meshes of participants.

**Example:**  
```xml
<exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initializeData? | `0` | none |



#### acceleration:constant

Accelerates coupling data with constant underrelaxation.

**Example:**  
```xml
<acceleration:constant>
  <relaxation value="{float}"/>
</acceleration:constant>
```

**Valid Subtags:**

* [relaxation](#relaxation-1) `1`


##### relaxation



**Example:**  
```xml
<relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Constant relaxation factor. | _none_ | none |





#### acceleration:aitken

Accelerates coupling data with dynamic Aitken under-relaxation.

**Example:**  
```xml
<acceleration:aitken>
  <initial-relaxation value="{float}"/>
  <data mesh="{string}" name="{string}"/>
</acceleration:aitken>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [data](#data-1) `1..*`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |





#### acceleration:IQN-ILS

Accelerates coupling data with the interface quasi-Newton inverse least-squares method.

**Example:**  
```xml
<acceleration:IQN-ILS>
  <initial-relaxation value="{float}" enforce="0"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
  <filter limit="1e-16" type="{string}"/>
  <preconditioner freeze-after="-1" type="{string}"/>
</acceleration:IQN-ILS>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [max-used-iterations](#max-used-iterations-1) `1`
* [time-windows-reused](#time-windows-reused-1) `1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `0` | none |



##### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian.

**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian.

**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of time windows. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |



##### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:
 - `QR1-filter`: updateQR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
 - `QR1_absolute-filter`: updateQR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
 - `QR2-filter`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  
```xml
<filter limit="1e-16" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | _none_ | `QR1`, `QR1-absolute`, `QR2` |



##### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.  A value preconditioner scales every acceleration data by the norm of the data in the previous time window. A residual preconditioner scales every acceleration data by the current residual. A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

**Example:**  
```xml
<preconditioner freeze-after="-1" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |





#### acceleration:IQN-IMVJ

Accelerates coupling data with the interface quasi-Newton inverse multi-vector Jacobian method.

**Example:**  
```xml
<acceleration:IQN-IMVJ always-build-jacobian="0">
  <initial-relaxation value="{float}" enforce="0"/>
  <imvj-restart-mode truncation-threshold="0.0001" chunk-size="8" reused-time-windows-at-restart="8" type="RS-SVD"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
  <filter limit="1e-16" type="{string}"/>
  <preconditioner freeze-after="-1" type="{string}"/>
</acceleration:IQN-IMVJ>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| always-build-jacobian | boolean | If set to true, the IMVJ will set up the Jacobian matrix in each coupling iteration, which is inefficient. If set to false (or not set) the Jacobian is only build in the last iteration and the updates are computed using (relatively) cheap MATVEC products. | `0` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [imvj-restart-mode](#imvj-restart-mode-1) `0..1`
* [max-used-iterations](#max-used-iterations-1) `1`
* [time-windows-reused](#time-windows-reused-1) `1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `0` | none |



##### imvj-restart-mode

Type of IMVJ restart mode that is used:
- `no-restart`: IMVJ runs in normal mode with explicit representation of Jacobian
- `RS-ZERO`:    IMVJ runs in restart mode. After M time windows all Jacobain information is dropped, restart with no information
- `RS-LS`:      IMVJ runs in restart mode. After M time windows a IQN-LS like approximation for the initial guess of the Jacobian is computed.
- `RS-SVD`:     IMVJ runs in restart mode. After M time windows a truncated SVD of the Jacobian is updated.
- `RS-SLIDE`:   IMVJ runs in sliding window restart mode.


**Example:**  
```xml
<imvj-restart-mode truncation-threshold="0.0001" chunk-size="8" reused-time-windows-at-restart="8" type="RS-SVD"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| truncation-threshold | float | If IMVJ restart-mode=RS-SVD, the truncation threshold for the updated SVD can be set. | `0.0001` | none |
| chunk-size | integer | Specifies the number of time windows M after which the IMVJ restarts, if run in restart-mode. Default value is M=8. | `8` | none |
| reused-time-windows-at-restart | integer | If IMVJ restart-mode=RS-LS, the number of reused time windows at restart can be specified. | `8` | none |
| type | string | Type of the restart mode. | `RS-SVD` | `no-restart`, `RS-0`, `RS-LS`, `RS-SVD`, `RS-SLIDE` |



##### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian.

**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian.

**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |



##### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:
 - `QR1-filter`: updateQR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
 - `QR1_absolute-filter`: updateQR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
 - `QR2-filter`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  
```xml
<filter limit="1e-16" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | _none_ | `QR1`, `QR1-absolute`, `QR2` |



##### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.
- A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.


**Example:**  
```xml
<preconditioner freeze-after="-1" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |
| type | string | Type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |





#### acceleration:broyden

Accelerates coupling data with the (single-vector) Broyden method.

**Example:**  
```xml
<acceleration:broyden>
  <initial-relaxation value="{float}" enforce="0"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
</acceleration:broyden>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [max-used-iterations](#max-used-iterations-1) `1`
* [time-windows-reused](#time-windows-reused-1) `1`
* [data](#data-1) `1..*`


##### initial-relaxation



**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float |  | _none_ | none |
| enforce | boolean |  | `0` | none |



##### max-used-iterations



**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer |  | _none_ | none |



##### time-windows-reused



**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer |  | _none_ | none |



##### data



**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string |  | _none_ | none |
| name | string |  | _none_ | none |





#### absolute-convergence-measure

Absolute convergence criterion based on the two-norm difference of data values between iterations.
\$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{limit}\$$

**Example:**  
```xml
<absolute-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### relative-convergence-measure

Relative convergence criterion based on the relative two-norm difference of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{limit} \$$

**Example:**  
```xml
<relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \\((0, 1]\\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### residual-relative-convergence-measure

Residual relative convergence criterion based on the relative two-norm differences of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^{k-1}) - x^{k-1} \right\rVert_2} < \text{limit}\$$

**Example:**  
```xml
<residual-relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### min-iteration-convergence-measure

Convergence criterion used to ensure a miminimal amount of iterations. Specifying a mesh and data is required for technical reasons and does not influence the measure.

**Example:**  
```xml
<min-iteration-convergence-measure min-iterations="{integer}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| min-iterations | integer | The minimal amount of iterations. | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### max-iterations

Allows to specify a maximum amount of iterations per time window.

**Example:**  
```xml
<max-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum value of iterations. | _none_ | none |



#### extrapolation-order

Sets order of predictor of interface values for first participant.

**Example:**  
```xml
<extrapolation-order value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The extrapolation order to use. | _none_ | none |





### coupling-scheme:multi

Multi coupling scheme according to block Jacobi iterations. Improved implicit iterations are achieved by using a acceleration (recommended!).

**Example:**  
```xml
<coupling-scheme:multi>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1" valid-digits="10" method="fixed"/>
  <participant name="{string}" control="0"/>
  <exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
  <acceleration:constant>
    ...
  </acceleration:constant>
  <absolute-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <residual-relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <min-iteration-convergence-measure min-iterations="{integer}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
  <max-iterations value="{integer}"/>
  <extrapolation-order value="{integer}"/>
</coupling-scheme:multi>
```

**Valid Subtags:**

* [max-time](#max-time-1) `0..1`
* [max-time-windows](#max-time-windows-1) `0..1`
* [time-window-size](#time-window-size-1) `1`
* [participant](#participant-1) `1..*`
* [exchange](#exchange-1) `1..*`
* [absolute-convergence-measure](#absolute-convergence-measure-1) `0..*`
* [relative-convergence-measure](#relative-convergence-measure-1) `0..*`
* [residual-relative-convergence-measure](#residual-relative-convergence-measure-1) `0..*`
* [min-iteration-convergence-measure](#min-iteration-convergence-measure-1) `0..*`
* [max-iterations](#max-iterations-1) `1`
* [extrapolation-order](#extrapolation-order-1) `0..1`
* acceleration
  * [constant](#accelerationconstant-1) `0..1`
  * [aitken](#accelerationaitken-1) `0..1`
  * [IQN-ILS](#accelerationiqn-ils-1) `0..1`
  * [IQN-IMVJ](#accelerationiqn-imvj-1) `0..1`
  * [broyden](#accelerationbroyden-1) `0..1`


#### max-time

Defined the end of the simulation as total time.

**Example:**  
```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



#### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  
```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



#### time-window-size

Defines the size of the time window.

**Example:**  
```xml
<time-window-size value="-1" valid-digits="10" method="fixed"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |
| valid-digits | integer | Precision to use when checking for end of time windows used this many digits. \\(\phi = 10^{-validDigits}\\) | `10` | none |
| method | string | The method used to determine the time window size. Use `fixed` to fix the time window size for the participants. | `fixed` | `fixed` |



#### participant



**Example:**  
```xml
<participant name="{string}" control="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the participant. | _none_ | none |
| control | boolean | Does this participant control the coupling? | `0` | none |



#### exchange

Defines the flow of data between meshes of participants.

**Example:**  
```xml
<exchange data="{string}" from="{string}" mesh="{string}" to="{string}" initialize="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initializeData? | `0` | none |



#### acceleration:constant

Accelerates coupling data with constant underrelaxation.

**Example:**  
```xml
<acceleration:constant>
  <relaxation value="{float}"/>
</acceleration:constant>
```

**Valid Subtags:**

* [relaxation](#relaxation-1) `1`


##### relaxation



**Example:**  
```xml
<relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Constant relaxation factor. | _none_ | none |





#### acceleration:aitken

Accelerates coupling data with dynamic Aitken under-relaxation.

**Example:**  
```xml
<acceleration:aitken>
  <initial-relaxation value="{float}"/>
  <data mesh="{string}" name="{string}"/>
</acceleration:aitken>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [data](#data-1) `1..*`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |





#### acceleration:IQN-ILS

Accelerates coupling data with the interface quasi-Newton inverse least-squares method.

**Example:**  
```xml
<acceleration:IQN-ILS>
  <initial-relaxation value="{float}" enforce="0"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
  <filter limit="1e-16" type="{string}"/>
  <preconditioner freeze-after="-1" type="{string}"/>
</acceleration:IQN-ILS>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [max-used-iterations](#max-used-iterations-1) `1`
* [time-windows-reused](#time-windows-reused-1) `1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `0` | none |



##### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian.

**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian.

**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of time windows. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |



##### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:
 - `QR1-filter`: updateQR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
 - `QR1_absolute-filter`: updateQR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
 - `QR2-filter`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  
```xml
<filter limit="1e-16" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | _none_ | `QR1`, `QR1-absolute`, `QR2` |



##### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.  A value preconditioner scales every acceleration data by the norm of the data in the previous time window. A residual preconditioner scales every acceleration data by the current residual. A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

**Example:**  
```xml
<preconditioner freeze-after="-1" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |





#### acceleration:IQN-IMVJ

Accelerates coupling data with the interface quasi-Newton inverse multi-vector Jacobian method.

**Example:**  
```xml
<acceleration:IQN-IMVJ always-build-jacobian="0">
  <initial-relaxation value="{float}" enforce="0"/>
  <imvj-restart-mode truncation-threshold="0.0001" chunk-size="8" reused-time-windows-at-restart="8" type="RS-SVD"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
  <filter limit="1e-16" type="{string}"/>
  <preconditioner freeze-after="-1" type="{string}"/>
</acceleration:IQN-IMVJ>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| always-build-jacobian | boolean | If set to true, the IMVJ will set up the Jacobian matrix in each coupling iteration, which is inefficient. If set to false (or not set) the Jacobian is only build in the last iteration and the updates are computed using (relatively) cheap MATVEC products. | `0` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [imvj-restart-mode](#imvj-restart-mode-1) `0..1`
* [max-used-iterations](#max-used-iterations-1) `1`
* [time-windows-reused](#time-windows-reused-1) `1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


##### initial-relaxation

Initial relaxation factor.

**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `0` | none |



##### imvj-restart-mode

Type of IMVJ restart mode that is used:
- `no-restart`: IMVJ runs in normal mode with explicit representation of Jacobian
- `RS-ZERO`:    IMVJ runs in restart mode. After M time windows all Jacobain information is dropped, restart with no information
- `RS-LS`:      IMVJ runs in restart mode. After M time windows a IQN-LS like approximation for the initial guess of the Jacobian is computed.
- `RS-SVD`:     IMVJ runs in restart mode. After M time windows a truncated SVD of the Jacobian is updated.
- `RS-SLIDE`:   IMVJ runs in sliding window restart mode.


**Example:**  
```xml
<imvj-restart-mode truncation-threshold="0.0001" chunk-size="8" reused-time-windows-at-restart="8" type="RS-SVD"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| truncation-threshold | float | If IMVJ restart-mode=RS-SVD, the truncation threshold for the updated SVD can be set. | `0.0001` | none |
| chunk-size | integer | Specifies the number of time windows M after which the IMVJ restarts, if run in restart-mode. Default value is M=8. | `8` | none |
| reused-time-windows-at-restart | integer | If IMVJ restart-mode=RS-LS, the number of reused time windows at restart can be specified. | `8` | none |
| type | string | Type of the restart mode. | `RS-SVD` | `no-restart`, `RS-0`, `RS-LS`, `RS-SVD`, `RS-SLIDE` |



##### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian.

**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian.

**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



##### data

The data used to compute the acceleration.

**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |
| name | string | The name of the data. | _none_ | none |



##### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:
 - `QR1-filter`: updateQR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
 - `QR1_absolute-filter`: updateQR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
 - `QR2-filter`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  
```xml
<filter limit="1e-16" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | _none_ | `QR1`, `QR1-absolute`, `QR2` |



##### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.
- A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.


**Example:**  
```xml
<preconditioner freeze-after="-1" type="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |
| type | string | Type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |





#### acceleration:broyden

Accelerates coupling data with the (single-vector) Broyden method.

**Example:**  
```xml
<acceleration:broyden>
  <initial-relaxation value="{float}" enforce="0"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" mesh="{string}" name="{string}"/>
</acceleration:broyden>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `1`
* [max-used-iterations](#max-used-iterations-1) `1`
* [time-windows-reused](#time-windows-reused-1) `1`
* [data](#data-1) `1..*`


##### initial-relaxation



**Example:**  
```xml
<initial-relaxation value="{float}" enforce="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float |  | _none_ | none |
| enforce | boolean |  | `0` | none |



##### max-used-iterations



**Example:**  
```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer |  | _none_ | none |



##### time-windows-reused



**Example:**  
```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer |  | _none_ | none |



##### data



**Example:**  
```xml
<data scaling="1" mesh="{string}" name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, data values can be manually scaled. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| mesh | string |  | _none_ | none |
| name | string |  | _none_ | none |





#### absolute-convergence-measure

Absolute convergence criterion based on the two-norm difference of data values between iterations.
\$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{limit}\$$

**Example:**  
```xml
<absolute-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### relative-convergence-measure

Relative convergence criterion based on the relative two-norm difference of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{limit} \$$

**Example:**  
```xml
<relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \\((0, 1]\\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### residual-relative-convergence-measure

Residual relative convergence criterion based on the relative two-norm differences of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^{k-1}) - x^{k-1} \right\rVert_2} < \text{limit}\$$

**Example:**  
```xml
<residual-relative-convergence-measure limit="{float}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### min-iteration-convergence-measure

Convergence criterion used to ensure a miminimal amount of iterations. Specifying a mesh and data is required for technical reasons and does not influence the measure.

**Example:**  
```xml
<min-iteration-convergence-measure min-iterations="{integer}" data="{string}" mesh="{string}" strict="0" suffices="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| min-iterations | integer | The minimal amount of iterations. | _none_ | none |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `0` | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `0` | none |



#### max-iterations

Allows to specify a maximum amount of iterations per time window.

**Example:**  
```xml
<max-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum value of iterations. | _none_ | none |



#### extrapolation-order

Sets order of predictor of interface values for first participant.

**Example:**  
```xml
<extrapolation-order value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The extrapolation order to use. | _none_ | none |








