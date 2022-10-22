//TASK 1
/*

Describe your solution here, including
its order of growth.

You will get full XP only for
a solution that has an order of growth
O(n²) and that does not have an order
of growth Θ(n²).

I will sort the list with the merge sort function. During the merging of the 2
sublists, compare the first element of each sublist, in which if the first
element of the first sublist is greater than the first element of the second
sublist, it is said that the elements are out-of-order. If the elements are
out-of-order, then we add the length of the remainder of the first sublist to
the current number of out-of-order pairs. Otherwise, continue with the merging
of the sublists. Return the merged sublists and the number of out-of-order pairs
as a pair.
Each comparison and increment of number of out-of-order pairs runs in constant
time, and since merge sort has an order of growth of O(n²) and Θ(nlog(n)), the
order of growth of this solution is also O(n²) and Θ(nlog(n)).
*/

//TASK 2
/* Make use of the merge sort function, where it takes the middle point of a
list as the pivot point. Merge sort incorporates merge, in which it compares
the head of the two sublists and in the case where one is smaller, then it
returns a list with the smaller number at the front. If x is greater than that
of y, then it results in out-of-order pairs formed, thus resulting in number
of elements in xs remaining being the number of inversions.
*/
function graderVer1(arr) {
    function middle(n) {
        return math_floor(n / 2);
    }
    function take(xs, n) {
        return n === 0
               ? null 
               : pair(head(xs), take(tail(xs), n - 1));
    }
    function drop(xs, n) {
        return n === 0
               ? xs
               : drop(tail(xs), n - 1);
    }
    function merge(xs_with_count, ys_with_count) {
        const xs = head(xs_with_count);
        const ys = head(ys_with_count);
        const xs_inversions = tail(xs_with_count);
        const ys_inversions = tail(ys_with_count);
        const inversions = xs_inversions + ys_inversions;
        
        function merge_helper(xs, ys, merged_list, xs_remaining, 
                              ys_remaining, total_inversions) {
            if (is_null(xs)) {
                const merged = append(merged_list, ys);
                return pair(merged, total_inversions);
            } else if (is_null(ys)) {
                const merged = append(merged_list, xs);
                return pair(merged, total_inversions);
            } else {
                const x = head(xs);
                const y = head(ys);
                
                if (x < y) {
                    return merge_helper(tail(xs), ys, 
                                        append(merged_list, list(x)), 
                                        xs_remaining - 1, ys_remaining, 
                                        total_inversions);
                } else {
                    return merge_helper(xs, tail(ys), 
                                        append(merged_list, list(y)), 
                                        xs_remaining, ys_remaining - 1, 
                                        total_inversions + xs_remaining);
                }
            }
            }
        if (is_null(xs)) {
            return ys_with_count;
        } else if (is_null(ys)) {
            return xs_with_count;
        } else {
            const sorted_list_with_count = merge_helper(xs, ys, null, 
                                                        length(xs), length(ys), 
                                                        inversions);
            const sorted_list = head(sorted_list_with_count);
            const total_inversions = tail(sorted_list_with_count);
            return pair(sorted_list, total_inversions);
        }
    }
    function merge_sort_count(xs_with_count) {
        const xs = head(xs_with_count);
        const inversions = tail(xs_with_count);
        if (is_null(xs) || is_null(tail(xs))) {
            return pair(xs, 0);
        } else {
            const mid = middle(length(xs));
            const list_with_count = merge(merge_sort_count(pair(take(xs, mid), 
                                                                0)),
                                          merge_sort_count(pair(drop(xs, mid), 
                                                           0)));
            return list_with_count;
        }
    }
    return tail(merge_sort_count(pair(arr, 0)));
}

//TASK 3
/* Describe your solution here
For the first number in the triple, loop through each element in the list.
For the second number, loop through each element that is to the right of the
first number in the original list. For the third number, loop through each
element that is to the right of the third number in the original list.
Increase the number of out-of-order triples by 1 when the numbers are strictly
decreasing from the first to the third number in the triples. Otherwise, return
0.
*/

//TASK 4
/* Use the first number and iterate through the remaining list, thus going
to the second number in which it compares whether the head(arr) is smaller than
that of x, which will be the first element of arr. In the case it is smaller,
it can then move to the third number as it is strictly decreasing. It then
continues to compare whether it is smaller until it reaches the end of the list.
*/ 
function graderVer2(arr) {
  function first_num(arr) {
      return is_null(arr)
             ? 0
             : second_num(head(arr), tail(arr)) + first_num(tail(arr));
  }
  function second_num(x, arr) {
      return is_null(arr)
             ? 0
             : head(arr) < x
             ? third_num(x, head(arr), tail(arr)) + second_num(x, tail(arr))
             : second_num(x, tail(arr));
  }
  function third_num(x, y, arr) {
      return is_null(arr)
             ? 0
             : head(arr) < y
             ? 1 + third_num(x, y, tail(arr))
             : third_num(x, y, tail(arr));
  }
  return first_num(arr);
}

// test your program!
graderVer2(list(5, 2, 3, 1, 4)); // should return 2
