//TASK 1
// Part 1
// your answer here (keep your answer commented)
// The type of the unit_line_at function is unit_line_at : (Number) -> Curve


// Part 2
/*The line starts at the point thus the x-value stays the same while the
multiplication of length to x changes the range of x to [0, length]
The range is then changed to [y_of(pt), y_of(pt) + length]
*/
function vertical_line(pt, length) {
    return x => make_point(x_of(pt), x * length + y_of(pt));
}


// Part 3
// your answer here (keep your answer commented)
// vertical_line : (Point, Number) -> Curve


// Part 4
// your answer here
draw_connected(200)(vertical_line(make_point(0.5, 0.25), 0.5));

//TASK 2
function three_quarters(pt) {
    /* Multiply r by 0.75 to make it only be three-quarters of its original value
    */
    return r => make_point(math_cos(2 * math_PI * 0.75 * r) + x_of(pt), 
                           math_sin(2 * math_PI * 0.75 * r) + y_of(pt));
}

// Test
draw_connected_full_view_proportional(200)(three_quarters(make_point(0.5, 0.25)));


//Technically can negate both x and y coordinates here before Q3

//TASK 3
function s_generator(pt) {
/* We have to split the S into the upper three-quarter circle and lower circle
Having to ensure that the S is drawn in a single direction, inverse the x and y
axis by giving a negative sign to the upper circle.
Flip it horizontally and vertically to ensure that
It is drawn in the same direction as the lower circle.
Remove the negative sign for the bottom circle and ensure it forms a full 3/4
circle by doubling it due to decreased range of 0.5 to 1.0
*/
    /*return t =>
        t < 0.5
        ? make_point(-math_sin(
                     2 * math_PI * 0.75 * 2 * (0.5 - t)) + x_of(pt),
                     -math_cos(
                     2 * math_PI * 0.75 * 2 * (0.5 - t)) + y_of(pt) + 1)
        : make_point(math_sin(
                     (2 * math_PI * 0.75 * (t - 0.5)) * 2) + x_of(pt),
                     math_cos(
                     (2 * math_PI * 0.75 * (t - 0.5)) * 2) + y_of(pt) - 1);
    */
    
/* For this method, the x and y axis have to be inverted for the bottom circle
instead due to how the circle is being drawn.
*/
   return t =>
        t < 0.5
        ? make_point(math_cos(
                     2 * math_PI * 0.75 * 2 * t) + x_of(pt),
                     math_sin(
                     2 * math_PI * 0.75 * 2 * t) + y_of(pt) + 1)
        : make_point(math_sin(
                     (2 * math_PI * 0.75 * (t - 0.5)) * 2) + x_of(pt),
                     math_cos(
                     (2 * math_PI * 0.75 * (t - 0.5)) * 2) + y_of(pt) - 1);
  
}

// Test
draw_connected_full_view_proportional(200)(s_generator(make_point(0.5, 0.25)));
