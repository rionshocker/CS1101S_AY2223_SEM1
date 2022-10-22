// TASK 1
/* The function is supposed to take in a stream of images and return the top 
left coordinates and bottom right coordinates of a rectangle that contains all
the purely red pixels of the image. We can start off by setting 4 variables, in
which they represent the coordinates of the top left (x1, y1) and bottom right
(x2, y2) respectively. As the anomaly is a circle, there will be a maximum
and minimum coordinate for the top and bottom of the rectangle. 
*/
function red_rectangle_stream(s) {
     function helper(x) {
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;
        /* We set the condition that a purely red pixel should have the RGB 
        values of [255, 0, 0, 255], and thus searching through the image for 
        such a pixel. As it iterates through the image, it returns the bottom
        right x coordinate, and its respective y coordinate.
        */
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                if (x[i][j][0] === 255 && x[i][j][1] === 0 && x[i][j][2] === 0 
                && x[i][j][3] === 255) {
                    x2 = i;
                    y2 = j;
                }
            }
        }
        /* Then we search through the image from the back and find the left most
        pixel that is red, thus setting the left x coordinate.
        */
        for (let i = x2; i > 0; i = i - 1) {
            for (let j = y2; j > 0; j = j - 1) {
                if (x[i][j][0] === 255 && x[i][j][1] === 0 && x[i][j][2] === 0 
                && x[i][j][3] === 255) {
                    const result = pair(i, j);
                    x1 = head(result);
                }
            }
        }
        /*Then as the first y2 is not covering all the red pixels due to the
        nature of the anomaly being a circle, we then find the middle x coords
        of the anomaly and get the bottom right y coordinate by finding the
        highest value of it.
        */
        const mid_x = math_floor((x1 + x2)/2);
        for (let j = 0; j < WIDTH; j = j + 1) {
            if (x[mid_x][j][0] === 255 && x[mid_x][j][1] === 0 
            && x[mid_x][j][2] === 0 && x[mid_x][j][3] === 255) {
                y2 = j;
            }
        }
        /* With the bottom right coordinates settled, we can then use it and
        find the lowest value of y for the top left coordinates such that the 
        rectangle covers all red pixels.
        */
        for (let j = y2; j > 0; j = j - 1) {
            if (x[mid_x][j][0] === 255 && x[mid_x][j][1] === 0 
            && x[mid_x][j][2] === 0 && x[mid_x][j][3] === 255) {
                const result_2 = pair(mid_x, j);
                y1 = tail(result_2);
            }
        }
        //We then return the values in a pair as required.
        return pair(pair(x1, y1), pair(x2, y2));
                    
                
    }
    return stream_map(helper, s);

}



head(red_rectangle_stream(anomaly_stream));
// should evaluate to: [[141, 191], [159, 209]]

// TASK 2

// Copy your function red_rectangle_stream from TASK 1 here.
function red_rectangle_stream(s) {
     function helper(x) {
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;
        
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                if (x[i][j][0] === 255 && x[i][j][1] === 0 && x[i][j][2] === 0 
                && x[i][j][3] === 255) {
                    x2 = i;
                    y2 = j;
                }
            }
        }
        for (let i = x2; i > 0; i = i - 1) {
            for (let j = y2; j > 0; j = j - 1) {
                if (x[i][j][0] === 255 && x[i][j][1] === 0 && x[i][j][2] === 0
                && x[i][j][3] === 255) {
                    const result = pair(i, j);
                    x1 = head(result);
                    y1 = tail(result);
                }
            }
        }
        const mid_x = math_floor((x1 + x2)/2);
        for (let j = 0; j < WIDTH; j = j + 1) {
            if (x[mid_x][j][0] === 255 && x[mid_x][j][1] === 0 
            && x[mid_x][j][2] === 0 && x[mid_x][j][3] === 255) {
                y2 = j;
            }
        }
        for (let j = y2; j > 0; j = j - 1) {
            if (x[mid_x][j][0] === 255 && x[mid_x][j][1] === 0 
            && x[mid_x][j][2] === 0 && x[mid_x][j][3] === 255) {
                const result_2 = pair(mid_x, j);
                y1 = tail(result_2);
            }
        }
        
        return pair(pair(x1, y1), pair(x2, y2));
                    
                
    }
    return stream_map(helper, s);

}

/* The function stream_combine is supposed to take in a binary function f
and 2 infinite streams and returns an infinite stream whose elements are a 
result of applying f onto the 2 infinite streams. As such, f takes in both
elements s1 and s2 and is applied on them, and the tail is then the nullary
function which takes in the stream_tail of the 2 infinite streams.
*/
function stream_combine(f, s1, s2) {
    return pair(f(head(s1), head(s2)), 
                () => stream_combine(f, stream_tail(s1), stream_tail(s2)));

}

// Trim the given image using the given rectangle.
// Returns an image that includes all purely red
// pixels of the given image.

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));

    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

// Example:

const focused_stream = stream_combine(
                           trim,
                           anomaly_stream,
                           red_rectangle_stream(anomaly_stream));

head(focused_stream);


// Should return a close-up of the anomaly, a 19x19 image of black,
// red and white pixels.

//TASK 3
// Use your solutions of the previous tasks and
// write other functions HERE that might be helpful
// to answer the questions in this task.

/*
Q1: What color it might absorb?
ANS: It might absorb blue as there is a yellow 'star' emanating from the middle
of the radiation shield, thus showing that it reflects red and green, which 
when combined, gives yellow. 


Q2: What color of laser beam would you use?
ANS: I would use a blue laser beam.


Q3: Which part of the shield would you target?
ANS: I will target the core of the shield as that is where the yellow light
is coming from.


Q4: How did you find the answer?
ANS: When zooming in on the anomaly, I observed the radiation shield, in which
it can be seen that yellow light is radiating from the middle of it. It thus 
means that it is reflecting red and green, but absorbing blue. As such, to 
maximise damage, we will use a blue laser beam and target where the yellow light
is coming from.

*/
