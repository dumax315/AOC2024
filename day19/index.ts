const data = (await Bun.file("input.txt").text()).split("\n\n");

const towels = data[0].split(", ");

const patterns = data[1].split("\n");

const isValidPattern = (pattern: string, position: number): boolean => {
    if (pattern.length === position) {
        return true;
    }
    if (pattern.length < position) {
        return false;
    }
    for (const towel of towels) {
        if (
            pattern.length >= position + towel.length &&
            pattern.slice(position, position + towel.length) === towel &&
            isValidPattern(pattern, position + towel.length)
        ) {
            return true;
        }
    }
    return false;
};

let res = 0;
for (const pattern of patterns) {
    if (isValidPattern(pattern, 0)) {
        res++;
    }
}

console.log(`res p1 = ${res}`);



const numberOfWaysToMakePattern = (pattern: string, position: number, dp: {[key: number]: number}): number => {
    if(position in dp) {
        return dp[position];
    }
    if (pattern.length === position) {
        dp[position] = 1;
        return 1;
    }
    if (pattern.length < position) {
        dp[position] = 0;
        return 0;
    }
    let numPatterns = 0;
    for (const towel of towels) {
        if (
            pattern.length >= position + towel.length &&
            pattern.slice(position, position + towel.length) === towel
        ) {
            numPatterns += numberOfWaysToMakePattern(pattern, position + towel.length, dp);
        }
    }
    dp[position] = numPatterns;
    return numPatterns;
};

let res2 = 0;
for (const pattern of patterns) {
    const dp: {[key: number]: number} = {};
    res2 += numberOfWaysToMakePattern(pattern, 0, dp);
}

console.log(`res p2 = ${res2}`);