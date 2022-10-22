//TASK 1
//For a sound to be played backwards, it needs to be played from 1 to 0 instead
//of 0 to 1. get_duration(sound) - t does that.

function backward(sound) {
    return make_sound(
        t => get_wave(sound)(get_duration(sound) - t), get_duration(sound));
}

//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(backward(my_voice()));          // step 3 in REPL

//TASK 2
/* For the repeat function, it takes in n as the number of times it will repeat
and takes in a sound that it will repeat. Recursion can be used to create a
list of sounds that contains the same sound repeated n times.
*/
function repeat(n, sound) {
    return n === 0
           ? silence_sound(0)
           : consecutively(list(sound, repeat(n -1, sound)));
}

// Test
const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = repeat(3, my_sound);
play(my_repeated);

//TASK 3
/*For the fast forward function, it increases the speed of the sound, which in
turn decreases the duration of the sound by the same factor, n. So the speed is
increased by (n * t) as t increases from 0 to 1 at n rate, while the duration is
cut by n.
*/

function fast_forward(n, sound) {
    return make_sound(t => get_wave(sound)(n * t), get_duration(sound) / n); 
}

//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(fast_forward(2, my_voice()));   // step 3 in REPL

//TASK 4
/* For the echo function, it takes in n, which is the number of echoes the 
sound will produce, d, the delay in which the echo will have from the previous
sound, and the sound itself. A helper function is used to help ensure that the
function stops at the exact point when n echoes are produced. As each echo will
have half the amplitude compared to the previous sound, 1 / math_pow(2, count)
will help to ensure that as the number of echoes increases, it is halved.
It also checks to ensure that when t increases and when it's more than the delay
multiplied by the counts, then another echo is created. Otherwise no more echoes
are created.
*/
function echo(n, d, sound) {
    function echo_helper(t, n, wave, count) {
        return count > n
               ? 0
               : ((t > d * count) 
                  ? (1 / math_pow(2 ,count)) * wave(t - d * count) : 0) 
                + echo_helper(t, n, wave, count + 1);
    }
    return make_sound(
           t => get_wave(sound)(t) + echo_helper(t, n, get_wave(sound), 1), 
                                     get_duration(sound) + n * d);
}

// Test
const test_sound = sine_sound(800, 0.2);
play(echo(2, 0.4, test_sound));

//TASK 5
/* A list has to be created of the different variants of the sound, using the
previous functions created. Then the function would then be able to search
through the list according to the index given, for e.g. when the index is 2, it
is played at half speed.
Ensure that for the backward echo, it echoes the backward sound and not backward
the echoed sound :/
*/
function make_alien_jukebox(sound) {
    const original_recording = sound;
    const backward_recording = backward(sound);
    const half_speed_recording = fast_forward(0.5, sound);
    const double_speed_repeat_thrice_recording = repeat(3, 
                                                        fast_forward(2, sound));
    const backward_echo_four_times_recording = echo(4, 0.3, backward(sound));
    const jukebox_list = list(original_recording, 
                              backward_recording,
                              half_speed_recording,
                              double_speed_repeat_thrice_recording,
                              backward_echo_four_times_recording);
    
    return n => play(list_ref(jukebox_list, n));
}
