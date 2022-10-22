//Q1
//[1, 8, 3, 4, 5]

//Q2
//11

//Q3
//true, false, false

//Q4
//[1, 2, 8, 4, 5]

//Q5
//A[3][0][2]

//Q6
//0 2 4 6

//Q7
//Error, because name x is not declared.

//Q8
//15

//Q9
function dot_product(A, B) {
    let sum = 0;
    for (let i = 0; i < array_length(A); i = i + 1){
        sum = sum + A[i] * B[i];
    }
    return sum;
}

//Q10
function accumulate_array(op, init, A) {
    let result = 0;
    for (let i = 0; i < array_length(A); i = i + 1) {
        if (i === 0) {
            result = op(init, A[0]);
        } else {
            result = op(result, A[i]);
        }
    }
    return result;
}

//Q11
function filter_array(pred, A) {
    let filtered_A = [];
    for (let i = 0; i < array_length(A); i = i + 1) {
        if (pred(A[i])) {
            filtered_A[array_length(filtered_A)] = A[i];
        } else {
        }
    }
    return filtered_A;
}

//Q12
function transpose(M) {
    let transposed_matrix = [];
    let rows = array_length(M);
    let cols = array_length(M[0]);
    
    for (let i = 0; i < cols; i = i + 1) {
        transposed_matrix[i] = [];
        for (let j = 0; j < rows; j = j + 1){
            transposed_matrix[i][j] = M[j][i];
        }
    }
    return transposed_matrix;
}
