#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct valAndFrq {
    int val;
    int frq;
};

const char* filename = "input.txt";

const int numLines = 1000;

int addToFrq(int val, struct valAndFrq* table, int tableLen) {
    for(int i = 0; i < tableLen; i++) {
        if(table[i].val == val) {
            table[i].frq++;
            return tableLen;
        }
    }
    table[tableLen].val = val;
    table[tableLen].frq = 1;
    return tableLen + 1;
}

int getFrq(int val, struct valAndFrq* table, int tableLen) {
    for(int i = 0; i < tableLen; i++) {
        if(table[i].val == val) {
            return table[i].frq;
        }
    }
    return 0;
}

int main() {
    FILE *fptr;

    // Open a file in read mode
    fptr = fopen(filename, "r");

    if(fptr == NULL) {
        printf("\tfile %s not found\n", filename);
    }

    struct valAndFrq* left;
    struct valAndFrq* right;

    left = (struct valAndFrq*) malloc(sizeof(struct valAndFrq) * numLines);
    right = (struct valAndFrq*) malloc(sizeof(struct valAndFrq) * numLines);

    int leftLen = 0;
    int rightLen = 0;

    // Store the content of the file
    char curLine[20];

    int pos = 0;

    // Read the content and print it
    while(fgets(curLine, 20, fptr)) {
        size_t i = 0;
        printf("\n");
        while (curLine[i]) {
            printf("%c", curLine[i]);
            i++;
        }
        char *subStrings = strtok(curLine, "   ");
        char *subString2 = strtok(NULL,"   ");
        leftLen = addToFrq(atoi(subStrings), left, leftLen);
        rightLen = addToFrq(atoi(subString2), right, rightLen);
        
        pos++;
    }

    printf("lenght of the file = %d\n", pos);

    rewind(fptr);

    int res = 0;

    while(fgets(curLine, 20, fptr)) {
        size_t i = 0;
        printf("\n");
        while (curLine[i]) {
            printf("%c", curLine[i]);
            i++;
        }
        int leftVal = atoi(strtok(curLine, "   "));
        int rightVal = atoi(strtok(NULL,"   "));
        int leftFrq = getFrq(leftVal, right, rightLen);
        int rightFrq = getFrq(rightVal, left, leftLen);
        printf("left val = %d, right val = %d\n left frq = %d, right frq = %d \n", leftVal, rightVal, leftFrq, rightFrq);
        res += leftVal * leftFrq;
        // res += rightVal * rightFrq;
        pos++;
    }

    printf("result = %d\n", res);


    // Close the file
    fclose(fptr);
    free(left);
    free(right);
}
