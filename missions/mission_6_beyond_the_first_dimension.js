//TASK 1
/*Recall the fractal function
Recursion function which applies transformation the same number of times as
the given level
*/
function fractal(level, transformation, curve) {
    return level === 0
           ? curve
           : transformation(fractal(level - 1, transformation, curve));
}

function levycize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_rigidly(
        (rotate_around_origin(0, 0, math_PI / 4))(scaled_curve),
        (translate(0.5, 0.5, 0))
            ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve)));
}

// Test
draw_connected_full_view_proportional(10000)
    (fractal(11, levycize, unit_line));

//TASK 2
//Fractal function from Q1 to be used for testing
function fractal(level, transformation, curve) {
    return level === 0
           ? curve
           : transformation(fractal(level - 1, transformation, curve));
}
/*To dragonize it, inversion has to be applied to the 2 curves that are being
connected
*/
function dragonize(curve) {
    return put_in_standard_position(connect_ends
            (invert(
            (rotate_around_origin(0, 0, -math_PI / 2))(curve)), curve));
}

// Test
draw_connected_full_view_proportional(10000)
    (fractal(11, dragonize, unit_line));

//TASK 3
function kochize(curve) {
    const up_60 = rotate_around_origin(0, 0, math_PI / 3);
    const down_60 = rotate_around_origin(0, 0, - math_PI / 3);
    return put_in_standard_position(
               connect_ends(curve,
                            connect_ends(up_60(curve),
                                         connect_ends(down_60(curve),
                                                      curve))));
}
//Bring back the fractal function to do recursion for kochize
function fractal(level, transformation, curve) {
    return level === 0
           ? curve
           : transformation(fractal(level - 1, transformation, curve));
}
/*Fractal only forms the top part of the snowflake
The snowflake can be split into 3 equal parts, being the top, left and right
Rotation needs to be done such that it is placed smoothly, with right being
an inverse of the left, thus having -2 times.
Connect_ends allows the three different parts to join up at its ends, thus
forming the snowflake pattern.
*/
function snowflake(n) {
    const top_of_snowflake = fractal(n, kochize, unit_line);
    const left_of_snowflake = rotate_around_origin(
                              0, 0, (2 * math_PI) / 3)(top_of_snowflake);
    const right_of_snowflake = rotate_around_origin(
                               0, 0, -(2 * math_PI) / 3)(top_of_snowflake);
    return connect_ends(left_of_snowflake, 
           connect_ends(top_of_snowflake, right_of_snowflake));
}

// Test
draw_connected_full_view_proportional(10000)(snowflake(5));
