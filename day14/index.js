var _a, _b;
var data = (await Bun.file("input.txt").text()).split("\n");
var numberPattern = /-?\d+/g;
var robots = [];
var spaceX = 101;
var spaceY = 103;
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var row = data_1[_i];
    var numbers = (_a = row.match(numberPattern)) === null || _a === void 0 ? void 0 : _a.map(function (x) { return parseInt(x); });
    if (!numbers) {
        console.error("bad line");
        break;
    }
    robots.push({ "x": numbers[0], "y": numbers[1], "vx": numbers[2], "vy": numbers[3] });
}
for (var i_1 = 0; i_1 < 100; i_1++) {
    for (var _c = 0, robots_1 = robots; _c < robots_1.length; _c++) {
        var robot = robots_1[_c];
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
    }
}
var topLeft = 0;
var topRight = 0;
var bottomLeft = 0;
var bottomRight = 0;
for (var _d = 0, robots_2 = robots; _d < robots_2.length; _d++) {
    var robot = robots_2[_d];
    if (robot.x < Math.floor(spaceX / 2)) {
        if (robot.y < Math.floor(spaceY / 2)) {
            topLeft++;
        }
        else if (robot.y > Math.floor(spaceY / 2)) {
            topRight++;
        }
    }
    else if (robot.x > Math.floor(spaceX / 2)) {
        if (robot.y < Math.floor(spaceY / 2)) {
            bottomLeft++;
        }
        else if (robot.y > Math.floor(spaceY / 2)) {
            bottomRight++;
        }
    }
}
console.log("p1 res = " + (bottomLeft * bottomRight * topLeft * topRight));
// console.log(robots)
robots = [];
for (var _e = 0, data_2 = data; _e < data_2.length; _e++) {
    var row = data_2[_e];
    var numbers = (_b = row.match(numberPattern)) === null || _b === void 0 ? void 0 : _b.map(function (x) { return parseInt(x); });
    if (!numbers) {
        console.error("bad line");
        break;
    }
    robots.push({ "x": numbers[0], "y": numbers[1], "vx": numbers[2], "vy": numbers[3] });
}
function create2DArray(rows, cols, fillValue) {
    if (fillValue === void 0) { fillValue = " "; }
    return Array.from({ length: rows }, function () { return Array(cols).fill(fillValue); });
}
var i = 0;
// for(i = 0; i < 30; i++) {
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
for (; i < 400; i++) {
    var arr = create2DArray(spaceX, spaceY, " ");
    for (var _f = 0, robots_3 = robots; _f < robots_3.length; _f++) {
        var robot = robots_3[_f];
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
    console.log("\nnum = ".concat(i + 1, "\n") + arr.map(function (x) { return x.join(""); }).join("\n") + "\n");
    await Bun.sleep(1000);
}
