//TASK 1
function steps(r1, r2, r3, r4){
    // your answer here
    return overlay(
           overlay(mosaic(blank, blank, blank,r4), mosaic(blank, blank, r3, blank)),
           overlay(mosaic(blank, r2, blank, blank), mosaic(r1, blank, blank, blank)));
}
function mosaic(r1, r2, r3, r4){
    return stack(beside(r4, r1), beside(r3, r2));
}
// Tests
show(steps(rcross, triangle, corner, nova));
hollusion(steps(rcross, triangle, corner, nova));

//TASK 2
function cone(n, rune){
    // your answer here
    return n === 1
           ? rune
           : overlay_frac(1 - 1/n, scale(1 - 1/n, cone(n-1, rune)), rune);
}
// Tests
show(cone(4, circle));
hollusion(cone(15, circle));
