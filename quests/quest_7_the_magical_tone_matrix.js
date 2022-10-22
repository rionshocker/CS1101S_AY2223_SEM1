// Question 1

// copy generate_list_of_note from Mission "Musical Diversions"
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
const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

// repeat_pattern from Lecture L2
//Function supposed to help repeat the list n times, thus doing recursion
function repeat_list_of_interval(n, list_of_interval, accumulated_list) {
    return n === 0 
           ? accumulated_list 
           : repeat_list_of_interval(n - 1, list_of_interval, 
                                    append(list_of_interval, accumulated_list));
}
//using the repeated list, you can then get the list of notes
//Map the instrument to the note, and create the list of sounds
function repeated_scale(note, list_of_interval, n, duration, instrument) {
    const repeated_list_of_intervals = repeat_list_of_interval(n, 
                                                        list_of_interval, null);
    const list_of_notes = generate_list_of_note(note, repeated_list_of_intervals);
    const list_of_sounds = map(note => instrument(note, duration), list_of_notes);
    return list_of_sounds;
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));

// Question 2
/* play_matrix is supposed to play the tone matrix, in which the sounds in the 
columns play duration seconds later
Convert the matrix to columns and then accumulate the sounds together
get_matrix() returns a list of boolean values, thus the function 
accumulate_column_sound takes the bool and if it is true, then result in a list
of the sounds there and plays it simultaneously. Otherwise it returns the prev
sounds and reevaluates.
The function column_sounds then creates the list of the sounds using the prev
function, to be further evaluated and inserted as an argument for play_matrix.
Then the function play_all_column_sounds is then evaluated to check whether the
list is empty or not. If it is empty, then it plays the original list, otherwise
it plays the column sounds concurrently using set_timeout.
Duration is multiplied by 1000 such that after 500 milliseconds the function is
called, in which it would be duration seconds.
*/
function play_matrix(duration, list_of_sounds) {
  function matrix_to_columns(matrix) {
    return is_null(head(matrix))
      ? null
      : pair(map(head, matrix), matrix_to_columns(map(tail, matrix)));
  }

  function accumulate_column_sound(column_list, sound) {
    return accumulate(
      (bool, accum_sound) =>
        bool ? simultaneously(list(sound, accum_sound)) : accum_sound,
      silence_sound(0),
      column_list
    );
  }

  function column_sounds(column_list, list_of_sounds) {
    return is_null(column_list)
      ? null
      : pair(
          accumulate_column_sound(head(column_list), head(list_of_sounds)),
          column_sounds(tail(column_list), tail(list_of_sounds))
        );
  }

  function play_all_column_sounds(
    column_sounds_list,
    duration,
    original_column_sounds_list
  ) {
    if (is_null(column_sounds_list)) {
      play_all_column_sounds(original_column_sounds_list, duration,
                             original_column_sounds_list);
    } else {
      set_timeout(() => {
        play_concurrently(head(column_sounds_list));
        play_all_column_sounds(tail(column_sounds_list), duration,
                               original_column_sounds_list);
      }, duration * 1000);
    }
  }

  const matrix = get_matrix();
  const column_list = matrix_to_columns(matrix);
  const column_sounds_list = column_sounds(column_list, list_of_sounds);

  return play_all_column_sounds(column_sounds_list, duration,column_sounds_list);
}
//The function cancels all previously scheduled but not started jobs, which 
//essentially halts it to a stop as the function will not continue evaluating.
function stop_matrix() {
  return clear_all_timeout();
}

// copy your solution of Question 1 here
function generate_list_of_note(letter_name, list_of_interval) {
  const midi_base_note = letter_name_to_midi_note(letter_name);

  function generate_list_of_note_helper(list_of_interval, accumulated_note) {
    return is_null(list_of_interval)
      ? null
      : pair(
          head(list_of_interval) + accumulated_note,
          generate_list_of_note_helper(
            tail(list_of_interval),
            head(list_of_interval) + accumulated_note));
  }

  return append(list(midi_base_note),
                generate_list_of_note_helper(list_of_interval, midi_base_note));
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_list_of_interval(n, list_of_interval, accumulated_list) {
    return n === 0 
           ? accumulated_list 
           : repeat_list_of_interval(n - 1, list_of_interval, 
                                    append(list_of_interval, accumulated_list));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    const repeated_list_of_intervals = repeat_list_of_interval(n, 
                                                        list_of_interval, null);
    const list_of_notes = generate_list_of_note(note, repeated_list_of_intervals);
    const list_of_sounds = map(note => instrument(note, duration), list_of_notes);
    return list_of_sounds;
}

const sounds = repeated_scale("C4", pentatonic_list_of_interval, 3, 0.2, cello);

play_matrix(0.5, sounds);
