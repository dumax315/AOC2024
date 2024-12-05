#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char* filename = "./input.txt";

const int numLines = 1382;

const int MAX_PAGES_AFTER = 200;

typedef struct {
    char page[3]; // 2 char for the num, one for the null
    char *not_allowed_after;
} page_t;

int addToFrq(char *page, char *new_not_allowed_after, page_t *table, int tableLen) {
    for(int i = 0; i < tableLen; i++) {
        if(strcmp(page, table[i].page) == 0) {
            strncat(table[i].not_allowed_after, new_not_allowed_after, 2);
            printf("notallowed after total = %s\n", table[i].not_allowed_after);
            return tableLen;
        }
    }
    strcpy(table[tableLen].page, page);
    table[tableLen].not_allowed_after = malloc(MAX_PAGES_AFTER + 1);
    strncat(table[tableLen].not_allowed_after, new_not_allowed_after, 2);
    printf("notallowed after total = %s\n", table[tableLen].not_allowed_after);
    return tableLen + 1;
}

char * getFrq(char *page, page_t *table, int tableLen) {
    for(int i = 0; i < tableLen; i++) {
        if(strcmp(page, table[i].page) == 0) {
            return table[i].not_allowed_after;
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

    // Store the content of the file
    char curLine[256];

    page_t* table;

    table = (page_t*) malloc(sizeof(page_t) * numLines);

    int tableLen = 0;


    int pos = 0;

    // Read the content and print it
    while(fgets(curLine, 256, fptr)) {
        size_t i = 0;
        if (curLine[0] == '\n') {
            break;
        }
        char page[3];
        page[0] = curLine[3];
        page[1] = curLine[4];
        page[2] = 0;
        char new_char_after[3];
        new_char_after[0] = curLine[0];
        new_char_after[1] = curLine[1];
        new_char_after[2] = 0;

        printf("line = %s page = %s notallowed = %s\n", curLine, page, new_char_after);
        tableLen = addToFrq(&page, new_char_after, table, tableLen);
        pos++;
    }

    printf("lenght of the file = %d\n", pos);

    int res = 0;

    // Read the content and print it
    while(fgets(curLine, 256, fptr)) {
        size_t i = 0;
        char notAllowedCum[3000];
        notAllowedCum[0] = 0;
        char failed = 0;
        while (curLine[i]) {
            // printf("%c", curLine[i]);
            char page[3];
            page[0] = curLine[i];
            page[1] = curLine[i + 1];
            page[2] = 0;
            char *notAllowed = getFrq(page, table, tableLen);
            // printf("i = %d page = %s notAllowed = %s", i, page, notAllowed);
            for (int jj = 0; notAllowedCum[jj]; jj += 2) {
                if (notAllowedCum[jj] == page[0] && notAllowedCum[jj + 1] == page[1]) {
                    failed = 1;
                    break;
                }
            }
            strncat(notAllowedCum, notAllowed, MAX_PAGES_AFTER);
            i+=3;
        }

        if (!failed) {
            char middle[3];
            middle[2] = 0;

            int start = (strlen(curLine)) / 2;
            start -= 1;
            middle[0] = curLine[start];
            middle[1] = curLine[start + 1];

            res += atoi(middle);
            printf("didint fail %d middle = %s line = %s", pos, middle, curLine);
        }


        
        // printf("%s\n", notAllowedCum);
        pos++;
    }

    printf("result = %d\n", res);

    printf("size of page_t = %d\n", sizeof(page_t));

    // Close the file
    fclose(fptr);

    free(table);
}
