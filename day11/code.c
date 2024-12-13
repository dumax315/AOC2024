#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

const char *filename = "input.txt";

typedef struct listnode
{
    long long stoneNum;
    int times;
    long long result;
    struct listnode *next;
} listnodeT;

const int mapSize = 10000;

void setMap(long long stoneNum, int times, long long result, listnodeT *map)
{
    int index = (stoneNum * times) % mapSize;
    if (map[index].result == 0 && map[index].stoneNum == 0)
    {
        map[index] = (listnodeT){stoneNum, times, result, NULL};
    }
    else
    {
        listnodeT *lastWithData = &map[index];
        while (lastWithData->next != NULL)
        {
            if (stoneNum == lastWithData->stoneNum && times == lastWithData->times)
            {
                return;
            }
            lastWithData = lastWithData->next;
        }
        listnodeT *newNode = (listnodeT *)calloc(sizeof(listnodeT), 1);
        lastWithData->next = newNode;
        lastWithData->next->result = result;
        lastWithData->next->stoneNum = stoneNum;
        lastWithData->next->times = times;
        // printf("Set suc");
    }
}
long long getMap(long long stoneNum, int times, listnodeT *map)
{
    int index = (stoneNum * times) % mapSize;
    if (map[index].result == 0)
    {
        return -1;
    }
    else
    {
        listnodeT *lastWithData = &map[index];
        while (lastWithData != NULL)
        {
            // printf("stoneNum %lld %lld, times == %d %d\n", stoneNum, lastWithData->stoneNum, times, lastWithData->times);
            if (stoneNum == lastWithData->stoneNum && times == lastWithData->times)
            {
                // printf("found");
                return lastWithData->result;
            }
            lastWithData = lastWithData->next;
        }
        return -1;
    }
}

long long computeStones(long long stoneNum, int times, listnodeT *map)
{
    // printf("times %d\n", times);
    if (times == 0)
    {
        return 1;
    }
    // long long stored = getMap(stoneNum, times, map);
    // if (stored > -1)
    // {
    //     // printf("get suc");
    //     return stored;
    // }
    if (stoneNum == 0)
    {
        long long res = computeStones(1, times - 1, map);
        // setMap(stoneNum, times, res, map);
        return res;
    }
    char str[22];
    sprintf(str, "%lld", stoneNum);
    int len = strlen(str);
    if (len % 2 == 0)
    {
        if (len < 1)
        {
            printf("Asdfasdfadsfafd");
        }
        char str1[12];
        char str2[12];
        strncpy(str1, str, len / 2);
        str1[len / 2] = 0;
        strncpy(str2, &str[len / 2], len / 2);
        str2[len / 2] = 0;
        // printf("str = %s str1 = %s str2 = %s\n", str, str1, str2);
        // printf("nums: str = %s str1 = %lld str2 = %lld\n", str, atoll(str1), atoll(str2));
        long long res = computeStones(atoll(str1), times - 1, map) + computeStones(atoll(str2), times - 1, map);
        // setMap(stoneNum, times, res, map);
        return res;
    }
    long long res = computeStones(stoneNum * 2024, times - 1, map);
    // setMap(stoneNum, times, res, map);
    return res;
}

int main()
{
    FILE *fptr;

    listnodeT *map;
    map = (listnodeT *)calloc(sizeof(listnodeT), mapSize);

    // Open a file in read mode
    fptr = fopen(filename, "r");

    if (fptr == NULL)
    {
        printf("\tfile %s not found\n", filename);
    }

    // Store the content of the file
    char curLine[250];

    int pos = 0;

    long res = 0;

    // Read the content and print it
    while (fgets(curLine, 250, fptr))
    {
        char *pch;
        pch = strtok(curLine, " ");
        while (pch != NULL)
        {
            printf("start num = %lld\n", atoll(pch));

            long long cur = atoll(pch);
            long long childStones = computeStones(cur, 75, map);// 25 for part 1

            printf("%lld", childStones); 
            res += childStones;

            pos++;
            pch = strtok(NULL, " ");
        }
    }

    printf("lenght of the file = %d\n", pos);

    printf("result = %ld\n", res);

    // Close the file
    fclose(fptr);
}