//Question 1
//θ(n)

//Question 2
//θ(n^2)

//Question 3
//θ(n^2)

//Question 4
//θ(n^2)

//Question 5
list(1, 3, 5, 7, 8, 6, 4, 2, 9);

//Question 6
//Unordered lists.

//Question 7
//Ordered lists

//Question 8
//Ordered lists

//Question 9
// put the first n elements of xs into a list
function take(xs, n) {
    function take_helper(xs, n, count) {
        return n === count
               ? null
               : pair(list_ref(xs, count), take_helper(xs, n, count + 1));
    }
    return take_helper(xs, n, 0);
}

// drop the first n elements from list, return rest
function drop(xs, n) {
    function drop_helper(xs, n, count) {
        return n === count
               ? null 
               : pair(list_ref(xs, n), drop_helper(xs, n + 1, count));
    }
    return drop_helper(xs, n, length(xs));
}

//Question 10
function min(a, b) {
    return a < b ? a : b;
}

//given a non-empty list xs, returns the smallest item in xs
function smallest(xs) {
    return is_null(tail(xs))
           ? head(xs)
           : min(head(xs), smallest(tail(xs)));
}

//Question 11
// removes the first instance of x from xs
function remove(x, xs) {
    function remove_helper(x, xs, xs_accum) {
        return is_null(xs)
               ? xs_accum
               :equal(head(xs), x)
               ? append(xs_accum, tail(xs))
               : remove_helper(x, tail(xs), append(xs_accum, list(head(xs))));
    }
    return remove_helper(x, xs, null);
}

//Question 12
function selection_sort(xs) {
    if (is_null(xs)) {
        return null;
    } else {
        // We pick the smallest element, where should it go?
        // What should we recurse on?
        // YOUR SOLUTION HERE
        return pair(smallest(xs), selection_sort(remove(smallest(xs), xs)));
    }
}
