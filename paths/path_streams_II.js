//TASK 1
const alternating_ones = pair(1, () => pair(-1, () => alternating_ones));

//TASK 2
function make_alternating_stream(s) {

    return (is_null(s))
           ? null
           : is_null(stream_tail(s))
            ? s
            : pair(head(s), () => pair(-1 * head(stream_tail(s)), () => make_alternating_stream(stream_tail(stream_tail(s)))));

}

//TASK 3
function zip_streams(s1, s2) {

    return pair(head(s1), pair(head(s2), () => zip_streams(stream_tail(s1), stream_tail(s2))));

}

//TASK 4
function every_other(s) {

    return pair(head(s), () => every_other(stream_tail(stream_tail(s))));

}

//TASK 5
function partial_sums(s) {
    function add_streams(s1, s2) {
        if (is_null(s1)) {
            return s2;
        } else if (is_null(s2)) {
            return s1;
        } else {
            return pair(head(s1) + head(s2),
                        () => add_streams(stream_tail(s1), stream_tail(s2)));
            
        }
}

    return pair(head(s), () => add_streams(stream_tail(s), partial_sums(s)));

}
