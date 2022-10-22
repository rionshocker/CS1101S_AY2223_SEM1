function persian(rune, count) {
    // your answer here
    return beside_frac(
           1 / count, persian_left_and_right(rune, count),
           beside_frac(1 - 1 / (count - 1),
           stack_frac(1/count, persian_top_and_bottom(rune, count - 2), 
           stack_frac(1 - 1 / (count - 1), persian_center(rune), persian_top_and_bottom(rune, count -2))),
           persian_left_and_right(rune, count)));
}

function persian_center(rune) {
    return stack(
           beside(quarter_turn_right(rune), quarter_turn_right(quarter_turn_right(rune))),
           beside(rune, quarter_turn_left(rune)));
}

function persian_top_and_bottom(rune, count) {
    return count === 1
           ? rune
           : beside_frac(1 / count, rune, persian_top_and_bottom(rune, count -1));
}

function persian_left_and_right(rune, count) {
    return stackn(count, rune);
}
// Tests
show(persian(heart, 7));
show(persian(make_cross(rcross), 5));
const paw = from_url("https://i.imgur.com/GJg95B8.png");
show(persian(paw, 5));
