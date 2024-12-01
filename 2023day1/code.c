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

    long sum = 0;

    // Read the content and print it
    while(fgets(curLine, 256, fptr)) {
        size_t i = 0;
        int firstd = -1;
        int lastd = -1;
        while (curLine[i]) {
            printf("%c", curLine[i]);
            if(curLine[i] >= 48 && curLine[i] < 58) {
                if(firstd == -1) {
                    firstd = (curLine[i] - 48) * 10;
                } else {
                    lastd = (curLine[i] - 48);
                }
            }
            i++;
        }
        if (lastd == -1) {
            lastd = firstd / 10;
        }
        printf("\nnum = %d\n", firstd + lastd);
        sum += firstd + lastd;
        printf("%ld\n", sum);
    }

    printf("sum == %ld", sum);

    // Close the file
    fclose(fptr);
}
