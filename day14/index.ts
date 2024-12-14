const data = (await Bun.file("input.txt").text()).split("\n")

type Robot = {
    "x": number,
    "y": number,
    "vx": number,
    "vy": number,
}
var numberPattern = /-?\d+/g;

let robots: Robot[] = [];

const spaceX = 101;
const spaceY = 103;

for(const row of data) {
    let numbers = row.match(numberPattern)?.map(x => parseInt(x))
    if (!numbers) {
        console.error("bad line")
        break;
    }
    robots.push({"x": numbers[0], "y": numbers[1], "vx": numbers[2], "vy": numbers[3]})
}


// for(let i = 0; i < 100; i++) {
//     for(const robot of robots) {
//         robot.x = (robot.x + robot.vx);
//         robot.y = (robot.y + robot.vy);
//         if (robot.x < 0) {
//             robot.x += spaceX;
//         }
//         if (robot.y < 0) {
//             robot.y += spaceY;
//         }
//         robot.x %= spaceX;
//         robot.y %= spaceY;
//     }
// }

let topLeft = 0;
let topRight = 0;
let bottomLeft = 0;
let bottomRight = 0;

for(const robot of robots) {
    if(robot.x < Math.floor(spaceX / 2)) {
        if (robot.y < Math.floor(spaceY / 2)) {
            topLeft++;
        } else if (robot.y > Math.floor(spaceY / 2)) {
            topRight++;
        }
    } else if (robot.x > Math.floor(spaceX / 2)) {
        if (robot.y < Math.floor(spaceY / 2)) {
            bottomLeft++;
        } else if (robot.y > Math.floor(spaceY / 2)) {
            bottomRight++;
        }
    }
}

console.log("p1 res = " + (bottomLeft*bottomRight*topLeft*topRight))

// console.log(robots)


robots = [];

for(const row of data) {
    let numbers = row.match(numberPattern)?.map(x => parseInt(x))
    if (!numbers) {
        console.error("bad line")
        break;
    }
    robots.push({"x": numbers[0], "y": numbers[1], "vx": numbers[2], "vy": numbers[3]})
}

function create2DArray(rows: number, cols: number, fillValue = " ") {
  return Array.from({ length: rows }, () => Array(cols).fill(fillValue));
}
let i = 0;
// for(i = 0; i < 340; i++) {
//     for(const robot of robots) {
//         robot.x = (robot.x + robot.vx);
//         robot.y = (robot.y + robot.vy);
//         if (robot.x < 0) {
//             robot.x += spaceX;
//         }
//         if (robot.y < 0) {
//             robot.y += spaceY;
//         }
//         robot.x %= spaceX;
//         robot.y %= spaceY;
//     }
// }

for(; i < 8000; i++) {
    const arr = create2DArray(spaceX, spaceY, " ");
    for(const robot of robots) {
        robot.x = (robot.x + robot.vx);
        robot.y = (robot.y + robot.vy);
        if (robot.x < 0) {
            robot.x += spaceX;
        }
        if (robot.y < 0) {
            robot.y += spaceY;
        }
        robot.x %= spaceX;
        robot.y %= spaceY;
        arr[robot.x][robot.y] = "#";
    }
    if((i+1 - (103 - 70)) % 103 == 0) {

        console.log(`\nnum = ${i + 1}\n` + arr.map(x => x.join("")).join("\n") + "\n");
        await Bun.sleep(1000);
    }
    // console.log(`\nnum = ${i + 1}\n` + arr.map(x => x.join("")).join("\n") + "\n");
    // await Bun.sleep(1000);
}