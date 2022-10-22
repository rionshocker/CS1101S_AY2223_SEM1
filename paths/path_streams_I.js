//Q1
//The function returns a stream when applied to no arguments.

//Q2
//One window pops up and after a button is pressed, prompt_stream refers to a stream.

//Q3
//The program successively pops up three windows and returns the last entered string.

//Q4
//The program keeps popping up new windows and never returns a value.

//Q5
//No.

//Q6
function n_of_n_stream() {
    // YOUR SOLUTION HERE
   function helper(n, k) {
       return (k === 0)
              ? helper(n + 1, n + 1)
              : pair(n, () => helper(n, k - 1));
   }
   return helper(1, 1);
}

//Q7
function shorten_stream(s, k) {
    // YOUR SOLUTION HERE
    return k === 0 || (is_null(s))
           ? null 
           : pair(head(s), () => shorten_stream(stream_tail(s), k - 1));
}
