//TASK 1
//No

//TASK 2
//No

//TASK 3
//Both the blue heart and red heart runes are viewable and either can be selected to be displayed.

//TASK 4
// The following are PREDECLARED:
// red, blue, stack, heart, nova, show
// Please do not import them.

function love(rune) {
    // edit the return expression
    return stack(red(heart), rune);
}

show(love(blue(nova)));

//TASK 5
// The following are PREDECLARED:
// show, stackn, quarter_turn_left, quarter_turn_right, turn_upside_down,
// and all the basic runes: nova, heart, etc.
// Please do not import them.
// Do not import the beside, besiden, beside_frac functions.
// They will not work.

function besiden(n, rune) {
    // edit the return expression
    return quarter_turn_left(stackn(n, quarter_turn_right(rune)));
}

show(besiden(5, heart));


//TASK 6
//4
