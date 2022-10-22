//TASK 1
// Your program here.
ev3_speak("hello");

//TASK 2
// Your program here.
const buffer = 100;
const motorA = ev3_motorA();
const motorB = ev3_motorB();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");

function move_forward(distance, speed) {
    const one_cm = 18;
    ev3_runToRelativePosition(motorA, one_cm * distance, speed);
    ev3_runToRelativePosition(motorB, one_cm * distance, speed);
    ev3_pause(one_cm * distance * 1000 / speed + buffer);
}

move_forward(10, 200);

//TASK 3
// Your program here.
const default_speed = 200;
const buffer = 100;
const motorA = ev3_motorA();
const motorB = ev3_motorB();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");


function rotate_clockwise(angle) {
    const one_degree = 180 / 90;
    ev3_runToRelativePosition(motorA, one_degree * angle, default_speed);
    ev3_runToRelativePosition(motorB, one_degree * -angle, default_speed);
    ev3_pause(math_abs(angle) / 90 * 1500 + buffer);
}

rotate_clockwise(-90);
ev3_pause(1000);

//TASK 4
// Your program here.
ev3_speak("hello I am robot");
const default_speed = 200;
const buffer = 100;
const motorA = ev3_motorA();
const motorB = ev3_motorB();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");


function stop() {
    ev3_motorStop(motorA);
    ev3_motorStop(motorB);
}

function move_forward(distance, speed) {
    const one_cm = 18;
    ev3_runToRelativePosition(motorA, one_cm * distance, speed);
    ev3_runToRelativePosition(motorB, one_cm * distance, speed);
    ev3_pause(one_cm * distance * 1000 / speed + buffer);
}

function rotate_clockwise(angle) {
    const one_degree = 180 / 90;
    ev3_runToRelativePosition(motorA, one_degree * angle, default_speed);
    ev3_runToRelativePosition(motorB, one_degree * -angle, default_speed);
    ev3_pause(math_abs(angle) / 90 * 1500 + buffer);
}

move_forward(10, 200);
stop();
rotate_clockwise(-90);
stop();
move_forward(5,200);
stop();
rotate_clockwise(90);
stop();
move_forward(15,200);
stop();
