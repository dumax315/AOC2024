def check(line, skip):
    i = 0
    lastnum = 0
    valid = True
    isDecreasing = True
    arr = [int(x) for x in line.split(" ")]
    if(skip != -1):
        arr.pop(skip)
    for num in arr:
        print(f"{num}, ", end="")
        if (i == 0):
            lastnum = num
        else:
            if (abs(num - lastnum) > 3 or num == lastnum):
                valid = False
                break
            if (i == 1):
                isDecreasing = num < lastnum
            else:
                if isDecreasing and num > lastnum:
                    valid = False
                    break
                if (not isDecreasing) and num < lastnum:
                    valid = False
                    break
        lastnum = num
        i += 1
    return valid


f = open("input.txt", "r")
res = 0
for line in f.readlines():
    valid = False
    for i in range(len(line.split(" "))):
        print(i)
        valid = check(line, i)
        if (valid == True):
            break
    if valid == False:
        valid = check(line, -1)
    if valid:
        res += 1
            
        
    print("")
print(f"res = {res}")