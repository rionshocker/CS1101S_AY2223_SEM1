//TASK 1
function fractal(pic, n) {
    // your answer here
    return n === 1
           ? pic
           : beside(pic, stack(fractal(pic, n-1), fractal(pic, n-1)));
}

// Test
show(fractal(make_cross(rcross), 5));

//TASK 3
function hook(frac) {
    // your answer here
   return stack(square, quarter_turn_right(stack_frac(frac, square, blank)));
   //return stack(square, beside_frac(1 - frac, blank, square));
}

// Test
show(hook(1 / 5));

//TASK 3
function spiral(thickness, depth) {
    // your answer here
    return depth === 0
           ? blank
           : stack_frac(thickness, 
             hook(thickness / 2), 
             quarter_turn_right(spiral(thickness, depth -1)));
}

// copy your hook function from Question 2 here if required
function hook(frac) {
   return stack(square, quarter_turn_right(stack_frac(frac, square, blank)));
}
// Test
show(spiral(1 / 5, 20));
