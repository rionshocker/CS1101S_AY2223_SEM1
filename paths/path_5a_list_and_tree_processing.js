//TASK 1
// Produces a list of integers from a to b,
// assuming a, b are integers.

function enum_list(a, b) {
    return a > b
           ? null 
           : pair(a, enum_list(a + 1, b));
}

enum_list(0, 5);

//TASK 2
// Produces a list of integers from a to b,
// assuming a, b are integers.

function enum_list(a, b) {
    return build_list(n => n + a, b - a + 1);
}

//TASK 3
// You must use the supplied filter function.

// Given a list of integers xs, returns a list that
//   contains only the odd integers in xs.
function odd_only(xs) {
    return filter(n => n % 2 !== 0, xs);
}

// Given a list of positive integers xs, returns a list that
//   contains only the prime numbers in xs.
// Hint: write a helper function.
function prime_only(xs) {
    function smallest_divisor(n) {
        return find_divisor(n, 2);
    }
    function find_divisor(n, test_divisor) {
        return square(test_divisor) > n
               ? n
               :divides(test_divisor, n)
               ? test_divisor
               : find_divisor(n, test_divisor + 1);
    }
    function square(x) {
        return x * x;
    }
    function divides(a, b) {
        return b % a === 0;
    }
    function is_prime(n) {
        return n === smallest_divisor(n);
    }
    return filter(n => is_prime(n) && n!== 1, xs);
}

//TASK 4
const display = custom_display; // DO NOT EDIT.

// Calls display on every item in the list xs.
function traverse(xs) {
    if (is_null(xs)) {
        return null;
    } else {
        display(head(xs));
        return traverse(tail(xs));
    }
}

//TASK 5
const display = custom_display; // DO NOT EDIT.

// Calls display on every item in the tree xs.
function traverse(xs) {
    // Modify this function to work on trees.
    if (is_null(xs)) {
        return null;
    } else if (is_list(xs)) {
        traverse(head(xs));
        traverse(tail(xs));
    } else {
        return display(xs);
    }
}
