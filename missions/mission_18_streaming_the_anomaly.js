// TASK 1
/* The function is supposed to take in an array and create a stream from the
array. In this case, each element of the stream would be an element from the
array, thus having each element as the head of the pair for the stream. As the
array is finite, then the stream would be a finite one as well, thus it 
returns the nullary function () => null to signify the end of the stream.
*/
function array_to_stream(a) {
    function helper(a, k) {
        if (k === array_length(a) - 1) {
            return pair(a[k], () => null);
        } else {
            return pair(a[k], () => helper(a, k + 1));
        }
    }
    return helper(a, 0);
}



display(array_length(anomaly_data) ===
        stream_length(array_to_stream(anomaly_data)));
display(anomaly_data[7] ===
        stream_ref(array_to_stream(anomaly_data), 7));
        
// TASK 2

const FPS = 10;

// Your array_to_stream function from TASK 1 goes here.
function array_to_stream(a) {
    function helper(a, k) {
        if (k === array_length(a) - 1) {
            return pair(a[k], () => null);
        } else {
            return pair(a[k], () => helper(a, k + 1));
        }
    }
    return helper(a, 0);
}
/* The stream_to_filter function is supposed to take in a stream of images and
display them as destination images, and if the stream is finite, then the last
stream element can remain in the display image. As such, the condition would be
that the stream is not null as null would signify the end of the stream. When
the stream is not null, then we take the very first element of the current
stream, which in this case would be head(s). Then display the image using
copy_image as it copies the image and displays it as a destination image. And to
ensure that the stream moves, call the stream that is inputted into the function
with stream_tail(s) such that the stream is further evaluated and the next image
can then be used as a destination image.
The const is used such that it stores the previous image after each call, thus
ensuring that the final image will stay on the display image and not result in
the () => null being called.
*/
function stream_to_filter(s) {
    return (src, dest) => {
        if (!is_null(s)) {
                const head_stream = head(s);
                copy_image(head_stream, dest);
                s = stream_tail(s);
        }
    };
}



install_filter(stream_to_filter(array_to_stream(anomaly_data)));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 3

const FPS = 10;

// Your array_to_stream function from TASK 1 goes here.
function array_to_stream(a) {
    function helper(a, k) {
        if (k === array_length(a) - 1) {
            return pair(a[k], () => null);
        } else {
            return pair(a[k], () => helper(a, k + 1));
        }
    }
    return helper(a, 0);
}

// Your stream_to_filter function from TASK 2 goes here.
function stream_to_filter(s) {
    return (src, dest) => {
            if (!is_null(s)) {
                const head_stream = head(s);
                copy_image(head_stream, dest);
                s = stream_tail(s);
            }
    };
    
}
/* The loop function is supposed to take a non-null finite or infinite stream
and returns an infinite stream based on that. As such, we can use a helper 
function and go through the entire stream. However, once we reach () => null, 
which results in the stream being null, we return back the helper function again
with the same stream such that a new iteration of the stream is added to the
new stream, thus creating an infinite stream.
*/
function loop(s) {
    // your solution goes here
    function helper(stream) {
        if (is_null(stream)) {
            return helper(s);
        } else {
            return pair(head(stream), () => helper(stream_tail(stream)));
        }
    }
    return helper(s);
}


install_filter(
    stream_to_filter(
        loop(array_to_stream(anomaly_data))));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 4

const FPS = 10;

// Your array_to_stream function from TASK 1 goes here.
function array_to_stream(a) {
    function helper(a, k) {
        if (k === array_length(a) - 1) {
            return pair(a[k], () => null);
        } else {
            return pair(a[k], () => helper(a, k + 1));
        }
    }
    return helper(a, 0);
}

// Your stream_to_filter function from TASK 2 goes here.
function stream_to_filter(s) {
    return (src, dest) => {
            if (!is_null(s)) {
                const head_stream = head(s);
                copy_image(head_stream, dest);
                s = stream_tail(s);
               
            }
    };
    
}
// Your loop function from TASK 3 goes here.
function loop(s) {
    function helper(stream) {
        if (is_null(stream)) {
            return helper(s);
        } else {
            return pair(head(stream), () => helper(stream_tail(stream)));
        }
    }
    return helper(s);
}

/*The time_lapse function is supposed to take a stream and an integer n in which
it returns a stream that contains only every nth element of the stream that was
inputted. As such, we can create a helper function that utilises a pointer to 
detect at which part of the existing stream we are at, and only when the pointer
is a multiple of n, then would it add to the new stream.
*/
function time_lapse(s, n) {
    // your solution goes here
    function helper(st, n, pointer) {
        if (pointer % n === 0) {
            return pair(head(st), 
                        () => helper(stream_tail(st), n, pointer + 1));
        } else {
            return helper(stream_tail(st), n, pointer + 1);
        }
    }
    return helper(s, n, 0);
}


install_filter(
    stream_to_filter(
        time_lapse(loop(array_to_stream(anomaly_data)),
                   3)));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
