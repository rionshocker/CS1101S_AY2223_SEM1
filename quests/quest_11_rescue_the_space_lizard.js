// TASK 1

/* The function is supposed to take in tile_flies, which is an array of arrays.
As such, we can compute the 'width' and 'height' of the array such that we can
clamp it within these values. Then the function is supposed to choose a path
that has the maximum number of flies that the lizard can eat, thus we can
utilise math_max to detect which path out of the 3 possible paths has the max
number from the place it starts. As the function is called recursively, it then
checks and returns the path with the highest number. However, you will have to
choose a starting point that returns the maximum number of flies, thus the
function needs to check through all possible starting points from the top row
and return the path with the maximum number of flies.
*/

function max_flies_to_eat(tile_flies) {
    const width = array_length(tile_flies[0]);
    const height = array_length(tile_flies);
    function helper(k, i) {
        if (k >= height || i >= width) {
            return 0;
        } else if (k < 0 || i < 0) {
            return 0;
        } else {
            return tile_flies[k][i] + math_max(helper(k + 1, i - 1), 
                                      helper(k + 1, i), helper(k + 1, i + 1));
        }
    }
    let max_tile = helper(0,0);
    for (let j = 1; j < width; j = j + 1) {
        if (helper(0, j) > max_tile) {
            max_tile = helper(0,j);
        }
    }
    return max_tile;
}    


// TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];

max_flies_to_eat(tile_flies); // Expected result: 32

//TASK 2
let mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}
/* Utilising the read and write functions, as the function goes through each
call, it records whatever it has gone through if it has not been recorded, and
checks if it has been recorded in the memory. If it has, then it returns the 
output it has recorded.
*/
function memo_max_flies_to_eat(tile_flies) {
    mem = [];
    // *** Your answer here. ***
    const width = array_length(tile_flies[0]);
    const height = array_length(tile_flies);
    function helper(k, i) {
        if (k >= height || i >= width) {
            return 0;
        } else if (k < 0 || i < 0) {
            return 0;
        } else {
            if (read(k, i) !== undefined) {
                return read(k, i);
            } else {
                const result = tile_flies[k][i] + math_max(helper(k + 1, i - 1), 
                                      helper(k + 1, i), helper(k + 1, i + 1));
                write(k, i, result);
                return result;
        }
    }
    }
    let max_tile = helper(0,0);
    for (let j = 1; j < width; j = j + 1) {
        if (helper(0, j) > max_tile) {
            max_tile = helper(0,j);
        }
    }
    return max_tile;
}    
    


// TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];

memo_max_flies_to_eat(tile_flies); // Expected result: 32
