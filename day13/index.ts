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
    console.log(claw)
    let Bs = 0;
    let As = 0;
    let minTokens = 40000000000000;

    claw.Goal[0] += 10000000000000;
    claw.Goal[1] += 10000000000000;
    
    while (true) {
        // console.log(Bs);
        let resX = claw.B[0] * Bs;
        let resY = claw.B[1] * Bs;
        if(resX > claw.Goal[0] || resY > claw.Goal[1]) {
            break;
        }

        if (((claw.Goal[0] - resX) % claw.A[0] === 0) && ((claw.Goal[1] - resY) % claw.A[1] === 0)) {
            As = (claw.Goal[0] - resX) / claw.A[0];
            resY = claw.A[1] * As + claw.B[1] * Bs;
            if (resY === claw.Goal[1]) {
                minTokens = Math.min(minTokens, As * 3 + Bs * 1);
                console.log(`found one `)
            }
        }
        Bs++;
        As = 0;
    }

    if (minTokens !== 40000000000000) {
        console.log(minTokens);
        tokensUsedP2 += minTokens
    }
}

console.log("p2 tokens used = " + tokensUsedP2);
