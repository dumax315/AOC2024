const data = (await Bun.file("input.txt").text())
    .split("\n")

let res = 0;

const rCheckNums = (nums: number[], pos: number, prod: number, goal: number): boolean => {
    if (pos >= nums.length) {
        return prod === goal;
    }
    if(prod > goal) {
        return false;
    }
    const addRes = rCheckNums(nums, pos + 1, prod + nums[pos], goal);
    if (addRes) {
        return true;
    }
    const prodRes = rCheckNums(nums, pos + 1, prod * nums[pos], goal);
    if (prodRes) {
        return true;
    }
    const concatRes = rCheckNums(nums, pos + 1, parseInt(prod.toString() + nums[pos]), goal);
    return concatRes;
} 

for (const line of data) {
    const splitLine = line.split(":");
    let prod = parseInt(splitLine[0]);

    let nums = splitLine[1].trim().split(" ");

    res += rCheckNums(nums.map(x => parseInt(x)), 1, parseInt(nums[0]), prod) ? prod : 0;
}


console.log(`res = ${res}`)