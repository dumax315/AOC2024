import { Heap } from 'heap-js';

const data = (await Bun.file("input.txt").text()).split("\n").map(x => x.split(""));

type Node = {
    "row": number,
    "col": number,
    "dir": string,
}

type NodeWithPriority = {
    "node": Node,
    "priority": number,
}

const customPriorityComparator = (a:NodeWithPriority, b:NodeWithPriority) => a.priority - b.priority;

const minHeap = new Heap<NodeWithPriority>(customPriorityComparator);

const visited = new Set<string>();

minHeap.add({"node": {"row": data.length - 2, "col": 1, "dir": "E"},"priority": 0});

let nodesSearched = 0;

while(minHeap.size() > 0) {
    nodesSearched++;
    if (nodesSearched % 100000 == 0) {
        console.log(`nodes searched = ${nodesSearched}`)
    }
    const curNode = minHeap.poll();
    // console.log(curNode)
    if(!curNode) {
        throw new Error("min heap was empty")
    }
    // console.log(data[curNode.node.row][curNode.node.col])
    if(visited.has(JSON.stringify(curNode.node))) {
        continue;
    }
    if (curNode.node.col === data[0].length - 2 && curNode.node.row === 1) {
        console.log(curNode.priority);
        // break;
    }
    visited.add(JSON.stringify(curNode.node));
    for(const dir of ["N", "W", "E", "S"]) {
        if (dir !== curNode.node.dir) {
            minHeap.add({"node": {"row": curNode.node.row, "col": curNode.node.col, "dir": dir},"priority": curNode.priority + 1000});
        }
    }
    if (curNode.node.dir == "W") {
        if(data[curNode.node.row][curNode.node.col - 1] !== "#") {
            minHeap.add({"node": {"row": curNode.node.row, "col": curNode.node.col - 1, "dir": curNode.node.dir}, "priority": curNode.priority + 1});
        }
    } else if (curNode.node.dir == "E") {
        if(data[curNode.node.row][curNode.node.col + 1] !== "#") {
            minHeap.add({"node": {"row": curNode.node.row, "col": curNode.node.col + 1, "dir": curNode.node.dir}, "priority": curNode.priority + 1});
        }
    } else if (curNode.node.dir == "S") {
        if(data[curNode.node.row + 1][curNode.node.col] !== "#") {
            minHeap.add({"node": {"row": curNode.node.row + 1, "col": curNode.node.col, "dir": curNode.node.dir}, "priority": curNode.priority + 1});
        }
    }else if (curNode.node.dir == "N") {
        if(data[curNode.node.row - 1][curNode.node.col] !== "#") {
            minHeap.add({"node": {"row": curNode.node.row - 1, "col": curNode.node.col, "dir": curNode.node.dir}, "priority": curNode.priority + 1});
        }
    }
}