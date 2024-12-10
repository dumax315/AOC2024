const data = (await Bun.file("input.txt").text())
    .split("\n").map(x => x.split(""))

const res = new Array<number[]>(data.length)

for (let i = 0; i < res.length; i ++) {
    res[i] = new Array<number>();
    for (let j = 0; j < data[0].length; j++) {
        res[i].push(0)
    }
}

const checkedFrq = new Map<string, [number, number][]>();

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        if (data[row][col] !== ".") {
            if(!checkedFrq.has(data[row][col])) {
                checkedFrq.set(data[row][col], [[row, col]]);
            } else {
                for (const pos of checkedFrq.get(data[row][col])!) {
                    // weird that i need a ! and a ?
                    const deltaRow = Math.abs(pos[0] - row);
                    const deltaCol = Math.abs(pos[1] - col);
                    if (pos[1] < col) {
                        if (pos[0] - deltaRow >= 0 && pos[1] - deltaCol >= 0) {
                            res[pos[0] - deltaRow][pos[1] - deltaCol] = 1;
                        }
                        if (row + deltaRow < data.length && col + deltaCol < data[0].length) {
                            res[row + deltaRow][col + deltaCol] = 1;
                        }
                    } else {
                        if (pos[0] - deltaRow >= 0 && pos[1] + deltaCol < data[0].length) {
                            res[pos[0] - deltaRow][pos[1] + deltaCol] = 1;
                        }
                        if (row + deltaRow < data.length && col - deltaCol >= 0) {
                            res[row + deltaRow][col - deltaCol] = 1;
                        }
                    }
                }
                checkedFrq.get(data[row][col])?.push([row, col])
            }
        }
    }
}

const res2 = new Array<number[]>(data.length)

for (let i = 0; i < res2.length; i ++) {
    res2[i] = new Array<number>();
    for (let j = 0; j < data[0].length; j++) {
        res2[i].push(0)
    }
}

const checkedFrqP2 = new Map<string, [number, number][]>();

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        if (data[row][col] !== ".") {
            if(!checkedFrqP2.has(data[row][col])) {
                checkedFrqP2.set(data[row][col], [[row, col]]);
            } else {
                for (const pos of checkedFrqP2.get(data[row][col])!) {
                    // weird that i need a ! and a ?
                    const deltaRow = Math.abs(pos[0] - row);
                    const deltaCol = Math.abs(pos[1] - col);
                    if (pos[1] < col) {
                        let r = pos[0];
                        let c = pos[1];
                        while (r >= 0 && c >= 0) {
                            res2[r][c] = 1;
                            r -= deltaRow
                            c -= deltaCol;
                        }
                        r = row;
                        c = col;
                        while (r < data.length && c < data[0].length) {
                            res2[r][c] = 1;
                            r += deltaRow;
                            c += deltaCol;
                        }
                    } else {
                        let r = pos[0];
                        let c = pos[1];
                        while (r >= 0 && c < data[0].length) {
                            res2[r][c] = 1;
                            r -= deltaRow;
                            c += deltaCol;
                        }
                        r = row;
                        c = col;
                        while (r < data.length && c >= 0) {
                            res2[r][c] = 1;
                            r += deltaRow;
                            c -= deltaCol;
                        }
                    }
                }
                checkedFrqP2.get(data[row][col])?.push([row, col])
            }
        }
    }
}

console.log(checkedFrqP2)

// for (const [k, v] of checkedFrqP2.entries()) {
//     console.log(v.length)
//     if (v.length > 1) {
//         for (const pos of v) {
//             // console.log(res2[pos[0]][pos[1]])
//             res2[pos[0]][pos[1]] = 1
//         }
//     }
// }

let trueRes = 0;
for (const row of res2) {
    for (const col of row) {
        if (col == 1) {
            trueRes++;
        }
    }
}

console.log(res2.map(x => x.join("")).join("\n"))
// console.log(checkedFrq)
console.log(`res = ${trueRes}`)
