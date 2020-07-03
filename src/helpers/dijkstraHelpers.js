// get the unvisited neighboring nodes for the node being analyzed
const getUnvisitedNeighbors = (node, grid) => {
	const neighbors = [];

	const { col, row } = node;

	if (row > 0) neighbors.push(grid[row - 1][col]); // add the node above
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // add the node to the right
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // add the node below
	if (col > 0) neighbors.push(grid[row][col - 1]); // add the node to the left

	neighbors.filter(neighbor => !neighbor.isVisited); // ensure the node has not been visited before

	return neighbors;
}

// establish the neighbors for the new node being analyzed by changing distance from infinity to 0
const updateUnvisitedNeighbors = (node, grid) => {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = node.distance + 1;
		neighbor.previousNode = node;
	}
}

// sort nodes by distance so that the neighboring nodes are at the beginning of the array
const sortNodesByDistance = unvisitedNodes => {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// loops through the grid array and removes the nested layers of the nodes
const removeNestedNodes = grid => {
	const nodes = [];

	for (const row of grid) {
		for (const node of row) {
			nodes.push(node);
		}
	}

	return nodes;
}

export default function dijkstra(grid, startNode, finishNode) {
	const visitedNodesInOrder = [];
	startNode.distance = 0;
	const unvisitedNodes = removeNestedNodes(grid);

	while (unvisitedNodes.length > 0) { // while there are still unvisited nodes...
		sortNodesByDistance(unvisitedNodes);
		const closestNode = unvisitedNodes.shift() // remove the first node in the array (i.e. one of the neighbors)

		if (closestNode.isWall) continue;

		// if the start node is completely surrounded by walls, we can't find any more neighbors (where distance isn't infinity) and are therefore stuck
		if (closestNode.distance === Infinity) return visitedNodesInOrder;

		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);

		if(closestNode === finishNode) return visitedNodesInOrder; // algorithm complete, finished node has been found
		updateUnvisitedNeighbors(closestNode, grid);
	}
}

// grid = Array
// startNode = Object
// finishNode Object