const data = (await Bun.file('input.txt').text()).split("\n");
// console.log(data);

const lookup: {[key: number]: Set<number>} = {};

const revlookup: {[key: number]: Set<number>} = {};

let i: number;
for (i = 0; data[i] != ""; i++) {
    console.log(data[i]);
    const start = parseInt(data[i].substring(3,5));
    const end = parseInt(data[i].substring(0,2));
    console.log(start +  "  "+ end)
    if (!(start in lookup)) {
        lookup[start] = new Set();
    }
    lookup[start].add(end);
    if (!(end in revlookup)) {
        revlookup[end] = new Set();
    }
    revlookup[end].add(start);
}
i++;

let res = 0;
let res2 = 0;
for (; i < data.length; i++) {
    let pages: number[] = data[i].split(",").map(x => parseInt(x));
    let notAllowed: [Set<number>, number, number][] = [];
    let failed = false;
// for (let a = 0; a < 400; a++){
    notAllowed = [];
    for(let ii = 0; ii < pages.length; ii++) {
        const page = pages[ii];
        if (notAllowed.some(x => x[0].has(page))){
            // console.log("failed at " + i);
            failed = true;
            // console.log(pages.join(","))
            // let entry = notAllowed.filter(x => x[0].has(page)).at(-1);
            // const temp = pages[ii];
            // pages[ii] = entry[1];
            // pages[entry[2]] = temp;
            // console.log(pages.join(","))
            // break;
        } 
        notAllowed.push([lookup[page], page, ii] as const);
    }
// }

    if (!failed) {
        // console.log(pages[Math.floor(pages.length / 2)]);
        res += pages[Math.floor(pages.length / 2)];
    } else {
        console.log(pages.join(","))
        pages.sort((a, b) => {
            if (lookup[b].has(a)) {
                return -1;
            }
            if (revlookup[a].has(b)) {
                return 1;
            }
            return 0;
        })
        console.log(pages.join(","))
        res2 += pages[Math.floor(pages.length / 2)];
    }
}

console.log("p1 res = " + res);
console.log("p2 res = " + res2);