//TASK 1
// Your program here.
const color_sensor = ev3_colorSensor();
const touch_sensor = ev3_touchSensor2();
while(true) {
    if(ev3_touchSensorPressed(touch_sensor)){
        break;
    }
    display(ev3_reflectedLightIntensity(color_sensor));
    ev3_pause(1000);
}

//TASK 2
// Your program here.
const motorA = ev3_motorA();
const motorB = ev3_motorB();
display(ev3_connected(motorA
) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");

const color_sensor = ev3_colorSensor();
const touch_sensor = ev3_touchSensor2();

function left_motor(time, speed) {
    ev3_runForTime(motorA, time, speed);
}

function right_motor(time, speed) {
    ev3_runForTime(motorB, time, speed);
}

function move(time, speed) {
    ev3_runForTime(motorA, time, speed);
    ev3_runForTime(motorB, time, speed);
    ev3_pause(time);
}

while(true){
    if(ev3_touchSensorPressed(touch_sensor)){
        break;
    }
    display(ev3_reflectedLightIntensity(color_sensor));
    if(ev3_reflectedLightIntensity(color_sensor) < 10) {
        right_motor(100, 100);
    }else if(ev3_reflectedLightIntensity(color_sensor) > 50) {
        left_motor(100, 100);
    }else {
        move(100, 100);
    }
    ev3_pause(100);
}

//TASK 3
// Your program here.
const motorA = ev3_motorA();
const motorB = ev3_motorB();
display(ev3_connected(motorA
) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");

const color_sensor = ev3_colorSensor();
const touch_sensor = ev3_touchSensor2();

function left_motor(time, speed) {
    ev3_runForTime(motorA, time, speed);
}

function right_motor(time, speed) {
    ev3_runForTime(motorB, time, speed);
}

function move(time, speed) {
    ev3_runForTime(motorA, time, speed);
    ev3_runForTime(motorB, time, speed);
    ev3_pause(time);
}

while(true){
    if(ev3_touchSensorPressed(touch_sensor)){
        break;
    }
    display(ev3_reflectedLightIntensity(color_sensor));
    if(ev3_reflectedLightIntensity(color_sensor) < 10) {
        right_motor(50, 100);
        left_motor(50, -200);
    }else if(ev3_reflectedLightIntensity(color_sensor) > 50) {
        left_motor(50, 100);
        right_motor(50, -200);
    }else {
        move(100, 100);
    }
    ev3_pause(50);
}
