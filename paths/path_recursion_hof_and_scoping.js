//TASK 1
const DONT_CARE = undefined; // Ignore this, do not edit.

// When thinking about base cases,
// do the simplest thing possible
// and leave the hard work to the computer.

function choose(n, r) {
    return n < 0 || r < 0 // Change this condition.
           ? 0
           : n === r || r === 0 // Change this condition.
	       ? 1
           : DONT_CARE; // DO NOT EDIT.
}

//TASK 2
// Suppose you need to choose R items from N items.
// Consider the first item.
// - We can either choose it, or not choose it.

// If we choose the first item:
// - How many more items must we choose from the remaining N - 1 items?
const CHOOSE_FIRST_ITEM = choose(N - 1, R - 1); // Edit arguments only.
// Example: choose(N + 4, R - 7);

// If we don't choose the first item:
// - How many more items must we choose from the remaining N - 1 items?
const NOT_CHOOSE_FIRST_ITEM = choose(N - 1, R); // Edit arguments only.

// Express your answers in terms of choose, N and R.
// They have been pre-declared.

//TASK 3
function choose(n, r) {
    return n < 0 || r < 0 // Change this condition.
           ? 0
           : n === r || r === 0 // Change this condition.
	       ? 1
           // Inductive case goes here.
           : choose(n - 1, r - 1) + choose(n - 1, r); // YOUR SOLUTION HERE.
}

//TASK 4
// Sum the first n odd natural numbers.
function sum_odd(n) {
    // YOUR SOLUTION HERE
    return sum(x => 2 * (x - 1) + 1, 1, x => x + 1, n);
}

//TASK 5
// Sum the first n odd numbers less than or equal to n.
function sum_odd_lte(n) {
    // YOUR SOLUTION HERE
    return sum(x => 2 * (x -1) + 1, 1, x => x + 1, (n + 1) / 2);
}

//TASK 6
function accumulate(combiner, term, a, next, b, base) {
    // YOUR SOLUTION HERE
    return a > b
           ? base
           : combiner((term(a)), accumulate(combiner, term, next(a), next, b, base));
}

// Example uses:

// function sum(term, a, next, b) {
//   return accumulate( (x, y) => x + y, term, a, next, b, 0);
// }

// function product(term, a, next, b) {
//   return accumulate( (x, y) => x * y, term, a, next, b, 1);
// }

// function fact(n) {
//     return product(x => x, 1, x => x + 1, n);
// }
