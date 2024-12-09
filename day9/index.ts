const data = (await Bun.file("input.txt").text())
    .split("").map(x => parseInt(x))

const data1 = data.map(x => x);
const resArr = new Array();

let endIndex = data1.length - 1;

for(let i = 0; i < data1.length; i++) {
    if (i %2 == 0) {
        while (data1[i] > 0) {
            resArr.push(i / 2);
            data1[i]--;
        }
    }else {
        for (let j = 0; j < data1[i]; j++) {
            if (endIndex %2 == 1 || data1[endIndex] <= 0) {
                endIndex-=2;
            }
            if (data1[endIndex] <= 0) {
                break;
            }
            resArr.push(endIndex / 2);
            data1[endIndex]--;
        }
    }

}
// console.log(resArr.join(""))

let res = 0;
for (let i = 0; i < resArr.length; i++) {
    res += i * resArr[i];
}

console.log(`res 1 = ${res}`)

let p2Arr = new Array()

for(let i = 0; i < data.length; i+=2) {
    for (let j = 0; j < data[i]; j++) {
        p2Arr.push(i/2);
    }
    for (let j = 0; j < data[i+1]; j++) {
        p2Arr.push(-1);
    }
}


let exactlyOnce = new Set<number>();

for(let i = p2Arr.length -1; i >= 0; i--) {
    if(p2Arr[i] == -1 || exactlyOnce.has(p2Arr[i])) {
        continue;
    }
    let size = 0;
    while (p2Arr[i - size] == p2Arr[i]) size++;
    // console.log(`num = ${p2Arr[i]} size = ${size}`)
    let failed = true
    for (let j = 0; j < i; j++) {
        let gap = 0;
        while (p2Arr[j + gap] == -1) gap++;
        // console.log(gap)
        if (gap >= size) {
            // console.log(gap)
            exactlyOnce.add(p2Arr[i])
            for (let v = 0; v < size; v++) {
                // p2Arr[v + Math.floor((gap-size)/2) + j] = p2Arr[i];
                p2Arr[v + j] = p2Arr[i];
            }
            
            for (let v = 0; v < size; v++) {
                p2Arr[i - v] = -1;
            }
            failed = false;
            break;
        } else {
            j += gap;
        }
    }
    // if (failed) {
    //     console.log("nomove")
    // }
    i -= size - 1
}

// console.log(p2Arr.map(x => x == -1 ? " " : x + ",").join("").trim())
res = 0;
for (let i = 0; i < p2Arr.length; i++) {
    if (p2Arr[i] > 0) {
        res += i * p2Arr[i];
    }
}

console.log(`res 2 = ${res} inputlen = ${data.length}`)

