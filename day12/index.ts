const data = (await Bun.file("input.txt").text()).split("\n").map(x =>
    x.split(""))

const visited = new Array<number[]>(data.length)

for (let i = 0; i < visited.length; i ++) {
    visited[i] = new Array<number>();
    for (let j = 0; j < data[0].length; j++) {
        visited[i].push(0)
    }
}

const floodFill = (row: number, col: number, value: string, data: string[][], visited: number[][]): [number, number] => {
    if (row < 0 || row >= data.length || col < 0 || col >= data[0].length || data[row][col] !== value) {
        return [0, 0]
    }
    if ( visited[row][col] > 0) {
        return [-1, 0]
    }

    visited[row][col] = 1;
    let area = 1;
    let per = 0;
    let adj: [number, number][] = [];
    adj.push(floodFill(row + 1, col, value, data, visited));
    adj.push(floodFill(row - 1, col, value, data, visited));
    adj.push(floodFill(row, col + 1, value, data, visited));
    adj.push(floodFill(row, col - 1, value, data, visited));
    // console.log(adj)
    for (const a of adj) {
        if (a[0] === 0) {
            per++;
        } else if (a[0] > 0) {
            area += a[0];
            per += a[1];
        }
    }
    return [area, per];
}

let res = 0;

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        if(visited[row][col] === 0) {
            let [area, per] = floodFill(row, col, data[row][col], data, visited);
            console.log(`area = ${area} per = ${per}`)
            console.log(`row = ${row} col = ${col}`)
            res += area * per;
        }
    }
}

console.log(`res 1 = ${res}`)