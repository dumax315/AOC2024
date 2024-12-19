const data = (await Bun.file("input.txt").text()).split("\n\n");

const map = data[0].split("\n").map(x => x.split(""));

const moves = data[1].split("\n").join("").split("");

console.log(moves)

const getStart = (map: string[][]): {"row": number, "col": number} => {
    for(let row = 0; row < map.length; row++) {
        for(let col = 0; col < map[0].length; col++) {
            if(map[row][col] === "@") {
                return {"row": row, "col": col}
            }
        }
    }
    throw new Error("could not find start")
}

let pos = getStart(map);
console.log(map);

for(const move of moves) {
    if(move == "^") {
        let rowOffset = 1;
        while(map[pos.row - rowOffset][pos.col] === "O") {
            rowOffset++;
        }
        if(map[pos.row - rowOffset][pos.col] !== "#") {
            map[pos.row][pos.col] = " ";
            map[pos.row - rowOffset][pos.col] = "O";
            map[pos.row - 1][pos.col] = "@";
            pos.row -= 1;
        }
    }
    else if(move == "v") {
        let rowOffset = 1;
        while(map[pos.row + rowOffset][pos.col] === "O") {
            rowOffset++;
        }
        if(map[pos.row + rowOffset][pos.col] !== "#") {
            map[pos.row][pos.col] = " ";
            map[pos.row + rowOffset][pos.col] = "O";
            map[pos.row + 1][pos.col] = "@";
            pos.row += 1;
        }
    }
    else if(move == "<") {
        let colOffset = 1;
        while(map[pos.row][pos.col - colOffset] === "O") {
            colOffset++;
        }
        if(map[pos.row][pos.col - colOffset] !== "#") {
            map[pos.row][pos.col] = " ";
            map[pos.row][pos.col - colOffset] = "O";
            map[pos.row][pos.col - 1] = "@";
            pos.col -= 1;
        }
    }
    else if(move == ">") {
        let colOffset = 1;
        while(map[pos.row][pos.col + colOffset] === "O") {
            colOffset++;
        }
        if(map[pos.row][pos.col + colOffset] !== "#") {
            map[pos.row][pos.col] = " ";
            map[pos.row][pos.col + colOffset] = "O";
            map[pos.row][pos.col + 1] = "@";
            pos.col += 1;
        }
    }
    // console.log(move)
    // console.log(map.map(x => x.join("")).join("\n"))
}

let res = 0;

for(let row = 0; row < map.length; row++) {
    for(let col = 0; col < map[0].length; col++) {
        if(map[row][col] == "O") {
            res += row * 100 + col
        }
    }
}


console.log(`res p1 = ${res}`)