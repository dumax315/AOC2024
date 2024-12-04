#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// today I discoverd valgrind memcheck
//  gcc -g code.c && valgrind --tool=memcheck ./a.outy

const char* filename = "./input.txt";

const int numLines = 140;

int matchHor(char **table, char *key) {
    int res = 0;
    for (int row = 0; row < numLines; row++) {
        for (int col = 0; col < numLines; col++) {
            char i;
            for (i = 0; i < 4; i++) {
                if (table[row][col + i] != key[i]) {
                    break;
                }
            }
            if (i == 4) {
                res++;
                printf("hor row = %d, col = %d\n", row, col);
            }
        }
    }
    return res;

}

int matchVert(char **table, char *key) {
    int res = 0;
    for (int row = 0; row < numLines - 3; row++) {
        for (int col = 0; col < numLines; col++) {
            char i;
            for (i = 0; i < 4; i++) {
                if (table[row + i][col] != key[i]) {
                    break;
                }
            }
            if (i == 4) {
                printf("vert row = %d, col = %d\n", row, col);
                res++;
            }
        }
    }
    return res;

}

int matchDig(char **table, char *key) {
    int res = 0;
    for (int row = 0; row < numLines - 3; row++) {
        for (int col = 0; col < numLines; col++) {
            char i;
            for (i = 0; i < 4; i++) {
                if (table[row + i][col + i] != key[i]) {
                    break;
                }
            }
            if (i == 4) {
                printf("digDown row = %d, col = %d\n", row, col);
                res++;
            }
            // The other way
            for (i = 0; i < 4; i++) {
                if (table[row + 3 - i][col + i] != key[i]) {
                    break;
                }
            }
            if (i == 4) {
                printf("digUp row = %d, col = %d\n", row, col);
                res++;
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
        table[i] = malloc(numLines + 4); //just in case and for the null term
        int j = numLines;
        table[i][j++] = 'n';
        table[i][j++] = 'n';
        table[i][j++] = 'n';
        table[i][j++] = 'n';
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

    res += matchHor(table, "XMAS");
    res += matchHor(table, "SAMX");

    res += matchVert(table, "XMAS");
    res += matchVert(table, "SAMX");

    res += matchDig(table, "XMAS");
    res += matchDig(table, "SAMX");

    printf("result = %d\n", res);


    // Close the file
    fclose(fptr);
    for (int i = 0; i < numLines; i++) {
        free(table[i]); //just in case and for the null term
    }
    free(table);
}
