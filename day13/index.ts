const data = (await Bun.file("input.txt").text()).split("\n");

const claws: {
    A: [number, number];
    B: [number, number];
    Goal: [number, number];
}[] = [];

var numberPattern = /\d+/g;

for (let i = 0; i < data.length; i += 4) {
    claws.push({
        A: data[i].match(numberPattern)?.map(x => parseInt(x)) as [number, number],
        B: data[i + 1].match(numberPattern)?.map(x => parseInt(x)) as [number, number],
        Goal: data[i + 2].match(numberPattern)?.map(x => parseInt(x)) as [number, number],
    });
}

let tokensUsed = 0;

for (const claw of claws) {
    let Bs = 100;
    let As = 0;
    let minTokens = 400;

    while (Bs >= 0) {
        let resX = claw.A[0] * As + claw.B[0] * Bs;
        let resY = claw.A[1] * As + claw.B[1] * Bs;
        while (resX < claw.Goal[0] && resY < claw.Goal[1] && As < 101) {
            As++;
            resX = claw.A[0] * As + claw.B[0] * Bs;
            resY = claw.A[1] * As + claw.B[1] * Bs;
        }
        if (resX === claw.Goal[0] && resY === claw.Goal[1] && As < 101) {
            minTokens = Math.min(minTokens, As * 3 + Bs * 1);
        }
        Bs--;
        As = 0;
    }

    if (minTokens !== 400) {
        console.log(minTokens);
        tokensUsed += minTokens
    }
}

console.log("p1 tokens used = " + tokensUsed);

let tokensUsedP2 = 0;

for (const claw of claws) {
    // a*claw.A[0] + b*claw.B[0] == claw.Goal[0];
    // a*claw.A[0] == claw.Goal[0] - b*claw.B[0];
    // a = (claw.Goal[0] - b*claw.B[0]) / claw.A[0];

    // a*claw.A[1] + b*claw.B[1] == claw.Goal[1];
    // ((claw.Goal[0] - b*claw.B[0]) / claw.A[0]) * claw.A[1] + b*claw.B[1] == claw.Goal[1];
    // - b * claw.B[0] * (claw.A[1] / claw.A[0]) + b*claw.B[1] == claw.Goal[1];
    // - b * claw.B[0] * (claw.A[1] / claw.A[0]) + b*claw.B[1] == claw.Goal[1] - claw.Goal[0] * (claw.A[1] / claw.A[0]);
    // b * (-claw.B[0] * (claw.A[1] / claw.A[0]) + claw.B[1]) ==  claw.Goal[1] - claw.Goal[0] * (claw.A[1] / claw.A[0]);
    claw.Goal[0] += 10000000000000;
    claw.Goal[1] += 10000000000000;
    let Bs = (claw.Goal[1] - claw.Goal[0] * (claw.A[1] / claw.A[0])) / (-claw.B[0] * (claw.A[1] / claw.A[0]) + claw.B[1])

    let As = (claw.Goal[0] - Bs*claw.B[0]) / claw.A[0];

    if (As > 0 && Math.abs(Math.round(As) - As) < .001 && Math.abs(Math.round(Bs) - Bs) < .001) {
        console.log(`As = ${As} Bs = ${Bs}`)
        tokensUsedP2 += Math.round(As) * 3 + Math.round(Bs) * 1
    }
}

console.log("p2 tokens used = " + tokensUsedP2);
