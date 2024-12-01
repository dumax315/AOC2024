#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct ValAndPos {
    int val;
    int pos;
};

const char* filename = "input.txt";

const int numLines = 1000;

int compare(const void *s1, const void *s2)
{
  struct ValAndPos *e1 = (struct ValAndPos *)s1;
  struct ValAndPos *e2 = (struct ValAndPos *)s2;
  // printf("e1->val %d e2->val %d, res = %d\n", e1->val, e2->val,e1->val - e2->val);
  return e1->val - e2->val;
}

int main() {
    FILE *fptr;

    // Open a file in read mode
    fptr = fopen(filename, "r");

    if(fptr == NULL) {
        printf("\tfile %s not found\n", filename);
    }

    struct ValAndPos* left;
    struct ValAndPos* right;

    left = (struct ValAndPos*) malloc(sizeof(struct ValAndPos) * numLines);
    right = (struct ValAndPos*) malloc(sizeof(struct ValAndPos) * numLines);

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
        left[pos].val = atoi(subStrings);
        right[pos].val = atoi(subString2);
        left[pos].pos = pos;
        right[pos].pos = pos;
        printf("left num %d, right num %d, pos == %d\n",  atoi(subStrings), atoi(subString2), pos);
        pos++;
    }

    printf("lenght of the file = %d\n", pos);

    qsort(left, numLines, sizeof(struct ValAndPos), compare);
    qsort(right, numLines, sizeof(struct ValAndPos), compare);

    int res = 0;

    for (int i = 0; i < numLines; i++) {
        printf(" left pos %d, right pos %d\n", left[i].pos, right[i].pos);
        printf("left val %d, right val %d\n", left[i].val, right[i].val);
        printf("dist = %d\n", abs(left[i].val - right[i].val));
        res += abs(left[i].val - right[i].val);
    }

    printf("result = %d\n", res);


    // Close the file
    fclose(fptr);
    free(left);
    free(right);
}
