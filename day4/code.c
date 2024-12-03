#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char* filename = "./day2/input.txt";

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

    // Read the content and print it
    while(fgets(curLine, 256, fptr)) {
        size_t i = 0;
        printf("\n");
        while (curLine[i]) {
            printf("%c", curLine[i]);
            i++;
        }
        pos++;
    }

    printf("lenght of the file = %d\n", pos);

    int res = 0;

    // for (int i = 0; i < numLines; i++) {

    // }

    printf("result = %d\n", res);


    // Close the file
    fclose(fptr);
}
