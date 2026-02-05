<!-- generated with preCICE 3.3.1 -->
# precice-configuration

Main tag containing preCICE configuration.

**Example:**  

```xml
<precice-configuration experimental="false" allow-remeshing="false" wait-in-finalize="false">
  <log enabled="true">
    ...
  </log>
  <profiling mode="fundamental" flush-every="50" directory="." synchronize="false"/>
  <data:scalar name="{string}" waveform-degree="1"/>
  <mesh name="{string}" dimensions="{integer}">
    ...
  </mesh>
  <m2n:sockets port="0" network="lo" exchange-directory="." acceptor="{string}" connector="{string}" enforce-gather-scatter="false" use-two-level-initialization="false"/>
  <participant name="{string}">
    ...
  </participant>
  <coupling-scheme:serial-explicit>
    ...
  </coupling-scheme:serial-explicit>
</precice-configuration>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| experimental | boolean | Enable experimental features. | `false` | none |
| allow-remeshing | boolean | Enable experimental remeshing feature, requires experimental to be true. | `false` | none |
| wait-in-finalize | boolean | Connected participants wait for each other in finalize, which can be helpful in SLURM sessions. | `false` | none |

**Valid Subtags:**

* [log](#log) `0..1`
* [profiling](#profiling) `0..1`
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


## log

Configures logging sinks based on Boost log.

**Example:**  

```xml
<log enabled="true">
  <sink type="stream" output="stdout" format="(%Rank%) %TimeStamp(format="%H:%M:%S")% [%Module%]:%Line% in %Function%: %ColorizedSeverity%%Message%" filter="(%Severity% > debug) and not ((%Severity% = info) and (%Rank% != 0))" enabled="true"/>
</log>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| enabled | boolean | Enables the creation of log sinks. Disable sinks if you prefer to handle preCICE logs in your application using boost.log. | `true` | none |

**Valid Subtags:**

