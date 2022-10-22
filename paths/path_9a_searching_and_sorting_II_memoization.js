//Q1
//Accessing any array takes O(1) time.

//Q2
//Linear search works on unsorted arrays.

//Q3
//In each step, binary search halves the remaining portion of the array that needs to be searched.

//Q4
//In each run of the inner loop, insertion sort may swap two neighbouring elements.

//Q5
//In each iteration of the for loop in function selection_sort, two elements may be swapped.

//Q6
//Merge sort runs in θ(n) time if the array is already sorted.

//Q7
//Memoization avoids repeated calculation of the result of a function applied to the same arguments.

//Q8
function search_cond(A, cond) {

    // YOUR SOLUTION HERE
    for (let i = 0; i < array_length(A) - 1; i = i + 1) {
        if (is_null(A)) {
            return -1;
        } else {
            let i = 0;
            while (i < array_length(A)) {
                if (cond(A[i])) {
                    return i;
                } else {
                    i = i + 1;
                }
            }
        }
    }
    return -1;
}

//Q9
function insert(A, pos, x) {

    // YOUR SOLUTION HERE
    for (let i = array_length(A); i > pos; i = i - 1) {
        A[i] = A[i - 1];
    }
    A[pos] = x;
    return A;

}

//Q10
function insertion_sort(A) {
    let copy = [];
    copy[0] = A[0];
    
    for (let i = 1; i < array_length(A); i = i + 1) {
        let x = A[i];
        let cond = y => y > x;
        let pos = search_cond(copy, cond);
        if (pos !== -1) {
            insert(copy, pos, x);
        } else {
            copy[i] = x; 
        }
    }
    return copy;
}
