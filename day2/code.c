#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

const char* filename = "input.txt";

const int numLines = 1000;

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
        size_t i = 0;
        printf("\n");
        char *subString = strtok(curLine, " ");
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
                    res -= 1;
                    break;
                }
                if (i == 1) {
                    if (lastVal > curVal) {
                        isDecreasing = true; 
                    }
                } else {
                    if (isDecreasing && lastVal < curVal) {
                        res -= 1;
                        break;
                    }
                    if (!isDecreasing && lastVal > curVal) {
                        res -= 1;
                        break;
                    }
                }
                lastVal = curVal;
            }
            subString = strtok(NULL, " ");
            i++;
        }
        res += 1;
        pos++;
    }


    // for (int i = 0; i < numLines; i++) {
        
    // }

    printf("result = %d\n", res);


    // Close the file
    fclose(fptr);
}

