const data = (await Bun.file("input.txt").text()).split("\n").map(x => 
    x.split("").map(x => parseInt(x)))
// console.log(data.map(x => x.join("")).join("\n"))

const findPaths = (data: number[][], row: number, col: number, lastNum: number): number => {
    if (row < 0 || row >= data.length || col < 0 || col >= data[0].length) {
        return 0;
    }
    if (lastNum === 8) {
        return data[row][col] === 9 ? 1 : 0;
    }
    if (data[row][col] - 1 == lastNum) {
        let sum = 0;
        sum += findPaths(data, row + 1, col, data[row][col]);
        sum += findPaths(data, row - 1, col, data[row][col]);
        sum += findPaths(data, row, col + 1, data[row][col]);
        sum += findPaths(data, row, col - 1, data[row][col]);
        return sum;
    }
    return 0;
}

let res = 0;

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        if (data[row][col] === 0) {
            let sum = 0;
            sum += findPaths(data, row + 1, col, 0);   
            sum += findPaths(data, row - 1, col, 0);   
            sum += findPaths(data, row, col + 1, 0);   
            sum += findPaths(data, row, col - 1, 0);
            console.log(`row = ${row} col = ${col} sum = ${sum}`)
            res += sum;
        }
    }
}

console.log(`p1 res = ${res}`)