* [sink](#sink) `0..*`


### sink

Contains the configuration of a single log sink, which allows fine grained control of what to log where. Available attributes in filter and format strings are `%TimeStamp%`, `%Runtime%`, `%Severity%`, `%ColorizedSeverity%`, `%File%`, `%Line%`, `%Function%`, `%Module%`, `%Rank%`, and `%Participant%`. The boolean attribute `%preCICE%` is `true` for all log entries originating from preCICE.

**Example:**  

```xml
<sink type="stream" output="stdout" format="(%Rank%) %TimeStamp(format="%H:%M:%S")% [%Module%]:%Line% in %Function%: %ColorizedSeverity%%Message%" filter="(%Severity% > debug) and not ((%Severity% = info) and (%Rank% != 0))" enabled="true"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | The type of sink. | `stream` | `stream`, `file` |
| output | string | Depends on the type of the sink. For streams, this can be stdout or stderr. For files, this is the filename. | `stdout` | none |
| format | string | Boost Log Format String | `(%Rank%) %TimeStamp(format="%H:%M:%S")% [%Module%]:%Line% in %Function%: %ColorizedSeverity%%Message%` | none |
| filter | string | Boost Log Filter String | `(%Severity% > debug) and not ((%Severity% = info) and (%Rank% != 0))` | none |
| enabled | boolean | Enables the sink | `true` | none |





## profiling

Allows configuring the profiling functionality of preCICE.

**Example:**  

```xml
<profiling mode="fundamental" flush-every="50" directory="." synchronize="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| mode | string | Operational modes of the profiling. "fundamental" will only write fundamental steering events. "api" will write events of the complete API. "all" writes all events. | `fundamental` | `all`, `api`, `fundamental`, `off` |
| flush-every | integer | Set the amount of event records that should be kept in memory before flushing them to file. One event consists out of multiple records. 0 keeps all records in memory and writes them at the end of the program, useful for slower network filesystems. 1 writes records directly to the file, useful to get profiling data despite program crashes. Settings greater than 1 keep records in memory and write them to file in blocks, which is recommended. | `50` | none |
| directory | string | Directory to use as a root directory to  write the events to. Events will be written to `<directory>/precice-profiling/` | `.` | none |
| synchronize | boolean | Enables additional inter- and intra-participant synchronization points. This avoids measuring blocking time for communication and other collective operations. | `false` | none |



## data:scalar

Defines a scalar data set to be assigned to meshes.

**Example:**  

```xml
<data:scalar name="{string}" waveform-degree="1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Unique name for the data set. | _none_ | none |
| waveform-degree | integer | Polynomial degree of waveform that is used for time interpolation. | `1` | none |



## data:vector

Defines a vector data set to be assigned to meshes. The number of components of each data entry depends on the spatial dimensions of the mesh.

**Example:**  

```xml
<data:vector name="{string}" waveform-degree="1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Unique name for the data set. | _none_ | none |
| waveform-degree | integer | Polynomial degree of waveform that is used for time interpolation. | `1` | none |



## mesh

Surface mesh consisting of vertices and optional connectivity information. The vertices of a mesh can carry data, configured by tags <use-data>. The mesh coordinates have to be defined by a participant (see tag <provide-mesh>).

**Example:**  

```xml
<mesh name="{string}" dimensions="{integer}">
  <use-data name="{string}"/>
</mesh>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Unique name for the mesh. | _none_ | none |
| dimensions | integer | Spatial dimensions of mesh | _none_ | `2`, `3` |

**Valid Subtags:**

* [use-data](#use-data) `0..*`


### use-data

Assigns a before defined data set (see tag <data>) to the mesh.

**Example:**  

```xml
<use-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data set. | _none_ | none |





## m2n:sockets

Communication via Sockets.

**Example:**  

```xml
<m2n:sockets port="0" network="lo" exchange-directory="." acceptor="{string}" connector="{string}" enforce-gather-scatter="false" use-two-level-initialization="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| port | integer | Port number (16-bit unsigned integer) to be used for socket communication. The default is "0", what means that the OS will dynamically search for a free port (if at least one exists) and bind it automatically. | `0` | none |
| network | string | Interface name to be used for socket communication. Default is the canonical name of the loopback interface of your platform. Might be different on supercomputing systems, e.g. "ib0" for the InfiniBand on SuperMUC.  | `lo` | none |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen, and both solvers have to be started in the same directory. | `.` | none |
| acceptor | string | First participant name involved in communication. For performance reasons, we recommend to use the participant with less ranks at the coupling interface as "acceptor" in the m2n communication. | _none_ | none |
| connector | string | Second participant name involved in communication. | _none_ | none |
| enforce-gather-scatter | boolean | Enforce the distributed communication to a gather-scatter scheme. Only recommended for trouble shooting. | `false` | none |
| use-two-level-initialization | boolean | Use a two-level initialization scheme. Recommended for large parallel runs (>5000 MPI ranks). | `false` | none |



## m2n:mpi-multiple-ports

Communication via MPI with startup in separated communication spaces, using multiple communicators.

**Example:**  

```xml
<m2n:mpi-multiple-ports exchange-directory="." acceptor="{string}" connector="{string}" enforce-gather-scatter="false" use-two-level-initialization="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen, and both solvers have to be started in the same directory. | `.` | none |
| acceptor | string | First participant name involved in communication. For performance reasons, we recommend to use the participant with less ranks at the coupling interface as "acceptor" in the m2n communication. | _none_ | none |
| connector | string | Second participant name involved in communication. | _none_ | none |
| enforce-gather-scatter | boolean | Enforce the distributed communication to a gather-scatter scheme. Only recommended for trouble shooting. | `false` | none |
| use-two-level-initialization | boolean | Use a two-level initialization scheme. Recommended for large parallel runs (>5000 MPI ranks). | `false` | none |



## m2n:mpi

Communication via MPI with startup in separated communication spaces, using a single communicator

**Example:**  

```xml
<m2n:mpi exchange-directory="." acceptor="{string}" connector="{string}" enforce-gather-scatter="false" use-two-level-initialization="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen, and both solvers have to be started in the same directory. | `.` | none |
| acceptor | string | First participant name involved in communication. For performance reasons, we recommend to use the participant with less ranks at the coupling interface as "acceptor" in the m2n communication. | _none_ | none |
| connector | string | Second participant name involved in communication. | _none_ | none |
| enforce-gather-scatter | boolean | Enforce the distributed communication to a gather-scatter scheme. Only recommended for trouble shooting. | `false` | none |
| use-two-level-initialization | boolean | Use a two-level initialization scheme. Recommended for large parallel runs (>5000 MPI ranks). | `false` | none |



## participant

Represents one solver using preCICE. At least two participants have to be defined.

**Example:**  

```xml
<participant name="{string}">
  <write-data name="{string}" mesh="{string}"/>
  <read-data name="{string}" mesh="{string}"/>
  <mapping:nearest-neighbor from="" to="" direction="{string}" constraint="{string}"/>
  <action:multiply-by-area timing="{string}" mesh="{string}">
    ...
  </action:multiply-by-area>
  <export:vtk directory="." every-n-time-windows="1" every-iteration="false" update-series="false"/>
  <watch-point name="{string}" mesh="{string}" coordinate="{vector}"/>
  <watch-integral name="{string}" mesh="{string}" scale-with-connectivity="{boolean}"/>
  <provide-mesh name="{string}"/>
  <receive-mesh name="{string}" api-access="false" direct-access="false" geometric-filter="on-secondary-ranks" from="{string}" safety-factor="0.5"/>
  <intra-comm:sockets port="0" network="lo" exchange-directory="."/>
</participant>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the participant. Has to match the name given on construction of the precice::Participant object used by the participant. | _none_ | none |

**Valid Subtags:**

* [write-data](#write-data) `0..*`
* [read-data](#read-data) `0..*`
* [watch-point](#watch-point) `0..*`
* [watch-integral](#watch-integral) `0..*`
* [provide-mesh](#provide-mesh) `0..*`
* [receive-mesh](#receive-mesh) `0..*`
* action
  * [multiply-by-area](#actionmultiply-by-area) `0..*`
  * [divide-by-area](#actiondivide-by-area) `0..*`
  * [summation](#actionsummation) `0..*`
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
* mapping
  * [nearest-neighbor](#mappingnearest-neighbor) `0..*`
  * [nearest-projection](#mappingnearest-projection) `0..*`
  * [nearest-neighbor-gradient](#mappingnearest-neighbor-gradient) `0..*`
  * [linear-cell-interpolation](#mappinglinear-cell-interpolation) `0..*`
  * [rbf-global-iterative](#mappingrbf-global-iterative) `0..*`
  * [rbf-global-direct](#mappingrbf-global-direct) `0..*`
  * [rbf-pum-direct](#mappingrbf-pum-direct) `0..*`
  * [rbf](#mappingrbf) `0..*`
  * [axial-geometric-multiscale](#mappingaxial-geometric-multiscale) `0..*`
  * [radial-geometric-multiscale](#mappingradial-geometric-multiscale) `0..*`


### write-data

Sets data to be written by the participant to preCICE. Data is defined by using the <data> tag.

**Example:**  

```xml
<write-data name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |
| mesh | string | Mesh the data belongs to. If data should be read/written to several meshes, this has to be specified separately for each mesh. | _none_ | none |



### read-data

Sets data to be read by the participant from preCICE. Data is defined by using the <data> tag.

**Example:**  

```xml
<read-data name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |
| mesh | string | Mesh the data belongs to. If data should be read/written to several meshes, this has to be specified separately for each mesh. | _none_ | none |



### mapping:nearest-neighbor

Nearest-neighbour mapping which uses a rstar-spacial index tree to index meshes and run nearest-neighbour queries.

**Example:**  

```xml
<mapping:nearest-neighbor from="" to="" direction="{string}" constraint="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |



### mapping:nearest-projection

Nearest-projection mapping which uses a rstar-spacial index tree to index meshes and locate the nearest projections.

**Example:**  

```xml
<mapping:nearest-projection from="" to="" direction="{string}" constraint="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |



### mapping:nearest-neighbor-gradient

Nearest-neighbor-gradient mapping which uses nearest-neighbor mapping with an additional linear approximation using gradient data.

**Example:**  

```xml
<mapping:nearest-neighbor-gradient from="" to="" direction="{string}" constraint="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |



### mapping:linear-cell-interpolation

Linear cell interpolation mapping which uses a rstar-spacial index tree to index meshes and locate the nearest cell. Only supports 2D meshes.

**Example:**  

```xml
<mapping:linear-cell-interpolation from="" to="" direction="{string}" constraint="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |



### mapping:rbf-global-iterative

Radial-basis-function mapping using an iterative solver with a distributed parallelism.

**Example:**  

```xml
<mapping:rbf-global-iterative from="" to="" direction="{string}" constraint="{string}" polynomial="separate" x-dead="false" y-dead="false" z-dead="false" solver-rtol="1e-09">
  <executor:cpu/>
  <basis-function:compact-polynomial-c0 support-radius="{float}"/>
</mapping:rbf-global-iterative>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `false` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `false` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `false` | none |
| solver-rtol | float | Solver relative tolerance for convergence | `1e-09` | none |

**Valid Subtags:**

* basis-function
  * [compact-polynomial-c0](#basis-functioncompact-polynomial-c0) `0..1`
  * [compact-polynomial-c2](#basis-functioncompact-polynomial-c2) `0..1`
  * [compact-polynomial-c4](#basis-functioncompact-polynomial-c4) `0..1`
  * [compact-polynomial-c6](#basis-functioncompact-polynomial-c6) `0..1`
  * [compact-polynomial-c8](#basis-functioncompact-polynomial-c8) `0..1`
  * [compact-tps-c2](#basis-functioncompact-tps-c2) `0..1`
  * [multiquadrics](#basis-functionmultiquadrics) `0..1`
  * [inverse-multiquadrics](#basis-functioninverse-multiquadrics) `0..1`
  * [gaussian](#basis-functiongaussian) `0..1`
  * [thin-plate-splines](#basis-functionthin-plate-splines) `0..1`
  * [volume-splines](#basis-functionvolume-splines) `0..1`
* executor
  * [cpu](#executorcpu) `0..1`
  * [cuda](#executorcuda) `0..1`
  * [hip](#executorhip) `0..1`
  * [openmp](#executoropenmp) `0..1`


#### executor:cpu

The default executor relying on PETSc, which uses CPUs and distributed memory parallelism via MPI.

**Example:**  

```xml
<executor:cpu/>
```



#### executor:cuda

Cuda (Nvidia) executor, which uses Ginkgo with a gather-scatter parallelism.

**Example:**  

```xml
<executor:cuda gpu-device-id="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| gpu-device-id | integer | Specifies the ID of the GPU that should be used for the Ginkgo GPU backend. | `0` | none |



#### executor:hip

Hip (AMD/Nvidia) executor, which uses hipSolver with a gather-scatter parallelism.

**Example:**  

```xml
<executor:hip gpu-device-id="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| gpu-device-id | integer | Specifies the ID of the GPU that should be used for the Ginkgo GPU backend. | `0` | none |



#### executor:openmp

OpenMP executor, which uses Ginkgo with a gather-scatter parallelism.

**Example:**  

```xml
<executor:openmp n-threads="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| n-threads | integer | Specifies the number of threads for the OpenMP executor that should be used for the Ginkgo OpenMP backend. If a value of "0" is set, preCICE doesn't set the number of threads and the default behavior of OpenMP applies. | `0` | none |



#### basis-function:compact-polynomial-c0

Wendland C0 function

**Example:**  

```xml
<basis-function:compact-polynomial-c0 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c2

Wendland C2 function

**Example:**  

```xml
<basis-function:compact-polynomial-c2 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c4

Wendland C4 function

**Example:**  

```xml
<basis-function:compact-polynomial-c4 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c6

Wendland C6 function

**Example:**  

```xml
<basis-function:compact-polynomial-c6 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c8

Wendland C8 function

**Example:**  

```xml
<basis-function:compact-polynomial-c8 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-tps-c2

Compact thin-plate-spline C2

**Example:**  

```xml
<basis-function:compact-tps-c2 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:multiquadrics

Multiquadrics

**Example:**  

```xml
<basis-function:multiquadrics shape-parameter="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |



#### basis-function:inverse-multiquadrics

Inverse multiquadrics

**Example:**  

```xml
<basis-function:inverse-multiquadrics shape-parameter="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |



#### basis-function:gaussian

Gaussian basis function accepting a support radius or a shape parameter.

**Example:**  

```xml
<basis-function:gaussian shape-parameter="nan" support-radius="nan"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | `nan` | none |
| support-radius | float | Support radius of each RBF basis function (global choice). | `nan` | none |



#### basis-function:thin-plate-splines

Thin-plate-splines

**Example:**  

```xml
<basis-function:thin-plate-splines/>
```



#### basis-function:volume-splines

Volume splines

**Example:**  

```xml
<basis-function:volume-splines/>
```





### mapping:rbf-global-direct

Radial-basis-function mapping using a direct solver with a gather-scatter parallelism.

**Example:**  

```xml
<mapping:rbf-global-direct from="" to="" direction="{string}" constraint="{string}" polynomial="separate" x-dead="false" y-dead="false" z-dead="false">
  <executor:cpu/>
  <basis-function:compact-polynomial-c0 support-radius="{float}"/>
</mapping:rbf-global-direct>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |
| polynomial | string | Toggles use of the global polynomial | `separate` | `on`, `off`, `separate` |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `false` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `false` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `false` | none |

**Valid Subtags:**

* basis-function
  * [compact-polynomial-c0](#basis-functioncompact-polynomial-c0-1) `0..1`
  * [compact-polynomial-c2](#basis-functioncompact-polynomial-c2-1) `0..1`
  * [compact-polynomial-c4](#basis-functioncompact-polynomial-c4-1) `0..1`
  * [compact-polynomial-c6](#basis-functioncompact-polynomial-c6-1) `0..1`
  * [compact-polynomial-c8](#basis-functioncompact-polynomial-c8-1) `0..1`
  * [compact-tps-c2](#basis-functioncompact-tps-c2-1) `0..1`
  * [multiquadrics](#basis-functionmultiquadrics-1) `0..1`
  * [inverse-multiquadrics](#basis-functioninverse-multiquadrics-1) `0..1`
  * [gaussian](#basis-functiongaussian-1) `0..1`
  * [thin-plate-splines](#basis-functionthin-plate-splines-1) `0..1`
  * [volume-splines](#basis-functionvolume-splines-1) `0..1`
* executor
  * [cpu](#executorcpu-1) `0..1`
  * [cuda](#executorcuda-1) `0..1`
  * [hip](#executorhip-1) `0..1`


#### executor:cpu

The default executor, which uses a single-core CPU with a gather-scatter parallelism.

**Example:**  

```xml
<executor:cpu/>
```



#### executor:cuda

Cuda (Nvidia) executor, which uses cuSolver/Ginkgo and a direct QR decomposition with a gather-scatter parallelism.

**Example:**  

```xml
<executor:cuda gpu-device-id="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| gpu-device-id | integer | Specifies the ID of the GPU that should be used for the Ginkgo GPU backend. | `0` | none |



#### executor:hip

Hip (AMD/Nvidia) executor, which uses hipSolver/Ginkgo and a direct QR decomposition with a gather-scatter parallelism.

**Example:**  

```xml
<executor:hip gpu-device-id="0"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| gpu-device-id | integer | Specifies the ID of the GPU that should be used for the Ginkgo GPU backend. | `0` | none |



#### basis-function:compact-polynomial-c0

Wendland C0 function

**Example:**  

```xml
<basis-function:compact-polynomial-c0 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c2

Wendland C2 function

**Example:**  

```xml
<basis-function:compact-polynomial-c2 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c4

Wendland C4 function

**Example:**  

```xml
<basis-function:compact-polynomial-c4 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c6

Wendland C6 function

**Example:**  

```xml
<basis-function:compact-polynomial-c6 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c8

Wendland C8 function

**Example:**  

```xml
<basis-function:compact-polynomial-c8 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-tps-c2

Compact thin-plate-spline C2

**Example:**  

```xml
<basis-function:compact-tps-c2 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:multiquadrics

Multiquadrics

**Example:**  

```xml
<basis-function:multiquadrics shape-parameter="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |



#### basis-function:inverse-multiquadrics

Inverse multiquadrics

**Example:**  

```xml
<basis-function:inverse-multiquadrics shape-parameter="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |



#### basis-function:gaussian

Gaussian basis function accepting a support radius or a shape parameter.

**Example:**  

```xml
<basis-function:gaussian shape-parameter="nan" support-radius="nan"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | `nan` | none |
| support-radius | float | Support radius of each RBF basis function (global choice). | `nan` | none |



#### basis-function:thin-plate-splines

Thin-plate-splines

**Example:**  

```xml
<basis-function:thin-plate-splines/>
```



#### basis-function:volume-splines

Volume splines

**Example:**  

```xml
<basis-function:volume-splines/>
```





### mapping:rbf-pum-direct

Radial-basis-function mapping using a partition of unity method, which supports a distributed parallelism.

**Example:**  

```xml
<mapping:rbf-pum-direct from="" to="" direction="{string}" constraint="{string}" polynomial="separate" vertices-per-cluster="50" relative-overlap="0.15" project-to-input="true">
  <executor:cpu/>
  <basis-function:compact-polynomial-c0 support-radius="{float}"/>
</mapping:rbf-pum-direct>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |
| polynomial | string | Toggles use a local (per cluster) polynomial | `separate` | `off`, `separate` |
| vertices-per-cluster | integer | Average number of vertices per cluster (partition) applied in the rbf partition of unity method. | `50` | none |
| relative-overlap | float | Value between 0 and 1 indicating the relative overlap between clusters. A value of 0.15 is usually a good trade-off between accuracy and efficiency. | `0.15` | none |
| project-to-input | boolean | If enabled, places the cluster centers at the closest vertex of the input mesh. Should be enabled in case of non-uniform point distributions such as for shell structures. | `true` | none |

**Valid Subtags:**

* basis-function
  * [compact-polynomial-c0](#basis-functioncompact-polynomial-c0-1) `0..1`
  * [compact-polynomial-c2](#basis-functioncompact-polynomial-c2-1) `0..1`
  * [compact-polynomial-c4](#basis-functioncompact-polynomial-c4-1) `0..1`
  * [compact-polynomial-c6](#basis-functioncompact-polynomial-c6-1) `0..1`
  * [compact-polynomial-c8](#basis-functioncompact-polynomial-c8-1) `0..1`
  * [compact-tps-c2](#basis-functioncompact-tps-c2-1) `0..1`
  * [multiquadrics](#basis-functionmultiquadrics-1) `0..1`
  * [inverse-multiquadrics](#basis-functioninverse-multiquadrics-1) `0..1`
  * [gaussian](#basis-functiongaussian-1) `0..1`
  * [thin-plate-splines](#basis-functionthin-plate-splines-1) `0..1`
  * [volume-splines](#basis-functionvolume-splines-1) `0..1`
* executor
  * [cpu](#executorcpu-1) `0..1`


#### executor:cpu

The default (and currently only) executor using a CPU and a distributed memory parallelism via MPI.

**Example:**  

```xml
<executor:cpu/>
```



#### basis-function:compact-polynomial-c0

Wendland C0 function

**Example:**  

```xml
<basis-function:compact-polynomial-c0 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c2

Wendland C2 function

**Example:**  

```xml
<basis-function:compact-polynomial-c2 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c4

Wendland C4 function

**Example:**  

```xml
<basis-function:compact-polynomial-c4 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c6

Wendland C6 function

**Example:**  

```xml
<basis-function:compact-polynomial-c6 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c8

Wendland C8 function

**Example:**  

```xml
<basis-function:compact-polynomial-c8 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-tps-c2

Compact thin-plate-spline C2

**Example:**  

```xml
<basis-function:compact-tps-c2 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:multiquadrics

Multiquadrics

**Example:**  

```xml
<basis-function:multiquadrics shape-parameter="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |



#### basis-function:inverse-multiquadrics

Inverse multiquadrics

**Example:**  

```xml
<basis-function:inverse-multiquadrics shape-parameter="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |



#### basis-function:gaussian

Gaussian basis function accepting a support radius or a shape parameter.

**Example:**  

```xml
<basis-function:gaussian shape-parameter="nan" support-radius="nan"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | `nan` | none |
| support-radius | float | Support radius of each RBF basis function (global choice). | `nan` | none |



#### basis-function:thin-plate-splines

Thin-plate-splines

**Example:**  

```xml
<basis-function:thin-plate-splines/>
```



#### basis-function:volume-splines

Volume splines

**Example:**  

```xml
<basis-function:volume-splines/>
```





### mapping:rbf

Alias tag, which auto-selects a radial-basis-function mapping depending on the simulation parameter,

**Example:**  

```xml
<mapping:rbf from="" to="" direction="{string}" constraint="{string}" x-dead="false" y-dead="false" z-dead="false">
  <basis-function:compact-polynomial-c0 support-radius="{float}"/>
</mapping:rbf>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |
| x-dead | boolean | If set to true, the x axis will be ignored for the mapping | `false` | none |
| y-dead | boolean | If set to true, the y axis will be ignored for the mapping | `false` | none |
| z-dead | boolean | If set to true, the z axis will be ignored for the mapping | `false` | none |

**Valid Subtags:**

* basis-function
  * [compact-polynomial-c0](#basis-functioncompact-polynomial-c0-1) `0..1`
  * [compact-polynomial-c2](#basis-functioncompact-polynomial-c2-1) `0..1`
  * [compact-polynomial-c4](#basis-functioncompact-polynomial-c4-1) `0..1`
  * [compact-polynomial-c6](#basis-functioncompact-polynomial-c6-1) `0..1`
  * [compact-polynomial-c8](#basis-functioncompact-polynomial-c8-1) `0..1`
  * [compact-tps-c2](#basis-functioncompact-tps-c2-1) `0..1`
  * [multiquadrics](#basis-functionmultiquadrics-1) `0..1`
  * [inverse-multiquadrics](#basis-functioninverse-multiquadrics-1) `0..1`
  * [gaussian](#basis-functiongaussian-1) `0..1`
  * [thin-plate-splines](#basis-functionthin-plate-splines-1) `0..1`
  * [volume-splines](#basis-functionvolume-splines-1) `0..1`


#### basis-function:compact-polynomial-c0

Wendland C0 function

**Example:**  

```xml
<basis-function:compact-polynomial-c0 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c2

Wendland C2 function

**Example:**  

```xml
<basis-function:compact-polynomial-c2 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c4

Wendland C4 function

**Example:**  

```xml
<basis-function:compact-polynomial-c4 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c6

Wendland C6 function

**Example:**  

```xml
<basis-function:compact-polynomial-c6 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-polynomial-c8

Wendland C8 function

**Example:**  

```xml
<basis-function:compact-polynomial-c8 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:compact-tps-c2

Compact thin-plate-spline C2

**Example:**  

```xml
<basis-function:compact-tps-c2 support-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| support-radius | float | Support radius of each RBF basis function (global choice). | _none_ | none |



#### basis-function:multiquadrics

Multiquadrics

**Example:**  

```xml
<basis-function:multiquadrics shape-parameter="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |



#### basis-function:inverse-multiquadrics

Inverse multiquadrics

**Example:**  

```xml
<basis-function:inverse-multiquadrics shape-parameter="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | _none_ | none |



#### basis-function:gaussian

Gaussian basis function accepting a support radius or a shape parameter.

**Example:**  

```xml
<basis-function:gaussian shape-parameter="nan" support-radius="nan"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| shape-parameter | float | Specific shape parameter for RBF basis function. | `nan` | none |
| support-radius | float | Support radius of each RBF basis function (global choice). | `nan` | none |



#### basis-function:thin-plate-splines

Thin-plate-splines

**Example:**  

```xml
<basis-function:thin-plate-splines/>
```



#### basis-function:volume-splines

Volume splines

**Example:**  

```xml
<basis-function:volume-splines/>
```





### mapping:axial-geometric-multiscale

Axial geometric multiscale mapping between one 1D and multiple 3D vertices.

**Example:**  

```xml
<mapping:axial-geometric-multiscale from="" to="" direction="{string}" constraint="{string}" multiscale-type="{string}" multiscale-axis="{string}" multiscale-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |
| multiscale-type | string | Type of geometric multiscale mapping. Either 'spread' or 'collect'. | _none_ | `spread`, `collect` |
| multiscale-axis | string | Principle axis along which geometric multiscale mapping is performed. | _none_ | `x`, `y`, `z` |
| multiscale-radius | float | Radius of the circular interface between the 1D and 3D participant. | _none_ | none |



### mapping:radial-geometric-multiscale

Radial geometric multiscale mapping between multiple 1D and multiple 3D vertices, distributed along a principle axis.

**Example:**  

```xml
<mapping:radial-geometric-multiscale from="" to="" direction="{string}" constraint="{string}" multiscale-type="{string}" multiscale-axis="{string}" multiscale-radius="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| from | string | The mesh to map the data from. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| to | string | The mesh to map the data to. The default name is an empty mesh name, which is only valid for a just-in-time mapping (using the API functions "writeAndMapData" or "mapAndReadData"). | `` | none |
| direction | string | Write mappings map written data prior to communication, thus in the same participant who writes the data. Read mappings map received data after communication, thus in the same participant who reads the data. | _none_ | `write`, `read` |
| constraint | string | Use conservative to conserve the nodal sum of the data over the interface (needed e.g. for force mapping).  Use consistent for normalized quantities such as temperature or pressure. Use scaled-consistent-surface or scaled-consistent-volume for normalized quantities where conservation of integral values (surface or volume) is needed (e.g. velocities when the mass flow rate needs to be conserved). Mesh connectivity is required to use scaled-consistent. | _none_ | `conservative`, `consistent`, `scaled-consistent-surface`, `scaled-consistent-volume` |
| multiscale-type | string | Type of geometric multiscale mapping. Either 'spread' or 'collect'. | _none_ | `spread`, `collect` |
| multiscale-axis | string | Principle axis along which geometric multiscale mapping is performed. | _none_ | `x`, `y`, `z` |
| multiscale-radius | float | Radius of the circular interface between the 1D and 3D participant. | _none_ | none |



### action:multiply-by-area

Multiplies data values with mesh area associated to vertex holding the value.

**Example:**  

```xml
<action:multiply-by-area timing="{string}" mesh="{string}">
  <target-data name="{string}"/>
</action:multiply-by-area>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| timing | string | Determines when (relative to advancing the coupling scheme and the data mappings) the action is executed. | _none_ | `write-mapping-post`, `read-mapping-post` |
| mesh | string | Determines mesh used in action. | _none_ | none |

**Valid Subtags:**

* [target-data](#target-data) `1`


#### target-data

Data to read from and write to.

**Example:**  

```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





### action:divide-by-area

Divides data values by mesh area associated to vertex holding the value.

**Example:**  

```xml
<action:divide-by-area timing="{string}" mesh="{string}">
  <target-data name="{string}"/>
</action:divide-by-area>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| timing | string | Determines when (relative to advancing the coupling scheme and the data mappings) the action is executed. | _none_ | `write-mapping-post`, `read-mapping-post` |
| mesh | string | Determines mesh used in action. | _none_ | none |

**Valid Subtags:**

* [target-data](#target-data-1) `1`


#### target-data

Data to read from and write to.

**Example:**  

```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





### action:summation

Sums up multiple source data values and writes the result into target data.

**Example:**  

```xml
<action:summation timing="{string}" mesh="{string}">
  <source-data name="{string}"/>
  <target-data name="{string}"/>
</action:summation>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| timing | string | Determines when (relative to advancing the coupling scheme and the data mappings) the action is executed. | _none_ | `write-mapping-post`, `read-mapping-post` |
| mesh | string | Determines mesh used in action. | _none_ | none |

**Valid Subtags:**

* [source-data](#source-data) `1..*`
* [target-data](#target-data-1) `1`


#### source-data

Multiple data to read from.

**Example:**  

```xml
<source-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



#### target-data

Data to read from and write to.

**Example:**  

```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





### action:recorder

Records action invocations for testing purposes.

**Example:**  

```xml
<action:recorder timing="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| timing | string | Determines when (relative to advancing the coupling scheme and the data mappings) the action is executed. | _none_ | `write-mapping-post`, `read-mapping-post` |
| mesh | string | Determines mesh used in action. | _none_ | none |



### action:python

Calls Python script to execute action. See preCICE file "src/action/PythonAction.py" for an example.

**Example:**  

```xml
<action:python timing="{string}" mesh="{string}">
  <path name=""/>
  <module name="{string}"/>
  <source-data name="{string}"/>
  <target-data name="{string}"/>
</action:python>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| timing | string | Determines when (relative to advancing the coupling scheme and the data mappings) the action is executed. | _none_ | `write-mapping-post`, `read-mapping-post` |
| mesh | string | Determines mesh used in action. | _none_ | none |

**Valid Subtags:**

* [path](#path) `0..1`
* [module](#module) `1`
* [source-data](#source-data-1) `0..1`
* [target-data](#target-data-1) `0..1`


#### path

Directory path to Python module, i.e. script file. If it doesn't occur, the current path is used

**Example:**  

```xml
<path name=""/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | The path to the directory of the module. | `` | none |



#### module

Name of Python module, i.e. Python script file without file ending. The module name has to differ from existing (library) modules, otherwise, the existing module will be loaded instead of the user script.

**Example:**  

```xml
<module name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



#### source-data

Source data to be read is handed to the Python module. Can be omitted, if only a target data is needed.

**Example:**  

```xml
<source-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |



#### target-data

Target data to be read and written to is handed to the Python module. Can be omitted, if only source data is needed.

**Example:**  

```xml
<target-data name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the data. | _none_ | none |





### export:vtk

Exports meshes to VTK legacy format files. Parallel participants will use the VTU exporter instead.

**Example:**  

```xml
<export:vtk directory="." every-n-time-windows="1" every-iteration="false" update-series="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| directory | string | Directory to export the files to. | `.` | none |
| every-n-time-windows | integer | preCICE does an export every X time windows. Choose -1 for no exports. | `1` | none |
| every-iteration | boolean | Exports in every coupling (sub)iteration. For debug purposes. | `false` | none |
| update-series | boolean | Update the series file after every export instead of at the end of the simulation. | `false` | none |



### export:vtu

Exports meshes to VTU files in serial or PVTU files with VTU piece files in parallel.

**Example:**  

```xml
<export:vtu directory="." every-n-time-windows="1" every-iteration="false" update-series="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| directory | string | Directory to export the files to. | `.` | none |
| every-n-time-windows | integer | preCICE does an export every X time windows. Choose -1 for no exports. | `1` | none |
| every-iteration | boolean | Exports in every coupling (sub)iteration. For debug purposes. | `false` | none |
| update-series | boolean | Update the series file after every export instead of at the end of the simulation. | `false` | none |



### export:vtp

Exports meshes to VTP files in serial or PVTP files with VTP piece files in parallel.

**Example:**  

```xml
<export:vtp directory="." every-n-time-windows="1" every-iteration="false" update-series="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| directory | string | Directory to export the files to. | `.` | none |
| every-n-time-windows | integer | preCICE does an export every X time windows. Choose -1 for no exports. | `1` | none |
| every-iteration | boolean | Exports in every coupling (sub)iteration. For debug purposes. | `false` | none |
| update-series | boolean | Update the series file after every export instead of at the end of the simulation. | `false` | none |



### export:csv

Exports vertex coordinates and data to CSV files.

**Example:**  

```xml
<export:csv directory="." every-n-time-windows="1" every-iteration="false" update-series="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| directory | string | Directory to export the files to. | `.` | none |
| every-n-time-windows | integer | preCICE does an export every X time windows. Choose -1 for no exports. | `1` | none |
| every-iteration | boolean | Exports in every coupling (sub)iteration. For debug purposes. | `false` | none |
| update-series | boolean | Update the series file after every export instead of at the end of the simulation. | `false` | none |



### watch-point

A watch point can be used to follow the transient changes of data and mesh vertex coordinates at a given point

**Example:**  

```xml
<watch-point name="{string}" mesh="{string}" coordinate="{vector}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the watch point. Is taken in combination with the participant name to construct the filename the watch point data is written to. | _none_ | none |
| mesh | string | Mesh to be watched. | _none_ | none |
| coordinate | vector | The coordinates of the watch point. If the watch point is not put exactly on the mesh to observe, the closest projection of the point onto the mesh is considered instead, and values/coordinates are interpolated linearly to that point. | _none_ | none |



### watch-integral

A watch integral can be used to follow the transient change of integral data and surface area for a given coupling mesh.

**Example:**  

```xml
<watch-integral name="{string}" mesh="{string}" scale-with-connectivity="{boolean}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the watch integral. Is taken in combination with the participant name to construct the filename the watch integral data is written to. | _none_ | none |
| mesh | string | Mesh to be watched. | _none_ | none |
| scale-with-connectivity | boolean | Whether the vertex data is scaled with the element area before summing up or not. In 2D, vertex data is scaled with the average length of neighboring edges. In 3D, vertex data is scaled with the average surface of neighboring triangles. If false, vertex data is directly summed up. | _none_ | none |



### provide-mesh

Provide a mesh (see tag `<mesh>`) to other participants.

**Example:**  

```xml
<provide-mesh name="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the mesh to provide. | _none_ | none |



### receive-mesh

Makes a remote mesh (see tag `<mesh>`) available to this participant.

**Example:**  

```xml
<receive-mesh name="{string}" api-access="false" direct-access="false" geometric-filter="on-secondary-ranks" from="{string}" safety-factor="0.5"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the mesh to receive. | _none_ | none |
| api-access | boolean | Enables access to the data on this received mesh via the preCICE API functions without having to map it to a provided mesh. This is required for direct access or just-in-time mappings. A received mesh needs to be decomposed in preCICE using a region of interest, which cannot be inferred, if there are no mappings to or from a provided mesh. In such cases the API function `setMeshAccessRegion()` must be used to define the region of interest. See the user documentation for more information. | `false` | none |
| direct-access | boolean | Deprecated: use "api-access" instead. | `false` | none |
| geometric-filter | string | For parallel execution, a received mesh needs to be decomposed. A geometric filter based on bounding-boxes around the local mesh can speed up this process. This setting controls if and where this filter is applied. `on-primary-rank` is beneficial for a huge mesh and a low number of processors, but is incompatible with two-level initialization. `on-secondary-ranks` performs better for a very high number of processors. Both result in the same distribution if the safety-factor is sufficiently large. `no-filter` may be useful for very asymmetric cases and for debugging. If a mapping based on RBFs (rbf-pum,global-rbf) is used, the filter has no influence and is always `no-filter`. | `on-secondary-ranks` | `no-filter`, `on-primary-rank`, `on-secondary-ranks` |
| from | string | The name of the participant to receive the mesh from. This participant needs to provide the mesh using `<provide-mesh />`. | _none_ | none |
| safety-factor | float | The safety factor of the geometric filter uniformly scales the rank-local bounding box by the given factor. A safety-factor of `0.5` means that the bounding box is 150% of its original size. | `0.5` | none |



### intra-comm:sockets

A solver in parallel needs a communication between its ranks. By default, the participant's MPI_COM_WORLD is reused.Use this tag to use TCP/IP sockets instead.

**Example:**  

```xml
<intra-comm:sockets port="0" network="lo" exchange-directory="."/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| port | integer | Port number (16-bit unsigned integer) to be used for socket communication. The default is "0", what means that OS will dynamically search for a free port (if at least one exists) and bind it automatically. | `0` | none |
| network | string | Interface name to be used for socket communication. Default is the canonical name of the loopback interface of your platform. Might be different on supercomputing systems, e.g. "ib0" for the InfiniBand on SuperMUC.  | `lo` | none |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen. | `.` | none |



### intra-comm:mpi

A solver in parallel needs a communication between its ranks. By default, the participant's MPI_COM_WORLD is reused.Use this tag to use MPI with separated communication spaces instead instead.

**Example:**  

```xml
<intra-comm:mpi exchange-directory="."/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| exchange-directory | string | Directory where connection information is exchanged. By default, the directory of startup is chosen. | `.` | none |





## coupling-scheme:serial-explicit

Explicit coupling scheme according to conventional serial staggered procedure (CSS).

**Example:**  

```xml
<coupling-scheme:serial-explicit>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1" method="fixed"/>
  <participants first="{string}" second="{string}"/>
  <exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="false"/>
</coupling-scheme:serial-explicit>
```

**Valid Subtags:**

* [max-time](#max-time) `0..1`
* [max-time-windows](#max-time-windows) `0..1`
* [time-window-size](#time-window-size) `1`
* [participants](#participants) `1`
* [exchange](#exchange) `1..*`


### max-time

Defined the end of the simulation as total time.

**Example:**  

```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  

```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



### time-window-size

Defines the size of the time window.

**Example:**  

```xml
<time-window-size value="-1" method="fixed"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |
| method | string | The method used to determine the time window size. Use `fixed` to fix the time window size for the participants. | `fixed` | `fixed`, `first-participant` |



### participants

Defines the participants of the coupling scheme.

**Example:**  

```xml
<participants first="{string}" second="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| first | string | First participant to run the solver. | _none_ | none |
| second | string | Second participant to run the solver. | _none_ | none |



### exchange

Defines the flow of data between meshes of participants.

**Example:**  

```xml
<exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initialize? | `false` | none |
| substeps | boolean | Should this data exchange substeps? | `false` | none |





## coupling-scheme:parallel-explicit

Explicit coupling scheme according to conventional parallel staggered procedure (CPS).

**Example:**  

```xml
<coupling-scheme:parallel-explicit>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1"/>
  <participants first="{string}" second="{string}"/>
  <exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="false"/>
</coupling-scheme:parallel-explicit>
```

**Valid Subtags:**

* [max-time](#max-time-1) `0..1`
* [max-time-windows](#max-time-windows-1) `0..1`
* [time-window-size](#time-window-size-1) `1`
* [participants](#participants-1) `1`
* [exchange](#exchange-1) `1..*`


### max-time

Defined the end of the simulation as total time.

**Example:**  

```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  

```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



### time-window-size

Defines the size of the time window.

**Example:**  

```xml
<time-window-size value="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |



### participants

Defines the participants of the coupling scheme.

**Example:**  

```xml
<participants first="{string}" second="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| first | string | First participant to run the solver. | _none_ | none |
| second | string | Second participant to run the solver. | _none_ | none |



### exchange

Defines the flow of data between meshes of participants.

**Example:**  

```xml
<exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initialize? | `false` | none |
| substeps | boolean | Should this data exchange substeps? | `false` | none |





## coupling-scheme:serial-implicit

Implicit coupling scheme according to block Gauss-Seidel iterations (S-System). Improved implicit iterations are achieved by using a acceleration (recommended!).

**Example:**  

```xml
<coupling-scheme:serial-implicit>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1" method="fixed"/>
  <participants first="{string}" second="{string}"/>
  <exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="true"/>
  <acceleration:constant>
    ...
  </acceleration:constant>
  <absolute-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <absolute-or-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" abs-limit="{float}" rel-limit="{float}"/>
  <relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <residual-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <min-iterations value="{integer}"/>
  <max-iterations value="{integer}"/>
</coupling-scheme:serial-implicit>
```

**Valid Subtags:**

* [max-time](#max-time-1) `0..1`
* [max-time-windows](#max-time-windows-1) `0..1`
* [time-window-size](#time-window-size-1) `1`
* [participants](#participants-1) `1`
* [exchange](#exchange-1) `1..*`
* [absolute-convergence-measure](#absolute-convergence-measure) `0..*`
* [absolute-or-relative-convergence-measure](#absolute-or-relative-convergence-measure) `0..*`
* [relative-convergence-measure](#relative-convergence-measure) `0..*`
* [residual-relative-convergence-measure](#residual-relative-convergence-measure) `0..*`
* [min-iterations](#min-iterations) `0..1`
* [max-iterations](#max-iterations) `0..1`
* acceleration
  * [constant](#accelerationconstant) `0..1`
  * [aitken](#accelerationaitken) `0..1`
  * [IQN-ILS](#accelerationiqn-ils) `0..1`
  * [IQN-IMVJ](#accelerationiqn-imvj) `0..1`


### max-time

Defined the end of the simulation as total time.

**Example:**  

```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  

```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



### time-window-size

Defines the size of the time window.

**Example:**  

```xml
<time-window-size value="-1" method="fixed"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |
| method | string | The method used to determine the time window size. Use `fixed` to fix the time window size for the participants. | `fixed` | `fixed`, `first-participant` |



### participants

Defines the participants of the coupling scheme.

**Example:**  

```xml
<participants first="{string}" second="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| first | string | First participant to run the solver. | _none_ | none |
| second | string | Second participant to run the solver. | _none_ | none |



### exchange

Defines the flow of data between meshes of participants.

**Example:**  

```xml
<exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="true"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initialize? | `false` | none |
| substeps | boolean | Should this data exchange substeps? | `true` | none |



### acceleration:constant

Accelerates coupling data with constant underrelaxation.

**Example:**  

```xml
<acceleration:constant>
  <relaxation value="{float}"/>
</acceleration:constant>
```

**Valid Subtags:**

* [relaxation](#relaxation) `1`


#### relaxation



**Example:**  

```xml
<relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Constant relaxation factor. | _none_ | none |





### acceleration:aitken

Accelerates coupling data with dynamic Aitken under-relaxation.

**Example:**  

```xml
<acceleration:aitken>
  <initial-relaxation value="{float}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <preconditioner type="{string}" freeze-after="-1"/>
</acceleration:aitken>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation) `0..1`
* [data](#data) `1..*`
* [preconditioner](#preconditioner) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.5 is used.

**Example:**  

```xml
<initial-relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### preconditioner

To improve the numerical stability of multiple data vectors a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data. A value preconditioner scales every acceleration data by the norm of the data in the previous time window. A residual preconditioner scales every acceleration data by the current residual. A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

**Example:**  

```xml
<preconditioner type="{string}" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### acceleration:IQN-ILS

Accelerates coupling data with the interface quasi-Newton inverse least-squares method.

**Example:**  

```xml
<acceleration:IQN-ILS reduced-time-grid="true">
  <initial-relaxation value="{float}" enforce="false"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <filter limit="1e-16" type="QR3"/>
  <preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
</acceleration:IQN-ILS>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| reduced-time-grid | boolean | Whether only the last time step of each time window is used to construct the Jacobian. | `true` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `0..1`
* [max-used-iterations](#max-used-iterations) `0..1`
* [time-windows-reused](#time-windows-reused) `0..1`
* [data](#data-1) `1..*`
* [filter](#filter) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.1 is used.

**Example:**  

```xml
<initial-relaxation value="{float}" enforce="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `false` | none |



#### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian. If this tag is not provided, the attribute value of 100 is used.

**Example:**  

```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian. If this tag is not provided, the default attribute value of 10 is used.

**Example:**  

```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of time windows. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:

- `QR1`: update QR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
- `QR1-absolute`: update QR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
- `QR2`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

- `QR3`: update QR-dec only when the pre-scaling weights have changed or there is one or more columns are to be removed with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  

```xml
<filter limit="1e-16" type="QR3"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | `QR3` | `QR1`, `QR1-absolute`, `QR2`, `QR3` |



#### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied.

- A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data. 
 - A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

If this tag is not provided, the residual-sum preconditioner is employed.

**Example:**  

```xml
<preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| update-on-threshold | boolean | To update the preconditioner weights after the first time window: `true`: The preconditioner weights are only updated if the weights will change by more than one order of magnitude. `false`: The preconditioner weights are updated after every iteration. | `true` | none |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### acceleration:IQN-IMVJ

Accelerates coupling data with the interface quasi-Newton inverse multi-vector Jacobian method.

**Example:**  

```xml
<acceleration:IQN-IMVJ always-build-jacobian="false" reduced-time-grid="true">
  <initial-relaxation value="{float}" enforce="false"/>
  <imvj-restart-mode type="RS-SVD" chunk-size="8" reused-time-windows-at-restart="8" truncation-threshold="0.0001"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <filter limit="1e-16" type="QR3"/>
  <preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
</acceleration:IQN-IMVJ>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| always-build-jacobian | boolean | If set to true, the IMVJ will set up the Jacobian matrix in each coupling iteration, which is inefficient. If set to false (or not set) the Jacobian is only build in the last iteration and the updates are computed using (relatively) cheap MATVEC products. | `false` | none |
| reduced-time-grid | boolean | Whether only the last time step of each time window is used to construct the Jacobian. | `true` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `0..1`
* [imvj-restart-mode](#imvj-restart-mode) `0..1`
* [max-used-iterations](#max-used-iterations-1) `0..1`
* [time-windows-reused](#time-windows-reused-1) `0..1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.1 is used.

**Example:**  

```xml
<initial-relaxation value="{float}" enforce="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `false` | none |



#### imvj-restart-mode

Enable IMVJ Type of IMVJ restart mode that is used: `no-restart`: IMVJ runs in normal mode with explicit representation of Jacobian. `RS-0`: IMVJ runs in restart mode. After M time windows all Jacobain information is dropped, restart with no information. `RS-LS`: IMVJ runs in restart mode. After M time windows a IQN-LS like approximation for the initial guess of the Jacobian is computed. `RS-SVD`: IMVJ runs in restart mode. After M time windows a truncated SVD of the Jacobian is updated. `RS-SLIDE`: IMVJ runs in sliding window restart mode. If this tag is not provided, IMVJ runs in restart mode with SVD-method.

**Example:**  

```xml
<imvj-restart-mode type="RS-SVD" chunk-size="8" reused-time-windows-at-restart="8" truncation-threshold="0.0001"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | Type of the restart mode. | `RS-SVD` | `no-restart`, `RS-0`, `RS-LS`, `RS-SVD`, `RS-SLIDE` |
| chunk-size | integer | Specifies the number of time windows M after which the IMVJ restarts, if run in restart-mode. Default value is M=8. | `8` | none |
| reused-time-windows-at-restart | integer | If IMVJ restart-mode=RS-LS, the number of reused time windows at restart can be specified. | `8` | none |
| truncation-threshold | float | If IMVJ restart-mode=RS-SVD, the truncation threshold for the updated SVD can be set. | `0.0001` | none |



#### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian. If this tag is not provided, the default attribute value of 20 is used.

**Example:**  

```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian. If this tag is not provided, the attribute value of 0 is used.

**Example:**  

```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:

- `QR1`: update QR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
- `QR1-absolute`: update QR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
- `QR2`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

- `QR3`: update QR-dec only when the pre-scaling weights have changed or there is one or more columns are to be removed with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  

```xml
<filter limit="1e-16" type="QR3"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | `QR3` | `QR1`, `QR1-absolute`, `QR2`, `QR3` |



#### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied.

- A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.
- A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

If this tag is not provided, the residual-sum preconditioner is employed.

**Example:**  

```xml
<preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | Type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| update-on-threshold | boolean | To update the preconditioner weights after the first time window: `true`: The preconditioner weights are only updated if the weights will change by more than one order of magnitude. `false`: The preconditioner weights are updated after every iteration. | `true` | none |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### absolute-convergence-measure

Absolute convergence criterion based on the two-norm difference of data values between iterations.
\$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{limit}\$$

**Example:**  

```xml
<absolute-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |



### absolute-or-relative-convergence-measure

Absolute or relative convergence, which is the disjunction of an absolute criterion based on the two-norm difference of data values between iterations and a relative criterion based on the relative two-norm difference of data values between iterations,i.e. convergence is reached as soon as one of the both criteria is fulfilled. \$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{abs-limit}\quad\text{or}\quad\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{rel-limit} \$$  

**Example:**  

```xml
<absolute-or-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" abs-limit="{float}" rel-limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| abs-limit | float | Absolute limit under which the measure is considered to have converged. | _none_ | none |
| rel-limit | float |  | _none_ | none |



### relative-convergence-measure

Relative convergence criterion based on the relative two-norm difference of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{limit} \$$

**Example:**  

```xml
<relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \\((0, 1]\\). | _none_ | none |



### residual-relative-convergence-measure

Relative convergence criterion comparing the currently measured residual to the residual of the first iteration in the time window.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^0) - x^0 \right\rVert_2} < \text{limit}\$$

**Example:**  

```xml
<residual-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |



### min-iterations

Allows to specify a minimum amount of iterations that must be performed per time window.

**Example:**  

```xml
<min-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The minimum amount of iterations. | _none_ | none |



### max-iterations

Allows to specify a maximum amount of iterations per time window.

**Example:**  

```xml
<max-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum value of iterations. | _none_ | none |





## coupling-scheme:parallel-implicit

Parallel Implicit coupling scheme according to block Jacobi iterations (V-System). Improved implicit iterations are achieved by using a acceleration (recommended!).

**Example:**  

```xml
<coupling-scheme:parallel-implicit>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1"/>
  <participants first="{string}" second="{string}"/>
  <exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="true"/>
  <acceleration:constant>
    ...
  </acceleration:constant>
  <absolute-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <absolute-or-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" abs-limit="{float}" rel-limit="{float}"/>
  <relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <residual-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <min-iterations value="{integer}"/>
  <max-iterations value="{integer}"/>
</coupling-scheme:parallel-implicit>
```

**Valid Subtags:**

* [max-time](#max-time-1) `0..1`
* [max-time-windows](#max-time-windows-1) `0..1`
* [time-window-size](#time-window-size-1) `1`
* [participants](#participants-1) `1`
* [exchange](#exchange-1) `1..*`
* [absolute-convergence-measure](#absolute-convergence-measure-1) `0..*`
* [absolute-or-relative-convergence-measure](#absolute-or-relative-convergence-measure-1) `0..*`
* [relative-convergence-measure](#relative-convergence-measure-1) `0..*`
* [residual-relative-convergence-measure](#residual-relative-convergence-measure-1) `0..*`
* [min-iterations](#min-iterations-1) `0..1`
* [max-iterations](#max-iterations-1) `0..1`
* acceleration
  * [constant](#accelerationconstant-1) `0..1`
  * [aitken](#accelerationaitken-1) `0..1`
  * [IQN-ILS](#accelerationiqn-ils-1) `0..1`
  * [IQN-IMVJ](#accelerationiqn-imvj-1) `0..1`


### max-time

Defined the end of the simulation as total time.

**Example:**  

```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  

```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



### time-window-size

Defines the size of the time window.

**Example:**  

```xml
<time-window-size value="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |



### participants

Defines the participants of the coupling scheme.

**Example:**  

```xml
<participants first="{string}" second="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| first | string | First participant to run the solver. | _none_ | none |
| second | string | Second participant to run the solver. | _none_ | none |



### exchange

Defines the flow of data between meshes of participants.

**Example:**  

```xml
<exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="true"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initialize? | `false` | none |
| substeps | boolean | Should this data exchange substeps? | `true` | none |



### acceleration:constant

Accelerates coupling data with constant underrelaxation.

**Example:**  

```xml
<acceleration:constant>
  <relaxation value="{float}"/>
</acceleration:constant>
```

**Valid Subtags:**

* [relaxation](#relaxation-1) `1`


#### relaxation



**Example:**  

```xml
<relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Constant relaxation factor. | _none_ | none |





### acceleration:aitken

Accelerates coupling data with dynamic Aitken under-relaxation.

**Example:**  

```xml
<acceleration:aitken>
  <initial-relaxation value="{float}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <preconditioner type="{string}" freeze-after="-1"/>
</acceleration:aitken>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `0..1`
* [data](#data-1) `1..*`
* [preconditioner](#preconditioner-1) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.5 is used.

**Example:**  

```xml
<initial-relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### preconditioner

To improve the numerical stability of multiple data vectors a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data. A value preconditioner scales every acceleration data by the norm of the data in the previous time window. A residual preconditioner scales every acceleration data by the current residual. A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

**Example:**  

```xml
<preconditioner type="{string}" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### acceleration:IQN-ILS

Accelerates coupling data with the interface quasi-Newton inverse least-squares method.

**Example:**  

```xml
<acceleration:IQN-ILS reduced-time-grid="true">
  <initial-relaxation value="{float}" enforce="false"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <filter limit="1e-16" type="QR3"/>
  <preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
</acceleration:IQN-ILS>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| reduced-time-grid | boolean | Whether only the last time step of each time window is used to construct the Jacobian. | `true` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `0..1`
* [max-used-iterations](#max-used-iterations-1) `0..1`
* [time-windows-reused](#time-windows-reused-1) `0..1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.1 is used.

**Example:**  

```xml
<initial-relaxation value="{float}" enforce="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `false` | none |



#### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian. If this tag is not provided, the attribute value of 100 is used.

**Example:**  

```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian. If this tag is not provided, the default attribute value of 10 is used.

**Example:**  

```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of time windows. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:

- `QR1`: update QR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
- `QR1-absolute`: update QR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
- `QR2`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

- `QR3`: update QR-dec only when the pre-scaling weights have changed or there is one or more columns are to be removed with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  

```xml
<filter limit="1e-16" type="QR3"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | `QR3` | `QR1`, `QR1-absolute`, `QR2`, `QR3` |



#### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied.

- A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data. 
 - A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

If this tag is not provided, the residual-sum preconditioner is employed.

**Example:**  

```xml
<preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| update-on-threshold | boolean | To update the preconditioner weights after the first time window: `true`: The preconditioner weights are only updated if the weights will change by more than one order of magnitude. `false`: The preconditioner weights are updated after every iteration. | `true` | none |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### acceleration:IQN-IMVJ

Accelerates coupling data with the interface quasi-Newton inverse multi-vector Jacobian method.

**Example:**  

```xml
<acceleration:IQN-IMVJ always-build-jacobian="false" reduced-time-grid="true">
  <initial-relaxation value="{float}" enforce="false"/>
  <imvj-restart-mode type="RS-SVD" chunk-size="8" reused-time-windows-at-restart="8" truncation-threshold="0.0001"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <filter limit="1e-16" type="QR3"/>
  <preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
</acceleration:IQN-IMVJ>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| always-build-jacobian | boolean | If set to true, the IMVJ will set up the Jacobian matrix in each coupling iteration, which is inefficient. If set to false (or not set) the Jacobian is only build in the last iteration and the updates are computed using (relatively) cheap MATVEC products. | `false` | none |
| reduced-time-grid | boolean | Whether only the last time step of each time window is used to construct the Jacobian. | `true` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `0..1`
* [imvj-restart-mode](#imvj-restart-mode-1) `0..1`
* [max-used-iterations](#max-used-iterations-1) `0..1`
* [time-windows-reused](#time-windows-reused-1) `0..1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.1 is used.

**Example:**  

```xml
<initial-relaxation value="{float}" enforce="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `false` | none |



#### imvj-restart-mode

Enable IMVJ Type of IMVJ restart mode that is used: `no-restart`: IMVJ runs in normal mode with explicit representation of Jacobian. `RS-0`: IMVJ runs in restart mode. After M time windows all Jacobain information is dropped, restart with no information. `RS-LS`: IMVJ runs in restart mode. After M time windows a IQN-LS like approximation for the initial guess of the Jacobian is computed. `RS-SVD`: IMVJ runs in restart mode. After M time windows a truncated SVD of the Jacobian is updated. `RS-SLIDE`: IMVJ runs in sliding window restart mode. If this tag is not provided, IMVJ runs in restart mode with SVD-method.

**Example:**  

```xml
<imvj-restart-mode type="RS-SVD" chunk-size="8" reused-time-windows-at-restart="8" truncation-threshold="0.0001"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | Type of the restart mode. | `RS-SVD` | `no-restart`, `RS-0`, `RS-LS`, `RS-SVD`, `RS-SLIDE` |
| chunk-size | integer | Specifies the number of time windows M after which the IMVJ restarts, if run in restart-mode. Default value is M=8. | `8` | none |
| reused-time-windows-at-restart | integer | If IMVJ restart-mode=RS-LS, the number of reused time windows at restart can be specified. | `8` | none |
| truncation-threshold | float | If IMVJ restart-mode=RS-SVD, the truncation threshold for the updated SVD can be set. | `0.0001` | none |



#### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian. If this tag is not provided, the default attribute value of 20 is used.

**Example:**  

```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian. If this tag is not provided, the attribute value of 0 is used.

**Example:**  

```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:

- `QR1`: update QR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
- `QR1-absolute`: update QR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
- `QR2`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

- `QR3`: update QR-dec only when the pre-scaling weights have changed or there is one or more columns are to be removed with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  

```xml
<filter limit="1e-16" type="QR3"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | `QR3` | `QR1`, `QR1-absolute`, `QR2`, `QR3` |



#### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied.

- A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.
- A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

If this tag is not provided, the residual-sum preconditioner is employed.

**Example:**  

```xml
<preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | Type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| update-on-threshold | boolean | To update the preconditioner weights after the first time window: `true`: The preconditioner weights are only updated if the weights will change by more than one order of magnitude. `false`: The preconditioner weights are updated after every iteration. | `true` | none |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### absolute-convergence-measure

Absolute convergence criterion based on the two-norm difference of data values between iterations.
\$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{limit}\$$

**Example:**  

```xml
<absolute-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |



### absolute-or-relative-convergence-measure

Absolute or relative convergence, which is the disjunction of an absolute criterion based on the two-norm difference of data values between iterations and a relative criterion based on the relative two-norm difference of data values between iterations,i.e. convergence is reached as soon as one of the both criteria is fulfilled. \$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{abs-limit}\quad\text{or}\quad\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{rel-limit} \$$  

**Example:**  

```xml
<absolute-or-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" abs-limit="{float}" rel-limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| abs-limit | float | Absolute limit under which the measure is considered to have converged. | _none_ | none |
| rel-limit | float |  | _none_ | none |



### relative-convergence-measure

Relative convergence criterion based on the relative two-norm difference of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{limit} \$$

**Example:**  

```xml
<relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \\((0, 1]\\). | _none_ | none |



### residual-relative-convergence-measure

Relative convergence criterion comparing the currently measured residual to the residual of the first iteration in the time window.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^0) - x^0 \right\rVert_2} < \text{limit}\$$

**Example:**  

```xml
<residual-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |



### min-iterations

Allows to specify a minimum amount of iterations that must be performed per time window.

**Example:**  

```xml
<min-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The minimum amount of iterations. | _none_ | none |



### max-iterations

Allows to specify a maximum amount of iterations per time window.

**Example:**  

```xml
<max-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum value of iterations. | _none_ | none |





## coupling-scheme:multi

Multi coupling scheme according to block Jacobi iterations. Improved implicit iterations are achieved by using a acceleration (recommended!).

**Example:**  

```xml
<coupling-scheme:multi>
  <max-time value="{float}"/>
  <max-time-windows value="{integer}"/>
  <time-window-size value="-1"/>
  <participant name="{string}" control="false"/>
  <exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="true"/>
  <acceleration:constant>
    ...
  </acceleration:constant>
  <absolute-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <absolute-or-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" abs-limit="{float}" rel-limit="{float}"/>
  <relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <residual-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
  <min-iterations value="{integer}"/>
  <max-iterations value="{integer}"/>
</coupling-scheme:multi>
```

**Valid Subtags:**

* [max-time](#max-time-1) `0..1`
* [max-time-windows](#max-time-windows-1) `0..1`
* [time-window-size](#time-window-size-1) `1`
* [participant](#participant-1) `1..*`
* [exchange](#exchange-1) `1..*`
* [absolute-convergence-measure](#absolute-convergence-measure-1) `0..*`
* [absolute-or-relative-convergence-measure](#absolute-or-relative-convergence-measure-1) `0..*`
* [relative-convergence-measure](#relative-convergence-measure-1) `0..*`
* [residual-relative-convergence-measure](#residual-relative-convergence-measure-1) `0..*`
* [min-iterations](#min-iterations-1) `0..1`
* [max-iterations](#max-iterations-1) `0..1`
* acceleration
  * [constant](#accelerationconstant-1) `0..1`
  * [aitken](#accelerationaitken-1) `0..1`
  * [IQN-ILS](#accelerationiqn-ils-1) `0..1`
  * [IQN-IMVJ](#accelerationiqn-imvj-1) `0..1`


### max-time

Defined the end of the simulation as total time.

**Example:**  

```xml
<max-time value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The value of the maximum simulation time. | _none_ | none |



### max-time-windows

Defined the end of the simulation as a total count of time windows.

**Example:**  

```xml
<max-time-windows value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum count of time windows. | _none_ | none |



### time-window-size

Defines the size of the time window.

**Example:**  

```xml
<time-window-size value="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | The maximum time window size. | `-1` | none |



### participant



**Example:**  

```xml
<participant name="{string}" control="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| name | string | Name of the participant. | _none_ | none |
| control | boolean | Does this participant control the coupling? | `false` | none |



### exchange

Defines the flow of data between meshes of participants.

**Example:**  

```xml
<exchange data="{string}" mesh="{string}" from="{string}" to="{string}" initialize="false" substeps="true"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | The data to exchange. | _none_ | none |
| mesh | string | The mesh which uses the data. | _none_ | none |
| from | string | The participant sending the data. | _none_ | none |
| to | string | The participant receiving the data. | _none_ | none |
| initialize | boolean | Should this data be initialized during initialize? | `false` | none |
| substeps | boolean | Should this data exchange substeps? | `true` | none |



### acceleration:constant

Accelerates coupling data with constant underrelaxation.

**Example:**  

```xml
<acceleration:constant>
  <relaxation value="{float}"/>
</acceleration:constant>
```

**Valid Subtags:**

* [relaxation](#relaxation-1) `1`


#### relaxation



**Example:**  

```xml
<relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Constant relaxation factor. | _none_ | none |





### acceleration:aitken

Accelerates coupling data with dynamic Aitken under-relaxation.

**Example:**  

```xml
<acceleration:aitken>
  <initial-relaxation value="{float}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <preconditioner type="{string}" freeze-after="-1"/>
</acceleration:aitken>
```

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `0..1`
* [data](#data-1) `1..*`
* [preconditioner](#preconditioner-1) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.5 is used.

**Example:**  

```xml
<initial-relaxation value="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### preconditioner

To improve the numerical stability of multiple data vectors a preconditioner can be applied. A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data. A value preconditioner scales every acceleration data by the norm of the data in the previous time window. A residual preconditioner scales every acceleration data by the current residual. A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

**Example:**  

```xml
<preconditioner type="{string}" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### acceleration:IQN-ILS

Accelerates coupling data with the interface quasi-Newton inverse least-squares method.

**Example:**  

```xml
<acceleration:IQN-ILS reduced-time-grid="true">
  <initial-relaxation value="{float}" enforce="false"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <filter limit="1e-16" type="QR3"/>
  <preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
</acceleration:IQN-ILS>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| reduced-time-grid | boolean | Whether only the last time step of each time window is used to construct the Jacobian. | `true` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `0..1`
* [max-used-iterations](#max-used-iterations-1) `0..1`
* [time-windows-reused](#time-windows-reused-1) `0..1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.1 is used.

**Example:**  

```xml
<initial-relaxation value="{float}" enforce="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `false` | none |



#### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian. If this tag is not provided, the attribute value of 100 is used.

**Example:**  

```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian. If this tag is not provided, the default attribute value of 10 is used.

**Example:**  

```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of time windows. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:

- `QR1`: update QR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
- `QR1-absolute`: update QR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
- `QR2`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

- `QR3`: update QR-dec only when the pre-scaling weights have changed or there is one or more columns are to be removed with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  

```xml
<filter limit="1e-16" type="QR3"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | `QR3` | `QR1`, `QR1-absolute`, `QR2`, `QR3` |



#### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied.

- A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data. 
 - A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

If this tag is not provided, the residual-sum preconditioner is employed.

**Example:**  

```xml
<preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | The type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| update-on-threshold | boolean | To update the preconditioner weights after the first time window: `true`: The preconditioner weights are only updated if the weights will change by more than one order of magnitude. `false`: The preconditioner weights are updated after every iteration. | `true` | none |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### acceleration:IQN-IMVJ

Accelerates coupling data with the interface quasi-Newton inverse multi-vector Jacobian method.

**Example:**  

```xml
<acceleration:IQN-IMVJ always-build-jacobian="false" reduced-time-grid="true">
  <initial-relaxation value="{float}" enforce="false"/>
  <imvj-restart-mode type="RS-SVD" chunk-size="8" reused-time-windows-at-restart="8" truncation-threshold="0.0001"/>
  <max-used-iterations value="{integer}"/>
  <time-windows-reused value="{integer}"/>
  <data scaling="1" name="{string}" mesh="{string}"/>
  <filter limit="1e-16" type="QR3"/>
  <preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
</acceleration:IQN-IMVJ>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| always-build-jacobian | boolean | If set to true, the IMVJ will set up the Jacobian matrix in each coupling iteration, which is inefficient. If set to false (or not set) the Jacobian is only build in the last iteration and the updates are computed using (relatively) cheap MATVEC products. | `false` | none |
| reduced-time-grid | boolean | Whether only the last time step of each time window is used to construct the Jacobian. | `true` | none |

**Valid Subtags:**

* [initial-relaxation](#initial-relaxation-1) `0..1`
* [imvj-restart-mode](#imvj-restart-mode-1) `0..1`
* [max-used-iterations](#max-used-iterations-1) `0..1`
* [time-windows-reused](#time-windows-reused-1) `0..1`
* [data](#data-1) `1..*`
* [filter](#filter-1) `0..1`
* [preconditioner](#preconditioner-1) `0..1`


#### initial-relaxation

Initial relaxation factor. If this tag is not provided, an initial relaxation of 0.1 is used.

**Example:**  

```xml
<initial-relaxation value="{float}" enforce="false"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | float | Initial relaxation factor. | _none_ | none |
| enforce | boolean | Enforce initial relaxation in every time window. | `false` | none |



#### imvj-restart-mode

Enable IMVJ Type of IMVJ restart mode that is used: `no-restart`: IMVJ runs in normal mode with explicit representation of Jacobian. `RS-0`: IMVJ runs in restart mode. After M time windows all Jacobain information is dropped, restart with no information. `RS-LS`: IMVJ runs in restart mode. After M time windows a IQN-LS like approximation for the initial guess of the Jacobian is computed. `RS-SVD`: IMVJ runs in restart mode. After M time windows a truncated SVD of the Jacobian is updated. `RS-SLIDE`: IMVJ runs in sliding window restart mode. If this tag is not provided, IMVJ runs in restart mode with SVD-method.

**Example:**  

```xml
<imvj-restart-mode type="RS-SVD" chunk-size="8" reused-time-windows-at-restart="8" truncation-threshold="0.0001"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | Type of the restart mode. | `RS-SVD` | `no-restart`, `RS-0`, `RS-LS`, `RS-SVD`, `RS-SLIDE` |
| chunk-size | integer | Specifies the number of time windows M after which the IMVJ restarts, if run in restart-mode. Default value is M=8. | `8` | none |
| reused-time-windows-at-restart | integer | If IMVJ restart-mode=RS-LS, the number of reused time windows at restart can be specified. | `8` | none |
| truncation-threshold | float | If IMVJ restart-mode=RS-SVD, the truncation threshold for the updated SVD can be set. | `0.0001` | none |



#### max-used-iterations

Maximum number of columns used in low-rank approximation of Jacobian. If this tag is not provided, the default attribute value of 20 is used.

**Example:**  

```xml
<max-used-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### time-windows-reused

Number of past time windows from which columns are used to approximate Jacobian. If this tag is not provided, the attribute value of 0 is used.

**Example:**  

```xml
<time-windows-reused value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The number of columns. | _none_ | none |



#### data

The data used to compute the acceleration.

**Example:**  

```xml
<data scaling="1" name="{string}" mesh="{string}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| scaling | float | To improve the performance of a parallel or a multi coupling schemes, each data set can be manually scaled using this scaling factor with preconditioner type = "constant". For all other preconditioner types, the factor is ignored. We recommend, however, to use an automatic scaling via a preconditioner. | `1` | none |
| name | string | The name of the data. | _none_ | none |
| mesh | string | The name of the mesh which holds the data. | _none_ | none |



#### filter

Type of filtering technique that is used to maintain good conditioning in the least-squares system. Possible filters:

- `QR1`: update QR-dec with (relative) test \\(R(i,i) < \epsilon *\lVert R\rVert_F\\)
- `QR1-absolute`: update QR-dec with (absolute) test \\(R(i, i) < \epsilon\\)
- `QR2`: en-block QR-dec with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

- `QR3`: update QR-dec only when the pre-scaling weights have changed or there is one or more columns are to be removed with test \\(\lVert v_\text{orth} \rVert_2 < \epsilon * \lVert v \rVert_2\\)

Please note that a QR1 is based on Given's rotations whereas QR2 uses modified Gram-Schmidt. This can give different results even when no columns are filtered out.

**Example:**  

```xml
<filter limit="1e-16" type="QR3"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| limit | float | Limit eps of the filter. | `1e-16` | none |
| type | string | Type of the filter. | `QR3` | `QR1`, `QR1-absolute`, `QR2`, `QR3` |



#### preconditioner

To improve the performance of a parallel or a multi coupling schemes a preconditioner can be applied.

- A constant preconditioner scales every acceleration data by a constant value, which you can define as an attribute of data.
- A value preconditioner scales every acceleration data by the norm of the data in the previous time window.
- A residual preconditioner scales every acceleration data by the current residual.
- A residual-sum preconditioner scales every acceleration data by the sum of the residuals from the current time window.

If this tag is not provided, the residual-sum preconditioner is employed.

**Example:**  

```xml
<preconditioner type="{string}" update-on-threshold="true" freeze-after="-1"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| type | string | Type of the preconditioner. | _none_ | `constant`, `value`, `residual`, `residual-sum` |
| update-on-threshold | boolean | To update the preconditioner weights after the first time window: `true`: The preconditioner weights are only updated if the weights will change by more than one order of magnitude. `false`: The preconditioner weights are updated after every iteration. | `true` | none |
| freeze-after | integer | After the given number of time windows, the preconditioner weights are frozen and the preconditioner acts like a constant preconditioner. | `-1` | none |





### absolute-convergence-measure

Absolute convergence criterion based on the two-norm difference of data values between iterations.
\$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{limit}\$$

**Example:**  

```xml
<absolute-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |



### absolute-or-relative-convergence-measure

Absolute or relative convergence, which is the disjunction of an absolute criterion based on the two-norm difference of data values between iterations and a relative criterion based on the relative two-norm difference of data values between iterations,i.e. convergence is reached as soon as one of the both criteria is fulfilled. \$$\left\lVert H(x^k) - x^k \right\rVert_2 < \text{abs-limit}\quad\text{or}\quad\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{rel-limit} \$$  

**Example:**  

```xml
<absolute-or-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" abs-limit="{float}" rel-limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| abs-limit | float | Absolute limit under which the measure is considered to have converged. | _none_ | none |
| rel-limit | float |  | _none_ | none |



### relative-convergence-measure

Relative convergence criterion based on the relative two-norm difference of data values between iterations.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^k) \right\rVert_2} < \text{limit} \$$

**Example:**  

```xml
<relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \\((0, 1]\\). | _none_ | none |



### residual-relative-convergence-measure

Relative convergence criterion comparing the currently measured residual to the residual of the first iteration in the time window.
\$$\frac{\left\lVert H(x^k) - x^k \right\rVert_2}{\left\lVert H(x^0) - x^0 \right\rVert_2} < \text{limit}\$$

**Example:**  

```xml
<residual-relative-convergence-measure data="{string}" mesh="{string}" suffices="false" strict="false" limit="{float}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| data | string | Data to be measured. | _none_ | none |
| mesh | string | Mesh holding the data. | _none_ | none |
| suffices | boolean | If true, convergence of this measure is sufficient for overall convergence. | `false` | none |
| strict | boolean | If true, non-convergence of this measure ends the simulation. "strict" overrules "suffices". | `false` | none |
| limit | float | Limit under which the measure is considered to have converged. Must be in \((0, 1]\). | _none_ | none |



### min-iterations

Allows to specify a minimum amount of iterations that must be performed per time window.

**Example:**  

```xml
<min-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The minimum amount of iterations. | _none_ | none |



### max-iterations

Allows to specify a maximum amount of iterations per time window.

**Example:**  

```xml
<max-iterations value="{integer}"/>
```

| Attribute | Type | Description | Default | Options |
| --- | --- | --- | --- | --- |
| value | integer | The maximum value of iterations. | _none_ | none |






