//TASK 1

// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive.
// where 0 - 9 represent the digits
// 10 represents *, 11 represents #,
// and 12 - 15 represent the letters A-D.

/* To utilise the frequency table, create separate lists for the rows and 
columns of the frequency table and pair them up according to the numbers
assigned. Allow it to search through the pairs and then find the specific 
frequencies in the rows and columns and return it as a pair.
*/
function get_dtmf_frequencies(number) {
    const freq_row = list(697, 770, 852, 941);
    const freq_column = list(1209, 1336, 1477, 1633);
    const dtmf_frequencies_coordinates = list(
                                              pair(3, 1),
                                              pair(0, 0),
                                              pair(0, 1),
                                              pair(0, 2),
                                              pair(1, 0),
                                              pair(1, 1),
                                              pair(1, 2),
                                              pair(2, 0),
                                              pair(2, 1),
                                              pair(2, 2),
                                              pair(3, 0),
                                              pair(3, 2),
                                              pair(0, 3),
                                              pair(1, 3),
                                              pair(2, 3),
                                              pair(3, 3));
    const dtmf_frequencies_coordinate = list_ref(dtmf_frequencies_coordinates, 
                                                 number);
    return pair(list_ref(freq_row, head(dtmf_frequencies_coordinate)),
                list_ref(freq_column,tail(dtmf_frequencies_coordinate)));
    
}

//To test whether it works
get_dtmf_frequencies(0);

//TASK 2

// Copy your function get_dtmf_frequencies here.
function get_dtmf_frequencies(number) {
    const freq_row = list(697, 770, 852, 941);
    const freq_column = list(1209, 1336, 1477, 1633);
    const dtmf_frequencies_coordinates = list(
                                              pair(3, 1),
                                              pair(0, 0),
                                              pair(0, 1),
                                              pair(0, 2),
                                              pair(1, 0),
                                              pair(1, 1),
                                              pair(1, 2),
                                              pair(2, 0),
                                              pair(2, 1),
                                              pair(2, 2),
                                              pair(3, 0),
                                              pair(3, 2),
                                              pair(0, 3),
                                              pair(1, 3),
                                              pair(2, 3),
                                              pair(3, 3));
    const dtmf_frequencies_coordinate = list_ref(dtmf_frequencies_coordinates, 
                                                 number);
    return pair(list_ref(freq_row, head(dtmf_frequencies_coordinate)),
                list_ref(freq_column,tail(dtmf_frequencies_coordinate)));
    
}

/* The function is to take a pair of frequencies and return a sound that
is an overlay of the two waves simultaneously
Create the two sine waves using the head and tail of the pair as it contains
the two different frequencies and ensure that the duration is half a second long
Then use simultaneously to overlay them simultaneously
*/
function make_dtmf_tone(frequency_pair) {
    const sine_wave_1 = sine_sound(head(frequency_pair), 0.5);
    const sine_wave_2 = sine_sound(tail(frequency_pair), 0.5);
    
    return simultaneously(list(sine_wave_1, sine_wave_2));
}

//To test whether it works
play(make_dtmf_tone(get_dtmf_frequencies(15)));

//TASK 3

// Copy your functions get_dtmf_frequencies and make_dtmf_tone here.
function get_dtmf_frequencies(number) {
    const freq_row = list(697, 770, 852, 941);
    const freq_column = list(1209, 1336, 1477, 1633);
    const dtmf_frequencies_coordinates = list(
                                              pair(3, 1),
                                              pair(0, 0),
                                              pair(0, 1),
                                              pair(0, 2),
                                              pair(1, 0),
                                              pair(1, 1),
                                              pair(1, 2),
                                              pair(2, 0),
                                              pair(2, 1),
                                              pair(2, 2),
                                              pair(3, 0),
                                              pair(3, 2),
                                              pair(0, 3),
                                              pair(1, 3),
                                              pair(2, 3),
                                              pair(3, 3));
    const dtmf_frequencies_coordinate = list_ref(dtmf_frequencies_coordinates, 
                                                 number);
    return pair(list_ref(freq_row, head(dtmf_frequencies_coordinate)),
                list_ref(freq_column,tail(dtmf_frequencies_coordinate)));
    
}
//get_dtmf_frequencies(0);

