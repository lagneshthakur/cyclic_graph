console.log('Hello youtube!')

// Class to store our graph

class Graph {
    constructor() {
        this.adjacencyList = {

        };
    }

    addVertex(vertex) {
        this.adjacencyList[vertex] = {
            connections: [],
            visited: false
        }
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].connections.push(vertex2);
        this.adjacencyList[vertex2].connections.push(vertex1);
    }

    detectCycle() {
        // We have to iterate on each vertex
        let vertices = Object.keys(this.adjacencyList);
        for (let index = 0; index < vertices.length; index++) {
            const vertex = vertices[index];
            const vertexNode = this.adjacencyList[vertex];
            if(!vertexNode.visited) {
                if(this.dfsForCycle(vertex, vertexNode, -1)) {
                    return true;
                }                
            }
        }
        return false;
    }

    dfsForCycle(vertex, vertexNode, parent) {
        vertexNode.visited = true
        // Iterate on vertex neighbours using DFS
        for (let index = 0; index < vertexNode.connections.length; index++) {
            const neighbour = vertexNode.connections[index];
            const neighbourNode = this.adjacencyList[neighbour];
            if(!neighbourNode.visited) {
                let cycleInNeighbor = this.dfsForCycle(neighbour, neighbourNode, vertex);
                if(cycleInNeighbor) {
                    return true;
                }
            }
            // If the neighbour is already visited and not parent, cycle is found
            else if(neighbour != parent) {
                return true;
            }
        }
    }
}

let myGraph = new Graph();
myGraph.addVertex('A');
myGraph.addVertex('B');
myGraph.addVertex('C');
myGraph.addVertex('D');

myGraph.addEdge('A', 'B');
myGraph.addEdge('B', 'C');
myGraph.addEdge('C', 'D');
myGraph.addEdge('A', 'C');

if(myGraph.detectCycle()) {
    console.log('Cycle found');
} else {
    console.log('Cycle not found');
}
