//TASK 1
const drum_envelope = adsr(0.05, 0.95, 0, 0);

//Snare drum takes in the basic sound noise, ignoring the note taken in
//Drum envelope is then applied to the sound.
function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}
/* Bass drum takes in a basic sound that is an aharmonic simultaneous cluster
of sine waves, which are prime number frequencies. As it is a simultaneous 
cluster, simultaneously is applied to the waves such that they are played 
simultaneously.
Mapping allows us to process the list, mapping the function to create the 
sine sound to each frequency in the list.
*/
function bass_drum(note, duration) {
    function create_sine_sound(frequency) {
        return sine_sound(frequency, duration);
    }
    const list_of_prime_frequencies = list(79, 
                                           83, 
                                           89, 
                                           97, 
                                           101, 
                                           107, 
                                           109, 
                                           113, 
                                           127, 
                                           131, 
                                           137, 
                                           139, 
                                           149);
    const create_prime_waves = map(create_sine_sound, 
                                   list_of_prime_frequencies);                   
    return simultaneously(create_prime_waves);
}
//Mute just returns a silent sound of the given duration
function mute(note, duration) {
    return silence_sound(duration);
}

// Test
play(snare_drum(50, 0.2));
play(bass_drum(50, 0.2));

play(consecutively(list(snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2),
                        mute(0, 0.2),
                        snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2))));

//TASK 2
/*The generate_list_of_note function is supposed to take in a base note and a 
list of intervals and return a list of MIDI notes. A helper function can be used
to help to create a list of MIDI notes as the MIDI notes are formed by adding
the intervals to the previous note.
*/
function generate_list_of_note(letter_name, list_of_interval) {
    const midi_base_note = letter_name_to_midi_note(letter_name);
    function generate_list_of_note_helper(list, accumulated_note) {
        return is_null(list)
               ? null
               : pair(head(list) + accumulated_note,
                      generate_list_of_note_helper(tail(list), 
                                                   head(list) 
                                                   + accumulated_note));
    }
    return append(list(midi_base_note), 
                  generate_list_of_note_helper(list_of_interval, 
                                               midi_base_note));
}

const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, 
                                  -1, -2, -2, -2, -1, -2, -2);
const c_major_scale = generate_list_of_note("C4", major_scale_interval);
//To display the list of MIDI notes for the c_major_scale
display(c_major_scale);
/*The list_to_sound function is meant to convert the list of MIDI notes to a
sound, which is essentially mapping an instrument to each note such that it is
being played.
*/
function list_to_sound(list_of_midi_note, duration, instrument) {
    function make_instrument_sound(midi_note) {
        return instrument(midi_note, duration);
    }
    return consecutively(map(make_instrument_sound, list_of_midi_note));
}

const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);
play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, 
                                           -1, -3, -1, -2, -2, -1, -2);

const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, 
                                          -2, -2, -1, -2, -2, -1, -2);


const c_harmonic_minor_scale = generate_list_of_note("C4", 
                               harmonic_minor_scale_interval);
const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 
                                                     0.4, cello);
play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note("C4", 
                              melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 
                                                    0.4, cello);
play(c_melodic_minor_scale_sound);

//TASK 3
// copy your functions generate_list_of_note and list_to_sound
// from the previous Question here
function generate_list_of_note(letter_name, list_of_interval) {
    const midi_base_note = letter_name_to_midi_note(letter_name);
    function generate_list_of_note_helper(list, accumulated_note) {
        return is_null(list)
              ? null
              : pair(head(list) + accumulated_note,
                      generate_list_of_note_helper(tail(list), 
                                                  head(list) 
                                                  + accumulated_note));
    }
    return append(list(midi_base_note), 
                  generate_list_of_note_helper(list_of_interval, 
                                              midi_base_note));
}
function list_to_sound(list_of_midi_note, duration, instrument) {
    function make_instrument_sound(midi_note) {
        return instrument(midi_note, duration);
    }
    return consecutively(map(make_instrument_sound, list_of_midi_note));
}

const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);
//To generate the arpeggio notes, you can generate a list of notes using the
//function created in the previous question.
function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}
/* To better understand how it works, the arpeggiator_up function is supposed
to take in a list of arpeggio notes, and returns the sound which gets the first
4 notes, and then restarts the sound but starts one step up, with the usual 
scale repeating itself 4 times, as such having the base case n > 3. We can group
the notes into groups of 4, thus having n = 4, in which, it will then reach its
highest note in the last group of 4. 
*/
function arpeggiator_up(arpeggio, duration_each, instrument) {
    function arpeggiator_up_helper(arpeggio, duration_each, instrument, n) {
        return n > 3
              ? null
              : append(create_sub_arpeggiator_up(arpeggio, duration_each, 
                                                 instrument, 4), 
                  arpeggiator_up_helper(tail(arpeggio), duration_each, 
                                        instrument, n + 1));
    }
    function create_sub_arpeggiator_up(arpeggio, duration_each, instrument, n) {
        return n < 1
              ? null
              : pair(instrument(head(arpeggio), duration_each), 
                create_sub_arpeggiator_up(tail(arpeggio), duration_each, 
                                          instrument, n - 1));
    }
    return length(arpeggio) < 4
          ? silence_sound(0)
          : consecutively(arpeggiator_up_helper(arpeggio, duration_each, 
                                                instrument, 0));
}

