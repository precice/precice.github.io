---
title: Step 8 – Mesh connectivity 
permalink: couple-your-code-defining-mesh-connectivity.html
keywords: api, adapter, projection, mapping, edges, triangles
toc: false
summary: "So far, our coupling mesh is only a cloud of vertices. This is sufficient for most of the numerical methods that preCICE offers. For some features, however, preCICE also needs to know how vertices are connected to each other. In this step, you learn how to define this so-called mesh connectivity."
---


The most important example where mesh connectivity is needed is the `nearest-projection` mapping, where the mesh we project _into_ needs mesh connectivity. For a consistent mapping, this is the mesh _from_ which you map. For a conservative mapping, the mesh _to_ which you map. More information is given on the [mapping configuration page](configuration-mapping).

There are two types of connectivity, which depend on the type of coupling.
For surface coupling in 2D, mesh connectivity boils down to defining edges between vertices. In 3D, you need to define triangles and / or quads.
For volume coupling in 2D, mesh connectivity boils down to defining triangles and / or quads between vertices. In 3D, you need to define tetrahedra introduced in version `2.5.0`.

All kind of connectivity can be built up directly from vertices. Triangles and quads also allow us to define them using edge IDs.

```cpp
void setMeshEdge(precice::string_view meshName, VertexID firstVertexID, VertexID secondVertexID);
void setMeshTriangle(precice::string_view meshName, VertexID firstVertexID, VertexID secondVertexID, VertexID thirdVertexID);
void setMeshQuad(precice::string_view meshName, VertexID firstVertexID, VertexID secondVertexID, VertexID thirdVertexID, VertexID fourthVertexID);
void setMeshTetrahedron(precice::string_view meshName, VertexID firstVertexID, VertexID secondVertexID, VertexID thirdVertexID, VertexID fourthVertexID);
```

There are also bulk versions of these methods, which can be easier to handle in some cases:

```cpp
void setMeshEdges(precice::string_view meshName, precice::span<const VertexID> vertices);
void setMeshTriangles(precice::string_view meshName, precice::span<const VertexID> vertices);
void setMeshQuads(precice::string_view meshName, precice::span<const VertexID> vertices);
void setMeshTetrahedra(precice::string_view meshName, precice::span<const VertexID> vertices);
```

