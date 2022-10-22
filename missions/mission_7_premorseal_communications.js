//TASK 1
function noise_sound(duration) {
    const wave = t => math_random() * 2 - 1;
    return make_sound(wave, duration);
}
//The function takes in a sound and changes the duration of it
//get_wave must be applied such that the duration actually applies to a sound
function cut_sound(sound, duration) {
    return make_sound(get_wave(sound), duration);
}

// Play test sound.
play(cut_sound(noise_sound(2), 1));

//TASK 2
//Use the math_sin function to get the sinewave
//Remember to multiply PI by the frequency to ensure that it's in the right
//frequency
function sine_sound(freq, duration) {
    const sine_wave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(sine_wave, duration);
}

// Play test sound.
play(sine_sound(500, 1));

//TASK 3
//Bring over the sine_sound function from before such that it can be used
function sine_sound(freq, duration) {
    const sine_wave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(sine_wave, duration);
}
/* The function takes in s1 and s2 as 2 arguments and is supposed to join the 2
sounds together in its respective durations. Using helper functions inside the 
function, you can get the duration of both sounds combined and bring in t such
that past the duration of the first sound, the second sound would play
t - duration for s1 for it to keep to its duration and the same for s2
The argument duration remains 0 for wave_combiner as it ensures that the waves
retain its duration
*/
function two_consecutively(s1, s2) {
    function sound_duration(s1, s2) {
        return get_duration(s1) + get_duration(s2);
    }
    function wave_combiner(s1, s2, duration) {
        return t => wave_combiner_with_period(t, s1, s2, duration);
    }
    function wave_combiner_with_period(t, s1, s2, duration) {
        return t <= duration + get_duration(s1)
               ? get_wave(s1)(t - duration)
               : get_wave(s2)(t - duration - get_duration(s1));
    }
    return make_sound(wave_combiner(s1, s2, 0), 
                      sound_duration(s1, s2));
}

const my_sine_1 = sine_sound(500, 1);
const my_sine_2 = sine_sound(750, 2);

// Play test sound.
play(two_consecutively(my_sine_1, my_sine_2));

//TASK 4

// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const sine_wave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(sine_wave, duration);
}
// Copy your own two_consecutively function from the previous question here.
function two_consecutively(s1, s2) {
    function sound_duration(s1, s2) {
        return get_duration(s1) + get_duration(s2);
    }
    function wave_combiner(s1, s2, duration) {
        return t => wave_combiner_with_period(t, s1, s2, duration);
    }
    function wave_combiner_with_period(t, s1, s2, duration) {
        return t < duration + get_duration(s1)
               ? get_wave(s1)(t - duration)
               : get_wave(s2)(t - duration - get_duration(s1));
    }
    return make_sound(wave_combiner(s1, s2, 0), 
                      sound_duration(s1, s2));
}
//Use recursion :D
/* Make sure to check the base case where the list is null 
The list of sounds stores the various sounds, 
where an element is [wave, duration]
*/
function consecutively(list_of_sounds) {
     function sound_duration(list_of_sounds) {
        return is_null(list_of_sounds)
               ? 0
               : tail(head(list_of_sounds)) 
                 + sound_duration(tail(list_of_sounds));
    }
    function wave_combiner(list_of_sounds, duration) {
        return t => wave_combiner_with_period(t, list_of_sounds, duration);
    }
    function wave_combiner_with_period(t, list_of_sounds, duration) {
        return t < duration + tail(head(list_of_sounds))
               ? head(head(list_of_sounds))(t - duration)
               : wave_combiner_with_period(t, tail(list_of_sounds),
                 duration + tail(head(list_of_sounds)));
    }
    return make_sound(wave_combiner(list_of_sounds, 0), 
                      sound_duration(list_of_sounds));
}


const my_sine_1 = sine_sound(500, 0.5);
const my_sine_2 = sine_sound(750, 1);
const my_sine_3 = sine_sound(625, 0.5);

// Play test sound.
play(consecutively(list(my_sine_1, my_sine_2, my_sine_3)));

// Task 5

// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const sine_wave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(sine_wave, duration);
}
// Copy your own two_consecutively function from the previous question here.
function two_consecutively(s1, s2) {
    function sound_duration(s1, s2) {
        return get_duration(s1) + get_duration(s2);
    }
    function wave_combiner(s1, s2, duration) {
        return t => wave_combiner_with_period(t, s1, s2, duration);
    }
    function wave_combiner_with_period(t, s1, s2, duration) {
        return t < duration + get_duration(s1)
               ? get_wave(s1)(t - duration)
               : get_wave(s2)(t - duration);
    }
    return make_sound(wave_combiner(s1, s2, 0), 
                      sound_duration(s1, s2));
}

// Copy your own consecutively function from the previous question here.
function consecutively(list_of_sounds) {
     function sound_duration(list_of_sounds) {
        return is_null(list_of_sounds)
               ? 0
               : tail(head(list_of_sounds)) 
                 + sound_duration(tail(list_of_sounds));
    }
    function wave_combiner(list_of_sounds, duration) {
        return t => wave_combiner_with_period(t, list_of_sounds, duration);
    }
    function wave_combiner_with_period(t, list_of_sounds, duration) {
        return t < duration + tail(head(list_of_sounds))
               ? head(head(list_of_sounds))(t - duration)
               : wave_combiner_with_period(t, tail(list_of_sounds),
                 duration + tail(head(list_of_sounds)));
    }
    return make_sound(wave_combiner(list_of_sounds, 0), 
                      sound_duration(list_of_sounds));
} 

const dot_duration = 0.125;
const dash_duration = 3 * dot_duration;

// Create dot, dash and pause sounds first.
const dot_sound = sine_sound(800, dot_duration);
const dash_sound = sine_sound(800, dash_duration);
const dot_pause = silence_sound(dot_duration);
const dash_pause = silence_sound(dash_duration);

// Create sounds for each letter.
//Ensure that for each sound, there is a silence that has the same length as dot
const S_sound = consecutively(list(dot_sound, dot_pause, 
                                   dot_sound, dot_pause, dot_sound));
const O_sound = consecutively(list(dash_sound, dot_pause, 
                                   dash_sound, dot_pause, dash_sound));

// Build the signal out of letter sounds and pauses.
//For letters, they are separated by a silence that has the same length as dash
const distress_signal = consecutively(list(S_sound, dash_pause, O_sound, 
                        dash_pause, S_sound));

// Play distress signal.
play(distress_signal);
