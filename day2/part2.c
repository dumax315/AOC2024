#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

const char* filename = "input.txt";

const int numLines = 1000;

int checkVals(char *curLine, char skip) {
    size_t i = 0;
    printf("\nskip == %d ", skip);
    char *lineCopy = malloc(strlen(curLine) + 1);
    strcpy(lineCopy, curLine);
    char *subString = strtok(lineCopy, " ");
    if (skip == 0) {
        subString = strtok(NULL, " ");
    }
    int lastVal = 0;
    bool isDecreasing = false;
    while (subString != NULL) {

        if (i == 0) {
            lastVal = atoi(subString);
            printf("%d, ", lastVal);
        } else {
            int curVal = atoi(subString);
            printf("%d, ", curVal);
            if(abs(curVal - lastVal) > 3 || curVal == lastVal) {
                return 0;
            }
            if (i == 1) {
                if (lastVal > curVal) {
                    isDecreasing = true; 
                }
            } else {
                if (isDecreasing && lastVal < curVal) {
                    return 0;
                }
                if (!isDecreasing && lastVal > curVal) {
                    return 0;
                }
            }
            lastVal = curVal;
        }
        subString = strtok(NULL, " ");
        i++;
        if (i == skip) {
            subString = strtok(NULL, " ");
        }
    }
    free(lineCopy);
    return 1;
}

int main() {
    FILE *fptr;

    // Open a file in read mode
    fptr = fopen(filename, "r");

    if(fptr == NULL) {
        printf("\tfile %s not found\n", filename);
    }

    // Store the content of the file
    char curLine[256];

    int pos = 0;

    int res = 0;
    // Read the content and print it
    while(fgets(curLine, 256, fptr)) {
        for (int i = 0; i < 11; i++) {
            if(checkVals(curLine, i) == 1) {
                res++;
                break;
            }
        }
        pos++;
    }

    printf("result = %d\n", res);


    // Close the file
    fclose(fptr);
}

