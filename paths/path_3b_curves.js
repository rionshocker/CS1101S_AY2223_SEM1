//TASK 1
function diagonal(t) {
    // your answer here
    return make_point(t, t);
}

// Test
draw_points(50)(diagonal);

//TASK 2
function unit_square(t) {
    // your answer here
    return t <= 0.25 
           ? make_point(4 * t, 0)
           : t <= 0.5
           ? make_point(1, 4 * (t - 0.25))
           : t <= 0.75
           ? make_point(-4 * (t - 0.75), 1)
           : make_point(0, -4 * (t - 1));
}

// Test
draw_points_full_view_proportional(80)(unit_square);
