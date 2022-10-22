// TASK 1
/* The function is supposed to split a list into 2 halves, in which the halves
must be equal in length if the list is even or the first half must be one longer
than the second half if the list is odd in length. As such, we can split the 
list by getting a second half from applying tail to the list i times, in which
i represents the length that it needs to split the list by, while omitting 1
such that the last tail can then be applied and then link it to the variable
second_half. Then a pair is created by pairing the original list which has been
split, and the second_half of the list.
The original xs has been split due to the setting of tail of curr to be null,
which causes it to form a separate list, forming the first half of it.
*/
function d_split_list(xs) {
    const xs_length = length(xs);
    let second_half = null;
    let curr = xs;
    
    const first_half_length = xs_length % 2 === 0 
                        ? xs_length / 2 
                        : math_floor(xs_length / 2) + 1;
    let i = 0;
    while (i < first_half_length - 1) {
        curr = tail(curr);
        i = i + 1;
    }
    second_half = tail(curr);
    set_tail(curr, null);
    return pair(xs, second_half);

}

// TEST:
const my_list1 = list(1, 2, 3, 4, 5, 6);
const my_list2 = list(5, 4, 3, 2, 1);
d_split_list(my_list1);
d_split_list(my_list2);

// TASK 2
/* Following the same logic as the merge function of lists, in this case,
set_tail is applied instead of pair such that the pairs are being reused, and
applying recursion such that the remaining part of the lists will be sorted.
*/
function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        if (x < y) {
            set_tail(xs, d_merge(tail(xs), ys));
            return xs;
        } else {
            set_tail(ys, d_merge(xs, tail(ys)));
            return ys;
        }
    }
}

// TEST:
const my_list1 = list(2, 4, 5, 9);
const my_list2 = list(3, 5, 8);
d_merge(my_list1, my_list2);

// TASK 3

// Copy-and-paste your d_split_list function for Task 1 here.
function d_split_list(xs) {
    const xs_length = length(xs);
    let second_half = null;
    let curr = xs;
    
    const first_half_length = xs_length % 2 === 0 
                        ? xs_length / 2 
                        : math_floor(xs_length / 2) + 1;
    let i = 0;
    while (i < first_half_length - 1) {
        curr = tail(curr);
        i = i + 1;
    }
    second_half = tail(curr);
    set_tail(curr, null);
    return pair(xs, second_half);

}

// Copy-and-paste your d_merge function for Task 2 here.
function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        if (x < y) {
            set_tail(xs, d_merge(tail(xs), ys));
            return xs;
        } else {
            set_tail(ys, d_merge(xs, tail(ys)));
            return ys;
        }
    }
}
/* We can utilise the d_split_list function to split the input list into the
first half and second half, such that each list can then be sorted and then
merged together, as merge sort is supposed to take in 2 sorted lists and merge
them together.
*/
function d_merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const split_lists = d_split_list(xs);
        const left_half = head(split_lists);
        const right_half = tail(split_lists);
        
        const merged_list = d_merge(d_merge_sort(left_half),
                                    d_merge_sort(right_half));
        
        return merged_list;
    }

}

// TEST:
const my_list = list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6);
d_merge_sort(my_list);
