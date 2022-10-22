// TASK 1
/* The filter is meant to have blue, red, green and yellow at the 4 corners.
As such, you adjust it according to each pixel, in which the output is 400px by
300px. However, since the RGB values is within the range of 0 - 255, you have to
restrict the values to 255 once past the 255 mark within the loop. In this case,
you let the rgb values grow accordingly in the loop, proportionally until it
reaches 255.
*/
const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function my_first_filter(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            dest[y][x][0] = (y/height) * 255; // invert red intensity
            dest[y][x][1] = (x/width) * 255; // invert green intensity
            dest[y][x][2] = 255 - ((x/width + y/height) * 255) ; // invert blue intensity
            dest[y][x][3] = 255;                // always 255
 
        }
    }
}

install_filter(my_first_filter);
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 2

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function copy(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
           dest[i][j][0] = src[i][j][0];
           dest[i][j][1] = src[i][j][1];
           dest[i][j][2] = src[i][j][2];
           dest[i][j][3] = src[i][j][3];
        }
    }
}

function crosshair(src, dest) {
    const width = image_width();
    const height = image_height();
    const middle_height = math_floor(height/2);
    const middle_width = math_floor(width/2);
    /*The first part is for the crosshair lines, which intersect in the middle.
    This is done by making the middle row and column of pixels red, by making
    the decimal code of R be 255 while keeping the rest constant for the image
    to show.
    */
    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            if (i === middle_height || j === middle_width) {
                dest[i][j][0] = 255;
                dest[i][j][1] = src[i][j][1];
                dest[i][j][2] = src[i][j][2];
                dest[i][j][3] = src[i][j][3];
            } else {
                dest[i][j][0] = src[i][j][0];
                dest[i][j][1] = src[i][j][1];
                dest[i][j][2] = src[i][j][2];
                dest[i][j][3] = src[i][j][3];
            }
    }
    /*On top of that, we need to create the bluish circles, which have a width
    of 25px in each direction. Using the equation of a circle for any given 
    point (x,y), we ensure that the circle is completely blue by clamping down
    on the values by ensuring that the values adding up will be more than the
    product of the radius of the first circle but smaller than that of the
    subsequent circle.
    */
    for (let r = 25; r <= middle_width + 50; r = r + 50) {
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
                const x = i - middle_height;
                const y = j - middle_width;
                const product = x * x + y * y;
                if ((product > r * r) && (product < (r + 25) * (r + 25))) {
                    dest[i][j][2] = 255;
            }
        }
    }
}
}
}

install_filter(copy);
install_filter(crosshair);  // use this filter when crosshair function is ready.
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 3

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

/* The zoom function is supposed to zoom in on an image by a factor, while
keeping the centre of the image as constant. As such, we will have to translate
the pixels to a new destination by restricting the size of the image. This is
done by restricting the values to (i - mid_height, j - mid_width). This changes
the origin to the middle of the image. Since it is in the middle of the image,
as such there will be negative and positive values, which results in the
addition of mid_height again and applying the factor to the newly zoomed_i and j
*/
function zoom(factor) {
    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const mid_width = math_floor(width / 2);
        const mid_height = math_floor(height / 2);
        
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
                const zoomed_i = i - mid_height;
                const zoomed_j = j - mid_width;
                const new_i = math_floor(mid_height + zoomed_i/factor);
                const new_j = math_floor(mid_width + zoomed_j/factor);
                
                dest[i][j] = src[new_i][new_j];
            }
        }
    };
}


install_filter(zoom(2));
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 4

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function copy_image(src, dest) {
    const width = image_width();
    const height = image_height();
    
    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            dest[i][j][0] = src[i][j][0];
            dest[i][j][1] = src[i][j][1];
            dest[i][j][2] = src[i][j][2];
            dest[i][j][3] = src[i][j][3];
            
        }
    }
}

function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}


// Copy your solution for Task 3 (zoom) here.
function zoom(factor) {
    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const mid_width = math_floor(width / 2);
        const mid_height = math_floor(height / 2);
        
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
                const zoomed_i = i - mid_height;
                const zoomed_j = j - mid_width;
                const new_i = math_floor(mid_height + zoomed_i/factor);
                const new_j = math_floor(mid_width + zoomed_j/factor);
                
                dest[i][j] = src[new_i][new_j];
            }
        }
    };
}



function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function stack(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);

    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_height = math_floor(height / 2);

        filter1(src, temp1);
        filter2(src, temp2);

        for (let i = 0; i < half_height; i = i + 1) {
            dest[i] = temp1[i * 2];
            dest[i + half_height] = temp2[i * 2];
        }

        // take last row from temp2, if height is odd
        for (let i = half_height * 2; i < height; i = i + 1) {
            dest[i] = temp2[i];
        }
    };
}
/* Following the same concept as stack, this time round the width is manipulated
The creation of the temp image allows the filters to be stored, and placed side
by side using the beside function, which splits the image into 2 parts, by 
halving it using half_width. When it is within half_width, it returns the 
first filter, and past the half_width, it then returns the second filter.
*/
function beside(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);
    
    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_width = math_floor(width / 2);
        
        filter1(src, temp1);
        filter2(src, temp2);
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < half_width; j = j + 1) {
                dest[i][j] = temp1[i][j * 2];
                dest[i][j + half_width] = temp2[i][j * 2];
            }
            //In the case when width is odd
            for (let j = half_width * 2; j < width; j = j + 1) {
            dest[i][j] = temp2[i][j];
            }
        }
    };
}

install_filter(stack(beside(flip_vertically, color_invert),
                     beside(copy_image, zoom(2))));
// install_filter(beside(flip_vertically, color_invert));
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 5

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}

function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}
/* temp is created to store the filter and in this case, allows another filter
to be added on top of another filter.
*/
function compose(filter1, filter2) {
    return (src, dest) => {
        const temp = make_image(WIDTH, HEIGHT);
        filter1(src, temp);
        filter2(temp, dest);
    };
}

install_filter(compose( flip_vertically, color_invert));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
