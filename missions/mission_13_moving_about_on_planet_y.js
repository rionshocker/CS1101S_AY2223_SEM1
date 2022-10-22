//TASK 1
// Your program here.
const mm_to_cm = 10;
const ultrasonic = ev3_ultrasonicSensor();

function every_second(seconds) {
    if(seconds < 100) {
        const dist = ev3_ultrasonicSensorDistance(ultrasonic) / mm_to_cm;
        display(dist);
        ev3_pause(1000);
        every_second(seconds + 1);
    } else {
        ev3_pause(1000);
    }
}

every_second(0);

//TASK 2
// Your program here.
const motorA = ev3_motorA();
const motorB = ev3_motorB();
const buffer = 100;
display(ev3_connected(motorA
) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");
const mm_to_cm = 10;
const ultrasonic = ev3_ultrasonicSensor();

function every_second(seconds) {
    if(seconds < 100) {
        const dist = ev3_ultrasonicSensorDistance(ultrasonic) / mm_to_cm;
        display(dist);
        ev3_pause(1000);
        every_second(seconds + 1);
    } else {
        ev3_pause(1000);
    }
}

function move(time, speed) {
    ev3_runForTime(motorA, time, speed);
    ev3_runForTime(motorB, time, speed);
    ev3_pause(time);
}

function stop() {
    ev3_motorStop(motorA);
    ev3_motorStop(motorB);
}

function move_forward(distance, speed) {
    const one_cm = 18;
    ev3_runToRelativePosition(motorA, one_cm * distance, speed);
    ev3_runToRelativePosition(motorB, one_cm * distance, speed);
    ev3_pause(one_cm * math_abs(distance) * 1000 / speed + buffer);
}

function detect_distance_forward(distance) {
    const dist = ev3_ultrasonicSensorDistance(ultrasonic) / mm_to_cm;
    if(dist <= distance) {
        stop();
    } else {
        move(100, 100);
        detect_distance_forward(distance);
    }
}

function detect_distance_backwards(distance) {
    const dist = ev3_ultrasonicSensorDistance(ultrasonic) / mm_to_cm;
    if(dist >= distance) {
        stop();
    } else {
        move(100, -100);
        detect_distance_backwards(distance);
    }
}

detect_distance_forward(10);
detect_distance_backwards(40);

//TASK 3
// Your program here.
const motorA = ev3_motorA();
const motorB = ev3_motorB();
const default_speed = 200;
const buffer = 100;
display(ev3_connected(motorA
) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");
const mm_to_cm = 10;
const ultrasonic = ev3_ultrasonicSensor();

function every_second(seconds) {
    if(seconds < 100) {
        const dist = ev3_ultrasonicSensorDistance(ultrasonic) / mm_to_cm;
        display(dist);
        ev3_pause(1000);
        every_second(seconds + 1);
    } else {
        ev3_pause(1000);
    }
}

function move(time, speed) {
    ev3_runForTime(motorA, time, speed);
    ev3_runForTime(motorB, time, speed);
    ev3_pause(time);
}

function stop() {
    ev3_motorStop(motorA);
    ev3_motorStop(motorB);
}

function choose_direction() {
    const random_number = math_random();
    if(random_number < 0.5) {
        return true;
    } else {
        return false;
    }
}

function move_forward(distance, speed) {
    const one_cm = 18;
    ev3_runToRelativePosition(motorA, one_cm * distance, speed);
    ev3_runToRelativePosition(motorB, one_cm * distance, speed);
    ev3_pause(one_cm * math_abs(distance) * 1000 / speed + buffer);
}

function rotate_clockwise(angle) {
    const one_degree = 165 / 90;
    ev3_runToRelativePosition(motorA, one_degree * angle, default_speed);
    ev3_runToRelativePosition(motorB, one_degree * -angle, default_speed);
    ev3_pause(math_abs(angle) / 90 * 1500 + buffer);
}

function detect_distance_forward(distance) {
    const dist = ev3_ultrasonicSensorDistance(ultrasonic) / mm_to_cm;
    if(dist <= distance) {
        stop();
    } else {
        move(100, 100);
        detect_distance_forward(distance);
    }
}

function detect_distance_backwards(distance) {
    const dist = ev3_ultrasonicSensorDistance(ultrasonic) / mm_to_cm;
    if(dist >= distance) {
        stop();
    } else {
        move(100, -100);
        detect_distance_backwards(distance);
    }
}

detect_distance_forward(10);
const direction = choose_direction();
if(direction) {
    rotate_clockwise(90);
} else {
    rotate_clockwise(-90);
}
move_forward(40, 200);
if(direction) {
    rotate_clockwise(-90);
} else {
    rotate_clockwise(90);
}
move_forward(45, 200);
