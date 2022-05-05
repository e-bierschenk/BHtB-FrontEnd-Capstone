import { netlifyConfig } from "../helpers/apiKeys"

console.log('big up big up its a stickup stick up')

class GraphNode {
    constructor(value) {
        this.value = value
        this.edges = []
        this.searched = false
        this.parent = null
    }

    addEdge(neighbor) {
        //edges in this problem are bi-directional, so we add edges on both sides.
        this.edges.push(neighbor)
        neighbor.edges.push(this)
    }
}

class Graph {
    constructor() {
        this.graph = {}
        this.start = null
        this.end = null
    }

    addNode(n) {
        const title = n.value //title or name is stored in a graphnodes value
        this.graph[title] = n //this sets graph."Kevin Bacon" = to Kevin bacon's node
    }

    getNode(actor) {
        const n = this.graph[actor]
        return n
    }

    setStart(actor) {
        this.start = this.graph[actor]
        return this.start
    }

    setEnd(actor) {
        this.end = this.graph[actor]
        return this.end
    }
}

export const bfs = (startName, endName = "Kevin Bacon") => {
    const graph = new Graph()
    const path = []

    return fetch(`${netlifyConfig.baconUrl}/movies`)
        .then(response => response.json())
        .then(data => {
            console.log(startName, endName)
            const movies = data

            for (const movie of movies) {
                const movieNode = new GraphNode(movie.title)
                if (startName.title === movie.title.split(" (")[0] && parseInt(startName.year) === parseInt(movie.year)) {
                    startName = movie.title
                }
                graph.addNode(movieNode)

                for (const actor of movie.cast) {
                    let cleaned = actor.replace("[[", "")
                    cleaned = cleaned.replace("]]", "")
                    cleaned = cleaned.split("|")
                    cleaned = cleaned[cleaned.length - 1]

                    let actorNode = graph.getNode(cleaned)
                    if (!actorNode) {
                        actorNode = new GraphNode(cleaned)
                    }
                    graph.addNode(actorNode)
                    movieNode.addEdge(actorNode)
                }
            }

            const startNode = graph.setStart(startName)  //set the starting node and end nodes
            const endNode = graph.setEnd(endName)

            const queue = []                    //initializing the queue

            startNode.searched = true
            queue.push(startNode)
            while (queue.length > 0) {         //while the queue is not empty, search
                const currentNode = queue.shift()  //remove the first element from the queue array
                if (currentNode === endNode) {
                    console.log("Found!", currentNode)
                    break
                }
                const edges = currentNode.edges
                for (const edge of edges) {
                    if (!edge.searched) {           //if the node has not yet been searched, 
                        edge.searched = true        //we set it to searched, 
                        queue.push(edge)            //then set its parent so we know how we got there,
                        edge.parent = currentNode   //and finally add it to the queue.  These steps are repeated until we find KB
                    }
                }
            }

            path.push(endNode)
            let next = endNode.parent
            while (next) {
                path.push(next)
                next = next.parent
            }
            return (path.reverse())
        })
}