function make_dtmf_tone(frequency_pair) {
    const sine_wave_1 = sine_sound(head(frequency_pair), 0.5);
    const sine_wave_2 = sine_sound(tail(frequency_pair), 0.5);
    
    return simultaneously(list(sine_wave_1, sine_wave_2));
}
/* Allow the function to run through the digits within the list of digits such
that a silence sound is applied after each digit
We can then use map to actually apply it to all the digits in the list :D
Consecutively is applied so that the sounds are joined together and played
consecutively.
*/
function dial(list_of_digits) {
    function make_dial_tone(digit) {
        return consecutively(
               list(make_dtmf_tone(get_dtmf_frequencies(digit)), 
                    silence_sound(0.1)));
    }
    return consecutively(map(make_dial_tone, list_of_digits));
}

// Test
play(dial(list(6,2,3,5,8,5,7,7)));

//TASK 4

// Copy your functions get_dtmf_frequencies,
// make_dtmf_tone and dial here.
function get_dtmf_frequencies(number) {
    const freq_row = list(697, 770, 852, 941);
    const freq_column = list(1209, 1336, 1477, 1633);
    const dtmf_frequencies_coordinates = list(
                                              pair(3, 1),
                                              pair(0, 0),
                                              pair(0, 1),
                                              pair(0, 2),
                                              pair(1, 0),
                                              pair(1, 1),
                                              pair(1, 2),
                                              pair(2, 0),
                                              pair(2, 1),
                                              pair(2, 2),
                                              pair(3, 0),
                                              pair(3, 2),
                                              pair(0, 3),
                                              pair(1, 3),
                                              pair(2, 3),
                                              pair(3, 3));
    const dtmf_frequencies_coordinate = list_ref(dtmf_frequencies_coordinates, 
                                                 number);
    return pair(list_ref(freq_row, head(dtmf_frequencies_coordinate)),
                list_ref(freq_column,tail(dtmf_frequencies_coordinate)));
    
}
//get_dtmf_frequencies(0);

function make_dtmf_tone(frequency_pair) {
    const sine_wave_1 = sine_sound(head(frequency_pair), 0.5);
    const sine_wave_2 = sine_sound(tail(frequency_pair), 0.5);
    
    return simultaneously(list(sine_wave_1, sine_wave_2));
}

function dial(list_of_digits) {
    const list_of_digits_with_hash = append(list_of_digits, list(11));
    function make_dial_tone(digit) {
        return consecutively(
               list(make_dtmf_tone(get_dtmf_frequencies(digit)), 
                    silence_sound(0.1)));
    }
    return consecutively(map(make_dial_tone, list_of_digits_with_hash));
}

/* One requirement is for the function to not play the 'evil number'
You can create a function that checks through the numbers whether it is the evil
number AKA Darth Vader's number
It is written as such so that the filter can check whether if the list contains
the number and if it does, then it removes the evil number and creates a list
of those numbers that are not the evil number and the dial function is then
mapped across the entire filtered list
As accumulate reads from a right-to-left order, a silence sound of 0 seconds is
included as the initial sound
*/
function dial_all(list_of_numbers) {
    const evil_number = list(1, 8, 0, 0, 5, 2, 1, 1, 9, 8, 0);
    function is_evil_number(number) {
        return !equal(number, evil_number);
    }
    function accumulate_sounds(current_sound, accumulated_sounds) {
        return consecutively(list(current_sound, accumulated_sounds));
    }
    return accumulate(accumulate_sounds, silence_sound(0), 
                      map(dial, filter(is_evil_number, list_of_numbers)));
}

// Test
play(dial_all(
 list(
      list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
      list(6,2,3,5,8,5,7,7),
      list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
  ));
