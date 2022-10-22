//TASK 1
/*The function takes a binary search tree of strings, and returns a string,
with the strings separated by a semicolon and a space in alphabetical order.
And as the left branch is always smaller than the right, we can string the left
branch first. 
*/
function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
           ? ""
           :binary_search_tree_to_string(left_branch(bst)) + entry(bst) + "; "
            + binary_search_tree_to_string(right_branch(bst));
}

const h = make_tree("h", make_empty_tree(), make_empty_tree());
const a = make_tree("a", make_empty_tree(), make_empty_tree());
const n = make_tree("n", h, make_empty_tree());
const c = make_tree("c", a, make_empty_tree());
const test_bst = make_tree("e", c, n);

// Test
 binary_search_tree_to_string(test_bst);
// binary_search_tree_to_string(cadet_names);

//TASK 2
/* Function find is supposed to search if name occurs in the tree, thus
having the base case if the tree is empty, it returns false, and then goes
through each branch to search for the name if the entry is not the name that
is being searched.
*/
function find(bst, name) {
    return is_empty_tree(bst)
           ? false
           : equal(entry(bst), name)
           ? true
           : find(left_branch(bst), name) || find(right_branch(bst), name);
}

// Test
// find(cadet_names, "your name");

//TASK 3
/* The function insert takes bst and item and returns a new bst that contains
the item and all the data items in bst. To fulfill the definition of a binary
search tree, the order of the strings matter, thus you will have to compare the
item to be inserted with the entries in the bst. If the item is before the entry
in alphabetical order, then it will be inserted into the left_branch and then the
check will go through the entire left_branch to ensure it is inserted correctly.
The same will go for the right side in the case the item is after the entry in
alphabetical order.
*/
function insert(bst, item) {
        return is_empty_tree(bst)
               ? make_tree(item, make_empty_tree(), make_empty_tree())
               : item < entry(bst)
               ? make_tree(entry(bst), insert(left_branch(bst), item), 
                 right_branch(bst))
               : make_tree(entry(bst), left_branch(bst), 
                 insert(right_branch(bst), item));
}



// Copy your binary_search_tree_to_string function here from Task 1.
function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
           ? ""
           :binary_search_tree_to_string(left_branch(bst)) + entry(bst) + "; "
            + binary_search_tree_to_string(right_branch(bst));
}


// Test

// binary_search_tree_to_string(insert(make_empty_tree(), "x"));
// Should produce "x; "

// const bst = accumulate((item, bst) => insert(bst, item),
//                       make_empty_tree(),
//                       list("g", "a", "r", "x", "p"));
// binary_search_tree_to_string(bst);
// Should produce "a; g; p; r; x; "

// const cadet_names_with_aaaaron =  insert(cadet_names, "AAAARON NORAAAA");
// binary_search_tree_to_string(cadet_names_with_aaaaron);
// // Should produce "AAAARON NORAAAA; ..."
