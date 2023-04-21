---
title: Action configurations
permalink: configuration-action.html
keywords: configuration, action, python, callback
summary: "Sometimes, coupled solvers provide just not quite the data that you need to couple. For instance, a fluid solver provides stresses at the coupling boundary, whereas a solid solver requires forces. In this case, you can use so-called coupling actions to modify coupling data at runtime. These coupling actions are essentially a set of functionalities that have access to coupling meshes and the corresponding data values. On this page, we explain how you can use them."
---

There are two types of coupling actions: pre-implemented ones and user-defined ones. For the latter, you can access coupling meshes through a Python callback interface.

## Basics and pre-implemented actions

```xml
<participant name="MySolver1">
    <use-mesh name="MyMesh1" provide="yes"/>
    <write-data name="Stresses" mesh="MyMesh1"/>
    ...
    <action:multiply-by-area mesh="MyMesh1" timing="write-mapping-post">
        <target-data name="Stresses"/>
    </action:multiply-by-area>
    ...
</participant>
```

This example multiplies the stresses values by the respective element area, transforming stresses into forces. Please note that for this specific action, mesh connectivity information needs to be provided. (edges, triangles, etc. through `setMeshEdge` or [similar API functions](couple-your-code-defining-mesh-connectivity.html).

`timing` defines _when_ the action is executed. Options are:

* `write-mapping-prior` and `write-mapping-post`: directly before or after each time the write mappings are applied.
* `read-mapping-prior` and `read-mapping-post`: directly before or after each time the read mappings are applied.
* `on-time-window-complete-post`: after the coupling in a complete time window has converged, after `read` data is mapped.

<details markdown="1"><summary>Older (preCICE version < 2.1.0) timings that are deprecated and revert to one of the above options: (click for details)</summary>

* `regular-prior`: In every `advance` call (also for subcycling) and in `initializeData`, after `write` data is mapped, but _before_ data might be sent. (_v2.1 or later: reverts to `write-mapping-prior`_)
* `regular-post`: In every `advance` call (also for subcycling), in `initializeData` and in `initialize`, before `read` data is mapped, but _after_ data might be received and after acceleration. (_v2.1 or later: reverts to `read-mapping-prior`_)
* `on-exchange-prior`: Only in those `advance` calls which lead to data exchange (and in `initializeData`), after `write` data is mapped, but _before_ data might be sent. (_v2.1 or later: reverts to `write-mapping-post`_)
* `on-exchange-post`: Only in those `advance` calls which lead to data exchange (and in `initializeData` and `ìnitialize`), before `read` data is mapped, but _after_ data might be received. (_v2.1 or later: reverts to `read-mapping-prior`_)

</details><br />

Pre-implemented actions are:

* `multiply-by-area` / `divide-by-area`: Modify coupling data by mesh area
* `scale-by-computed-dt-ratio` / `scale-by-computed-dt-part-ratio` / `scale-by-dt`: Modify coupling data by time step size
* `compute-curvature`: Compute curvature values at vertices
* `summation`: Sum up the data from source participants and write to target participant

{% note %}
All target and source data used in actions require `<read-data ... />` or `<write-data ... />` tags.
{% endnote %}

For more details, please refer to the [XML reference](configuration-xml-reference.html).

## Python callback interface

Other than the pre-implemented coupling actions, preCICE also provides a callback interface for Python scripts to execute coupling actions. To use this feature, you need to [build preCICE with python support](installation-source-configuration.html#options).

{% note %}
The primary purpose of the python interface is prototyping. If you need a native version of the action, please contact us on GitHub to develop and possibly integrate it into the project.
{% endnote %}

We show an example for the [1D elastic tube](tutorials-elastic-tube-1d.html):

```xml
<participant name="Solid">
    <use-mesh name="Solid-Nodes-Mesh" provide="yes"/>
    <use-mesh name="Fluid-Nodes-Mesh" from "Fluid" />
    <write-data name="CrossSectionLength" mesh="Solid-Nodes-Mesh" />
    <read-data name="Pressure" mesh="Solid-Nodes-Mesh" />
    <action:python mesh="Solid-Nodes-Mesh" timing="read-mapping-prior">
        <path name="<PATH_TO_PYTHON_ACTION_SCRIPT>"/>
        <module name="<PYTHON_SCRIPT_NAME.PY>"/>
        <source-data name="Pressure"/>
        <target-data name="Pressure"/>
    </action:python>
</participant>
```

The callback interface consists of the following three (optional) functions:

```python
performAction(time, sourceData, targetData)
vertexCallback(id, coords, normal)
postAction()
```

`performAction` gives access to the coupling value arrays. You can store these values in global variables to grant access to the other two functions.

`vertexCallback` gives access to the geometric data of each vertex. This function is called successively for every vertex of the specified coupling mesh and you can use the corresponding geometric data.

`postAction` is called at the final step. You can perform any finalizing code after deriving information from the vertices, if wished.

Without the Python action, the 1D elastic tube gives the following results:

![diameter of 1D elastic tube as function of time and space without python action](images/docs/configuration-elastic-tube-diameter.png)

Now, we want to ramp up the pressure values written by the fluid solver over time. A feature often needed to get a stable coupled simulation.

```python
mySourceData = 0
myTargetData = 0

def performAction(time, dt, sourceData, targetData):
    # This function is called first at configured timing. It can be omitted, if not
    # needed. Its parameters are time, time step size, the source data, followed by the target data.
    # Source and target data can be omitted (selectively or both) by not mentioning
    # them in the preCICE XML configuration.

    global mySourceData
    global myTargetData

    mySourceData = sourceData # store (reference to) sourceData for later use
    myTargetData = targetData # store (reference to) targetData for later use

    timeThreshold = 0.2 # Ramp up the pressure values until this point in time

    if time < timeThreshold:
        for i in range(myTargetData.size):
        # Ramp up pressure value
            myTargetData[i] = (time / timeThreshold) * mySourceData[i]

    else:
        for i in range(myTargetData.size):
            # Assign the computed physical pressure values
            myTargetData[i] = mySourceData[i]


def vertexCallback(id, coords, normal):
    # This function is called for every vertex in the configured mesh. It is called
    # after performAction, and can also be omitted.

    # Usage example:
    global mySourceData # Make global data set in performAction visible
    global myTargetData
    # Example usage, add data to vertex coords:
    # myTargetData[id] += coords[0] + mySourceData[id]

def postAction():
    # This function is called at last, if not omitted.

    global mySourceData # Make global data set in performAction visible
    global myTargetData
    # Do something ...
```

With the Python action, you should now get the following results. Note the lower maximum diameter and the change at `t=0.2` (`t=20` in the graph).

![diameter of 1D elastic tube as function of time and space with python action](images/docs/configuration-diameter-python-action.png)
