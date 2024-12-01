#include <stdio.h>
#include <stdlib.h>


const char* filename = "input.txt";

int main() {
    FILE *fptr;

    // Open a file in read mode
    fptr = fopen(filename, "r");

    if(fptr == NULL) {
        printf("\tfile %s not found\n", filename);
    }

    // Store the content of the file
    char curLine[256];

    // Read the content and print it
    while(fgets(curLine, 256, fptr)) {
        size_t i = 0;
        while (curLine[i]) {
            printf("%c", curLine[i]);
            i++;
        }
    }

    // Close the file
    fclose(fptr);
}