//Test
play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 
                                       0.1, cello));
//Test to understand the function better
// function create_sub_arpeggiator_up(arpeggio, duration_each, instrument, n) {
//     return n < 1
//           ? null
//           : (pair(instrument(head(arpeggio), duration_each), create_sub_arpeggiator_up(tail(arpeggio), duration_each, instrument, n - 1)));
// }
// play(consecutively(create_sub_arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1, cello, 4)));
// const a1 = generate_arpeggio("C4", major_arpeggio_interval);
// a1;
// head(a1);
// play(cello(head(a1), 0.1));
// tail(a1);
// head(tail(a1));
// a1;

//TASK 4
/*The simplify_rhythm function is supposed to take in a rhythm and simplify it,
in which if there is a pair in it, it is supposed to repeat the head of the pair
by tail times, and its supposed to flatten the rhythm into a simple list. As
such, if the head is a number, it is taken and appended to the new list, and it
continues to process the rhythm until every single part is simplified.
*/

function simplify_rhythm(rhythm) {
    function simplify_pair_rhythm(rhythm, n) {
        return n === 0
              ? null
              : append(simplify_rhythm(rhythm), simplify_pair_rhythm(rhythm,
                                                                     n - 1));
  }

  return is_list(rhythm)
         ? is_number(head(rhythm))
            ? rhythm
            : accumulate((x, y) => append(simplify_rhythm(x), y), null, rhythm)
         : simplify_pair_rhythm(head(rhythm), tail(rhythm));
}


// Test
const my_rhythm = pair(list(pair(list(1,2,0,1), 2), list(1,3,0,1,3,1,0,3)), 3);
const my_simple_rhythm = simplify_rhythm(my_rhythm);
display_list(my_simple_rhythm);

const correct_simple_rhythm = list(1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,
        2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3);
equal(my_simple_rhythm, correct_simple_rhythm);

//TASK 5
/* The sounds need to be played simultaneously BUT do not do recursion with
the simultaneously function as it causes the amplitude to decrease every round
of recursion, resulting in a decreasing amplitude every round. Ensure that a
list goes through the simultaneously function. To allow the function to know
when to stop, we can use the length of the list of sounds, in this case having
to map the list_of_sounds to the rhythm such that the sounds are played in the
correct order. At the end, return a null, such that the sound ends, and a list
is actually returned. As each next sound is supposed to start 0.5s after the
start of the previous sound, simultaneously is required.
A way to think this through is to create a list of all the sounds supposed to 
be played in that certain order, with there being lists in the big list. Then
use simultaneously to prevent to decrease in amplitude due to recursion.
*/
function percussions(distance, list_of_sounds, rhythm) {
    const new_list_of_sounds = map(n => list_ref(list_of_sounds, n), 
                                   simplify_rhythm(rhythm));
    function percussions_helper(distance, list_of_sounds, start, stop) {
        return start === stop
              ? null
              : append(list(consecutively(list(silence_sound(start * distance), 
                head(list_of_sounds)))), percussions_helper(distance, 
                                        tail(list_of_sounds), start + 1, stop));
    }
    return simultaneously(percussions_helper(distance, new_list_of_sounds, 0, 
                                             length(new_list_of_sounds)));
}

// Test
const my_mute_sound = mute(50, 0.7);
const my_snare_drum = snare_drum(50, 0.7);
const my_cello = cello(50, 0.7);
const my_bell = bell(72, 1);
play(percussions(0.5,
         list(my_mute_sound,
              my_snare_drum,
              my_cello,
              my_bell),
         list(1,2,1,0,3,1,0)));
//Test to see that what needs to go through is a list
//play(simultaneously(list(consecutively(list(my_snare_drum, my_mute_sound)), consecutively(list(my_mute_sound, my_cello)))));
// list(consecutively(list(my_snare_drum,my_mute_sound)));
// list(consecutively(list(silence_sound(0), my_snare_drum)), consecutively(list(silence_sound(0.5), my_cello)), consecutively(list(silence_sound(1.0), my_snare_drum)));
