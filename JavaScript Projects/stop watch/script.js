let start = document.getElementById('start')
let stop = document.getElementById('stop')
let reset = document.getElementById('reset')

let hour = 0;
let min = 0;
let sec = 0;
let count = 0;
start.addEventListener('click', function () {
    timer = true;
    displayStopWatch()
})
stop.addEventListener('click', function () {
    timer = false;
})
reset.addEventListener('click', function () {
    timer = false;
    hour = 0;
    min = 0;
    sec = 0;
    count = 0;
    document.getElementById('hr').innerHTML = '00';
    document.getElementById('min').innerHTML = '00';
    document.getElementById('sec').innerHTML = '00';
    document.getElementById('count').innerHTML = '00';
})
function displayStopWatch() {
    if (timer)
        count++; {
        if (count == 100){
            sec++;
            count = 0
    }
    if (sec == 60) {
        min++;
        sec = 0
    }
    if (min == 60) {
        hour++;
        min = 0
    }
}
    document.getElementById('hr').innerHTML = padZero(hour);
    document.getElementById('min').innerHTML = padZero(min);
    document.getElementById('sec').innerHTML = padZero(sec);
    document.getElementById('count').innerHTML = padZero(count);
    setTimeout(displayStopWatch, 10);
}
function padZero(num) {  // add 0 if the number is in single digit
    return num < 10 ? "0" + num : num
}
