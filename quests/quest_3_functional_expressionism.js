//TASK 1
/*increment_repeater takes in the function repeater which takes the form
repeater(f)(x)
*/
const increment_repeater =
    repeater => f => x => f(repeater(f)(x));    // complete the
                        // lambda expression

const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT");          // should display "ALERT"
                        // three times in orange
const bigwarn = fourtimes(display);
bigwarn("A L E R T");   // should display "A L E R T"
                        // four times in orange
                        // (the REPL will display
                        // "A L E R T"a fifth time
                        // [in white] as the value
                        // returned by bigwarn)

//TASK 2
const pair = (x, y) => f => f(x, y);

/*head and tail takes pair as the argument 
with x representing head and y representing tails
*/
const head = p => p((x, y) => x);  // complete lambda expression
const tail = p => p((x, y) => y);  // complete lambda expression

head(pair(1, 2)) === 1; // should return true
tail(pair(1, 2)) === 2; // should return true

//TASK 3
/*

enter your answer here; no explanation required
A suitable lower bound is n.
*/

//This is due to there being a linear increase in number of deferred operations.

//TASK 4
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);
//increment_repeater is supposed to take in f and x 
const increment_repeater = repeater => f => x => 
                        f(repeater, () => repeater(f)(x));
//add_repeaters is supposed to take in repeater1 and repeater2 as arguments
//repeater1 then goes through repeater2 to add up the repeat counts
const add_repeaters = (repeater1, repeater2) => f => x => 
      repeater2(f)(repeater1(f)(x));

to_int(add_repeaters(two_repeater,
                     three_repeater));  // should return 5
               
               
//To test to ensure that increment_repeater can be inputted into to_int                    
//to_int(increment_repeater(one_repeater));

//TASK 5
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

//Consider case where repeater repeats 0 times
//Repeater stores both the count as well as the previous repeater
//Decreasing can be done by taking the previous repeater stored.

const decrement_repeater = repeater => 
to_int(repeater) === 0
? repeater
: repeater((previous_repeater, count) => previous_repeater)(0);

//To test the decrement_repeater
to_int(decrement_repeater(three_repeater));  // should return 2
//to_int(decrement_repeater(zero_repeater));
//to_int(decrement_repeater(one_repeater));
//to_int(decrement_repeater(two_repeater));