If you do not configure any features in the preCICE configuration that require mesh connectivity, all these API functions are [no-ops](https://en.wikipedia.org/wiki/NOP_(code)). Thus, don't worry about performance. If you need a significant workload to already create this connectivity information in your adapter in the first place, you can also explicitly ask preCICE whether it is required:

```cpp
bool requiresMeshConnectivityFor(precice::string_view meshName);
```

{% warning %}
The API function `isMeshConnectivityRequired` is only supported since v2.3.
{% endwarning %}

{% warning %}
The bulk API functions are only supported from v3.
{% endwarning %}

Maybe interesting to know: preCICE actually does internally not compute with quads, but creates two triangles. [Read more](https://precice.discourse.group/t/highlights-of-the-new-precice-release-v2-1/274#2-1-using-quads-for-projection).

{% warning %}
Quads are only supported since v2.1. For older version, the methods only exist as empty stubs.
{% endwarning %}

The following code shows how mesh connectivity can be defined in our example. For sake of simplification, let's only define one triangle and let's assume that it consists of the first three vertices.

```cpp
/* ... */

// We define the unit square in 2D
std::vector<double> coords{
    0, 0, // A
    0, 1, // B
    1, 0, // C
    1, 1  // D
};
std::vector<VertexID> vertexIDs(4);
precice.setMeshVertices(meshName, coords, vertexIDs);

if (precice.requiresMeshConnectivityFor(meshName)) {

  // defines triangles ABC and BCD separately
  precice.setMeshTriangle(meshName, vertexIDs[0], vertexIDs[1], vertexIDs[2]);
  precice.setMeshTriangle(meshName, vertexIDs[1], vertexIDs[2], vertexIDs[3]);
  
  // defines triangles ABC and BCD in one go
  std::vector<VertexID> triangles{
      vertexIDs[0], vertexIDs[1], vertexIDs[2],
      vertexIDs[1], vertexIDs[2], vertexIDs[3]
  };
  precice.setMeshTriangles(meshName, triangles)
}

/* ... */
```

## Mesh pre-processing

preCICE pre-processes all provided meshes during initialization, removing duplicates and adding missing hierarchical elements.

Some projection-based features require all hierarchical elements to be present.
Meaning, a triangle ABC requires edges AB, BC and AC to exist.
Manually defining such elements is not a pleasant experience, especially when dealing with tetrahedra whilst avoiding duplicates.

This is why preCICE steps in and handles this internally.
In practise, you only need to define the connectivity your solver exposes.

## Putting it all together

Solvers may give you a range of information regarding vertices and faces.
Some may give you unique ids for vertices, some only coordinates.
In this section, we handle some common cases and how to implement them.

### Solver provides IDs

Your solver gives each vertex a unique identifier.
These identifiers are also available when iterating over faces.

In this case you can save a mapping from Solver ID to preCICE Vertex ID, after defining the vertices.
When iterating over the faces, get the vertex identifiers of defining points.
For triangular faces, these would be the 3 corner points.
Then map these Solver IDs to preCICE IDs, and use those to define your connectivity.

```cpp
Participant participant(...);

// Define the map from the solver to the preCICE vertex ID
std::map<Solver::VertexID, precice::VertexID> idMap;
for (auto& vertex: solver.vertices) {
  auto vertexID = participant.setMeshVertex("MyMesh", vertex.coords);
  // set the vertexID as label
  idMap.emplace(vertex.id, vertexID);
}

for (auto& tri: solver.triangularFaces) {
  // Lookup the preCICE vertex ID using the solver vertex ID
  auto a = idMap.at(tri.a.id);
  auto b = idMap.at(tri.b.id);
  auto c = idMap.at(tri.c.id);
  // Then define the connectivity
  participant.setMeshTriangle("MyMesh", a, b, c);
}
```

### Solver supports custom attributes

You solver doesn't provide a unique identifier for each vertex.
It does provide a functionality to attach some kind of customised attribute to a vertex.
This attribute is also available when iterating over faces.

Examples of such attributes:

* custom tags or labels: `vertex.label = myinfo` and `myinfo = vertex.label`
* custom key-value dictionaries: `vertex.attributes[mykey] = myvalue` and `myvalue = vertex.attributes[mykey]`

In this case you can save preCICE Vertex IDs as labels directly in the solver vertices.
Define the vertices using the preCICE API, then iterate over them and apply the preCICE vertex IDs as labels.
When iterating over faces, get the preCICE vertex IDs from the point labels, and use those to define your connectivity.

```cpp
Participant participant(...);

for (auto& vertex: solver.vertices) {
  auto vertexID = participant.setMeshVertex("MyMesh", vertex.coords);
  vertex.label = vertexID; // set the vertexID as label
}

for (auto& tri: solver.triangularFaces) {
  // Extract the vertex IDs from the vertex labels
  auto a = tri.a.label;
  auto b = tri.b.label;
  auto c = tri.c.label;
  // Then define the connectivity
  participant.setMeshTriangle("MyMesh", a, b, c);
}
```

### Solver supports coordinates only

Your solver provides coordinates only or labels are already used for another purpose.

In this case, you need to generate a mapping from coordinates to preCICE vertex IDs.
Depending on your solver, coordinates available at various stages may be subject to rounding error.
Hence, a C++ `std::map` without custom comparator, or python `dict` may not be sufficient.

An alternative would be to use a spatial index as a data structure to store this information.

```cpp
Participant participant(...);

IDLookup lookup;
for (auto& vertex: solver.vertices) {
  auto vid = participant.setMeshVertex("MyMesh", vertex.coords);
  lookup.insert(vertex.coords, vid);
}

for (auto& tri: solver.triangularFaces) {
  auto a = lookup.lookup(tri.a.coords);
  auto b = lookup.lookup(tri.b.coords);
  auto c = lookup.lookup(tri.c.coords);
  participant.setMeshTriangle("MyMesh", a, b, c);
}
```

The `IDLookup` class could then look as follows:

```cpp
#include <boost/geometry.hpp>
#include <cassert>

class IDLookup {
   public:
    using ID = preCICE::VertexID;
    // Point type, here 3D double in a Cartesian space
    using Point = boost::geometry::model::point<double, 3,
                                                boost::geometry::cs::cartesian>;
    // The type to be stored inside the rtree
    using Value = std::pair<Point, ID>;

    // Insert an ID at a given location
    void insert(const Point& location, ID id) {
        _tree.insert(std::make_pair(location, id));
    }

    // Lookup the ID closest to the given location
    ID lookup(const Point& location) const {
        assert(!_tree.empty());
        Value result;
        _tree.query(boost::geometry::index::nearest(location, 1), &result);
        return result.second;
    }

   private:
    boost::geometry::index::rtree<Value, boost::geometry::index::linear<32>> _tree;
};
```

In python, you could use the rtree package:

```py
import rtree

participant = precice.Participant(...)

index = rtree.index.Index()
for vertex in solver.vertices:
  vid = participant.set_mesh_vertex("MyMesh", vertex.coords)
  index.insert(vid, vertex.coords)

for tri in solver.triangularFaces:
  a = index.nearest(tri.a.coords)
  b = index.nearest(tri.b.coords)
  c = index.nearest(tri.c.coords)
  participant.set_mesh_triangle("MyMesh", a, b, c)
```
