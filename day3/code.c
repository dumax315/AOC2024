#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

const char* filename = "input.txt";


int evalLine(char *curLine) {
    long prod = 0;
    printf("\n");
    size_t lineLength = strlen(curLine);
    for (size_t i = 0; i < lineLength; i++) {
        for (int j = 0; j < 12; j++) {
            printf("%c", curLine[i+j]);
        }
        printf("\n");
        if (curLine[i] == 'm' && curLine[i+1] == 'u' && curLine[i+2] == 'l' && curLine[i+3] == '(') {

            size_t ii = i + 4;
            size_t numLength1 = 0;
            while (isdigit(curLine[ii])) {
                numLength1++;
                ii++;
            }
            if (numLength1 == 0) {
                continue;
            }
            char *num1Str = malloc(numLength1 + 1);
            for (int j = 0; j < numLength1; j++) {
                num1Str[j] = curLine[i + 4 + j];
            }
            int num1 = atoi(num1Str);
            printf("num1=%d", num1);
            if (curLine[i + 4 + numLength1] != ',') {
                continue;
            }
            ii = i + 4 + numLength1 + 1;
            size_t numLength = 0;
            while (isdigit(curLine[ii])) {
                numLength++;
                ii++;
            }
            if (numLength == 0) {
                continue;
            }
            char *num2Str = malloc(numLength + 1);
            for (int j = 0; j < numLength; j++) {
                num2Str[j] = curLine[i + 4 + numLength1 + 1 + j];
            }
            int num2 = atoi(num2Str);
            printf("num2=%d", num2);
            if (curLine[ii] != ')') {
                continue;
            }
            printf("prod=%ld\n", (long)num1 * (long)num2);
            prod += (long)num1 * (long)num2;
        }
    }
    return prod;
}

int main() {
    FILE *fptr;

    // Open a file in read mode
    fptr = fopen(filename, "r");

    if(fptr == NULL) {
        printf("\tfile %s not found\n", filename);
    }

    // Store the content of the file
    char curLine[8000];

    int pos = 0;

    long res = 0;

    // Read the content and print it
    while(fgets(curLine, 8000, fptr)) {
        res += evalLine(curLine);

        pos++;
    }

    printf("lenght of the file = %d\n", pos);

    printf("result = %ld\n", res);


    // Close the file
    fclose(fptr);
}
