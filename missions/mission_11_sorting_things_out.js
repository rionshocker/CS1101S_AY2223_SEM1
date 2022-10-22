//TASK 1
/*Partition is supposed to take a list xs and a pivot element p, where it
returns a pair of lists with the head containing elements that are smaller than
or equal to p, and the tail contains those elements that are larger than p. We
can filter out the elements that are smaller than or equal to p for the head,
and filter those elements that are larger than p for the tail.
*/

function partition(xs, p) {
    return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
}

// Test
const my_list = list(1, 2, 3, 4, 5, 6);
partition(my_list, 4);

//TASK 2

function partition(xs, p) {
    return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
}
/* Quicksort is to take the head of the list as a pivot, and split the tail
using the partition function. first you partition the tail using the head as
the pivot, and then take the head of the pair of lists generated, which gives
the list of elements that are smaller than or equal to the pivot, which is the
head in this case. Then quicksort helps to sort that list. Do the same thing for
the list of elements that are larger than the pivot and pair them
with the head and append them together.
*/
function quicksort(xs) {
    return is_null(xs)
           ? null
           : append(quicksort(head(partition(tail(xs), head(xs)))), 
             pair(head(xs), quicksort(tail(partition(tail(xs), head(xs))))));
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);

//TASK 3
//Order of growth in time: θ(n);

//TASK 4
//Order of growth in time: θ(n^2);

//TASK 5
//Order of growth in time: θ(n log n);
