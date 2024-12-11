const data = (await Bun.file("input.txt").text()).split("\n").map(x => 
    x.split("").map(x => parseInt(x)))
// console.log(data.map(x => x.join("")).join("\n"))

const findPaths = (data: number[][], row: number, col: number, lastNum: number, found: Set<string>) => {
    if (row < 0 || row >= data.length || col < 0 || col >= data[0].length) {
        return;
    }
    if (lastNum === 8) {
        if(data[row][col] === 9) {
            found.add(`${row},${col}`)
        }
        return;
    }
    if (data[row][col] - 1 == lastNum) {
        findPaths(data, row + 1, col, data[row][col], found);
        findPaths(data, row - 1, col, data[row][col], found);
        findPaths(data, row, col + 1, data[row][col], found);
        findPaths(data, row, col - 1, data[row][col], found);
    }
    return;
}

let res = 0;

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        if (data[row][col] === 0) {
            let sum = new Set<string>();
            findPaths(data, row + 1, col, 0, sum);
            findPaths(data, row - 1, col, 0, sum);
            findPaths(data, row, col + 1, 0, sum);
            findPaths(data, row, col - 1, 0, sum);
            console.log(`row = ${row} col = ${col} sum = ${[...sum]}`)
            res += sum.size;
        }
    }
}

console.log(`p1 res = ${res}`)
