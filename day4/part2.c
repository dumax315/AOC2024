#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char* filename = "./input.txt";

const int numLines = 140;


int checkXmas(char **table, int row, int col) {
    if ((
            (table[row - 1][col - 1] == 'M'
            && table[row + 1][col + 1] == 'S')
            ||
            (table[row - 1][col - 1] == 'S'
            && table[row + 1][col + 1] == 'M')
        )
        &&
        (
            (table[row - 1][col + 1] == 'M'
            && table[row + 1][col - 1] == 'S')
            ||
            (table[row - 1][col + 1] == 'S'
            && table[row + 1][col - 1] == 'M')
        ) 
        ) {
        printf("row = %d, col = %d\n", row, col);
        return 1;
    }
            

    return 0;
}


int matchXmas(char **table) {
    int res = 0;
    for (int row = 1; row < numLines - 1; row++) {
        for (int col = 1; col < numLines - 1; col++) {
            if (table[row][col] == 'A') {
                res += checkXmas(table, row, col);
            }
        }
    }
    return res;

}

int main() {
    FILE *fptr;

    // Open a file in read mode
    fptr = fopen(filename, "r");

    if(fptr == NULL) {
        printf("\tfile %s not found\n", filename);
    }

    // Store the content of the file
    char curLine[2000];

    int pos = 0;


    char **table = malloc(numLines * sizeof(fptr)); // fptr will be the size of a pointer

    for (int i = 0; i < numLines; i++) {
        table[i] = malloc(numLines); //just in case and for the null term
        int j = numLines;
    }

    // Read the content and print it
    while(fgets(curLine, 2000, fptr)) {
        size_t i = 0;
        printf("\n");
        while (curLine[i]) {
            //printf("%c", curLine[i]);
            table[pos][i] = curLine[i];
            i++;
        }
        printf("lineLength= %d", i);
        pos++;
    }

    printf("lenght of the file~ = %d\n", pos);

    int res = 0;

    res += matchXmas(table);

    printf("result = %d\n", res);


    // Close the file
    fclose(fptr);
    for (int i = 0; i < numLines; i++) {
        free(table[i]); //just in case and for the null term
    }
    free(table);
}
