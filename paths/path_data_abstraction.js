//QUESTION 1
return q(k);

//QUESTION 2
pair(3, 6);

//QUESTION 
tail(what)

//QUESTION 4
pair(3, pair(4, pair(5, null)));

//QUESTION 5
2;

//QUESTION 6
pair(pair(2, 3), list(4));

//QUESTION 7
/* You can use only the following pre-declared functions in your solution:
- `make_rat`
- `numer`
- `denom`
- `add_rat`
- `sub_rat`
- `mul_rat`
- `div_rat`
- `equal_rat`
- `gcd`
*/

// Given two rational numbers rat1, rat2,
// return true iff rat1 <= rat2.

function lte(rat1, rat2) {
    return numer(rat1) / denom(rat1) <= numer(rat2) / denom(rat2);
}

//QUESTION 8
// The function lte has been pre-declared for you.

function gte(x, y) {
    return !lte(x, y - 1);
}

function eq(x, y) {
    return !lte(x, y - 1) && lte(x, y);
}

function lt(x, y) {
    return lte(x, y - 1);
}

function gt(x, y) {
    return !lte(x, y);
}

//QUESTION 9
/* For reference:

function length(xs) {
    return is_null(xs) ? 0 : 1 + length(tail(xs));
}
*/

// Given a list of numbers xs,
// return the sum of all numbers in xs.

function sum(xs) {
    return is_null(xs)
           ? 0
           : head(xs) + sum(tail(xs));
}
