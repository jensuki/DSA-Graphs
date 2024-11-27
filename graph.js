class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (v1.adjacent.has(v2)) {
      v1.adjacent.delete(v2);
    }
    if (v2.adjacent.has(v2)) {
      v2.adjacent.delete(v1);
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // first remove the vertex from adjacency lists of all its neighbors
    for (let neighbor of vertex.adjacent) {
      // remove this vertex from each neighbors adjacency set
      neighbor.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen = new Set(), result = []) {
    // mark current 'start' node as visited
    seen.add(start);
    result.push(start.value); // add it to result array

    // recursively visit all unvisited neighbors
    for (let neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        this.depthFirstSearch(neighbor, seen, result);
      }
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    let result = []; // array to store order of visited node values

    while (toVisitQueue.length) {
      // dequeue first node
      let currNode = toVisitQueue.shift();

      // process current node ( add its value to the result array)
      result.push(currNode.value);

      // visit rest of adjacent nodes
      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
        }
      }
    }
    return result; // return BFS traversal order
  }
}

module.exports = { Graph, Node }