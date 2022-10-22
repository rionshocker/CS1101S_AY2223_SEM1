//TASK 1
const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));
/* For stacking, have to split the range between the 2 curves.
Translating is required so that the first curve is moved upwards
Scaling is also required such that each curve has its amplitude halved
*/
function stack(c1, c2) {
    return t =>
               t <= 0.5
               ? translate(0, 0.5, 0)(scale(1, 0.5, 0)(c1))(2 * t)
               : scale(1, 0.5, 0)(c2)(2 * t - 1);
}

// Test
draw_points(10000)(stack(test_curve, test_curve));

//TASK 2
const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));
/* Take the first curve as c1, and the other 2 curves as c2
frac is substituted into translate such that c1 is moved up and occupies frac
Frac is also inputed into frac such that the amplitude also matches the frac
*/
function stack_frac(frac, c1, c2) {
    return t =>
           t <= frac
           ? translate(0, 1 - frac, 0)(scale(1, frac, 1)(c1))((1 / frac) * t)
           : scale(1, 1 - frac, 1)(c2)((1 / frac) * t - 1);
}

// Test
draw_points(10000)
    (stack_frac(1 / 5,
                test_curve,
                stack_frac(1 / 2, test_curve, test_curve)));
