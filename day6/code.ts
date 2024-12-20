const data = (await Bun.file("input.txt").text())
    .split("\n")
    .map((x) => x.split(""));
// console.log(data.map((x) => x.join("")).join("\n"));

function getStart(data: string[][]): [number, number] {
    let x = 0;
    let y = 0;
    for (const row of data) {
        for (const col of row) {
            if (col == "^") {
                return [x, y] as const;
            }
            x++;
        }
        y++;
        x = 0;
    }
    throw new Error("didn't find start");
}

function checkPath(
    data: string[][],
    row: number,
    col: number,
    skipFinalCount = false
): [boolean, number] {
    const alreadyVisited: number[][] = new Array<number[]>();
    for (let i = 0; i < data.length; i++) {
        alreadyVisited.push(new Array<number>());
        for (let j = 0; j < data[0].length; j++) {
            alreadyVisited[i].push(0);
        }
    }
    let direction = 8;

    // using bitmasks for directions to store up = 8, down = 4, left = 2, and right = 1
    let skipNextCheck = false;
    let loop = false;
    while (true) {
        if (
            !skipNextCheck &&
            (alreadyVisited[row][col] | direction) === alreadyVisited[row][col]
        ) {
            loop = true;
            break;
        }
        skipNextCheck = false;
        // data[row][col] = "^"
        // console.log(data.map(x => x.join("")).join("\n"));
        // data[row][col] = "."
        // console.log(`row = ${row} col = ${col} dir = ${direction}`)
        // console.log(alreadyVisited.map(x => x.map(x => x > 0? "G":".").join("")).join("\n"));
        // console.log((alreadyVisited[row][col] | direction)=== alreadyVisited[row][col])
        alreadyVisited[row][col] = alreadyVisited[row][col] | direction;
        if (direction == 8) {
            if (row == 0) {
                break;
            }
            if (data[row - 1][col] === "#") {
                direction = 4;
                skipNextCheck = true;
            } else {
                row--;
            }
        } else if (direction == 4) {
            if (col >= data[0].length - 1) {
                break;
            }
            if (data[row][col + 1] === "#") {
                direction = 2;
                skipNextCheck = true;
            } else {
                col++;
            }
        } else if (direction == 2) {
            if (row >= data.length - 1) {
                break;
            }
            if (data[row + 1][col] === "#") {
                direction = 1;
                skipNextCheck = true;
            } else {
                row += 1;
            }
        } else if (direction == 1) {
            if (col < 1) {
                break;
            }
            if (data[row][col - 1] === "#") {
                direction = 8;
                skipNextCheck = true;
            } else {
                col -= 1;
            }
        }
    }

    if (skipFinalCount) {
        return [loop, -1];
    }

    let res = 0;
    for (const row of alreadyVisited) {
        for (const col of row) {
            if (col > 0) {
                res++;
            }
        }
    }

    return [loop, res];
}

let [stcol, strow] = getStart(data);

let trueRes = 0;

let progress = 0;

for (let newRow = 0; newRow < data.length; newRow++) {
    for (let newCol = 0; newCol < data[0].length; newCol++) {
        progress++;
        if (progress % 200 == 0) {
            console.log(`progress = ${progress} / ${data.length * data[0].length} (${(progress/(data.length*data[0].length)).toFixed(2)}%)`);
        }
        if (data[newRow][newCol] == "#" || data[newRow][newCol] == "^") {
            continue;
        }
        let row = strow;
        let col = stcol;
        data[newRow][newCol] = "#";
        if (checkPath(data, row, col, true)[0]) {
            trueRes++;
        }
        data[newRow][newCol] = ".";
    }
}

// console.log(alreadyVisited.map(x => x.map(x => x > 0 ? "G" : ".").join("")).join("\n"));
console.log(`part 1 result = ${checkPath(data, strow, stcol)[1]}`);
console.log(`part 2 result = ${trueRes}`);
