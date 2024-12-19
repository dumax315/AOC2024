import { Heap } from "heap-js";

const data = (await Bun.file("input.txt").text())
    .split("\n")
    .map((x) => x.split(",").map((x) => parseInt(x)) as [number, number]);

const spotsYouCantGo = new Set<string>();

console.log(data.length);
for (const spot of data.slice(0, 1024)) {
    spotsYouCantGo.add(JSON.stringify(spot));
}

const width = 71;

type Node = {
    row: number;
    col: number;
};

type NodeWithPriority = {
    node: Node;
    priority: number;
};

const customPriorityComparator = (a: NodeWithPriority, b: NodeWithPriority) =>
    a.priority - b.priority;

let nodesSearched = 0;

for (const spot of data.slice(1024, data.length)) {
    spotsYouCantGo.add(JSON.stringify(spot));
    const minHeap = new Heap<NodeWithPriority>(customPriorityComparator);

    const visited = new Set<string>();

    minHeap.add({ node: { row: 0, col: 0 }, priority: 0 });
    let foundPath = false;
    while (minHeap.size() > 0) {
        nodesSearched++;
        if (nodesSearched % 100000 == 0) {
            console.log(`nodes searched = ${nodesSearched}`);
        }
        const curNode = minHeap.poll();
        // console.log(curNode)
        if (!curNode) {
            throw new Error("min heap was empty");
        }
        // console.log(data[curNode.node.row][curNode.node.col])
        if (visited.has(JSON.stringify(curNode.node))) {
            continue;
        }
        if (
            spotsYouCantGo.has(
                JSON.stringify([curNode.node.col, curNode.node.row])
            )
        ) {
            // console.log("hit")
            continue;
        }
        if (curNode.node.col === width - 1 && curNode.node.row === width - 1) {
            console.log(curNode.priority);
            foundPath = true;
            break;
        }
        visited.add(JSON.stringify(curNode.node));
        if (curNode.node.col - 1 >= 0) {
            minHeap.add({
                node: { row: curNode.node.row, col: curNode.node.col - 1 },
                priority: curNode.priority + 1,
            });
        }
        if (curNode.node.col + 1 < width) {
            minHeap.add({
                node: { row: curNode.node.row, col: curNode.node.col + 1 },
                priority: curNode.priority + 1,
            });
        }
        if (curNode.node.row + 1 < width) {
            minHeap.add({
                node: { row: curNode.node.row + 1, col: curNode.node.col },
                priority: curNode.priority + 1,
            });
        }
        if (curNode.node.row - 1 >= 0) {
            minHeap.add({
                node: { row: curNode.node.row - 1, col: curNode.node.col },
                priority: curNode.priority + 1,
            });
        }
    }

    if(foundPath === false) {
        console.log(spot)
    }
}
