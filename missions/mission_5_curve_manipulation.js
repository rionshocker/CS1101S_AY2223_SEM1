//TASK 1
// To make it reflect through the y-axis, the x-values should be become negative
function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}
//Using the s-generator to get an S curve that starts from the top right and
//ends on the bottom left
function s_generator(pt) {
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
//Testing to see if it does indeed reflect properly
const my_s = s_generator(make_point(0,0));
(draw_connected_full_view_proportional(200))(reflect_through_y_axis(my_s));

//TASK 2
/*The function close should take in a curve and returns a curve that has the
same points as the original curve but starts and ends at the same point
Thus it can be interpreted as it overlaying itself once going from the start to
end and back from the end to the start
Thus for after t = 0.5, then the curve takes a reverse direction
This is explained by the 1 - (2 * t - 1) as it reverse it
*/
function close(curve) {
    return t => 
        t <= 0.5
        ? curve(2 * t)
        : curve(1 - (2 * t - 1));
}
//Using back the reflect_through_y_axis from Q1
function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}

function s_generator(pt) {
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
//Testing for the heart-shape
const my_s_curve = s_generator(make_point(0,0));
draw_connected_full_view_proportional(200)(
    connect_ends(close(my_s_curve), reflect_through_y_axis(my_s_curve)));
