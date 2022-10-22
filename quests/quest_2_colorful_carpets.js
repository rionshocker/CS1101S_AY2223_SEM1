//TASK 1
function besiden(n, rune) {
    // your solution goes here
    return n === 1
           ? rune
           : beside_frac(1/n, rune, besiden(n-1, rune));
}

// Test
show(besiden(7, heart));

//TASK 2
function carpet(n, m, rune) {
    // your solution goes here
    return stackn(m, besiden(n, rune));
}

// Test
show(carpet(7, 5, heart));

//TASK 3
/*
Enter your answers here
(answer each question in one or two complete sentences):

(a) Every evaluation that happens will produce a 10x10 patchwork carpet made of hearts, where all the hearts will be assigned the same random colour.


(b) This is because the random_color function is assigned to the rune argument is evaluated first, resulting in all the runes having the same random colour.


(c) The result would be a 10x10 patchwork carpet made of hearts of random colours. 
This is due to the random_color function being deferred until it reaches a primitive operator and is required to be evaluated, resulting in the hearts having different colours assigned to them.

*/

//TASK 4
// you may need helper functions

function randomly_colored_carpet(n, m, rune) {
    // your solution goes here
    return n === 0
           ? rune
           : stack_frac(1/n, 
             randomly_colored_row_of_carpet(m, rune), 
             randomly_colored_carpet(n-1, m, rune));
}
function randomly_colored_row_of_carpet(m, rune) {
    return m === 1
           ? random_color(rune)
           : beside_frac(1/m, 
             random_color(rune), 
             randomly_colored_row_of_carpet(m-1, rune));
}
// Test
show(randomly_colored_carpet(10, 10, heart));
// should produce a carpet as shown in the title picture of this quest.
