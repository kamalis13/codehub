


let ampm = document.getElementById('ampm')
function displayTime(){
    let dateTime = new Date(); // display current date and time
    let hr = dateTime.getHours();
    let min = padZero(dateTime.getMinutes());
    let sec = padZero(dateTime.getSeconds());
    let date = padZero(dateTime.getDate());
    let month = padZero(dateTime.getMonth());
    let year = dateTime.getFullYear()
    if(hr>12){  // converting 24 hrs clock to 12 hrs clock
        hr = hr - 12
        ampm.innerHTML = 'PM'
    }
    document.getElementById('hours').innerHTML = padZero(hr);
    document.getElementById('mins').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
    document.getElementById('date').innerHTML = date;
    document.getElementById('month').innerHTML = month;
    document.getElementById('year').innerHTML = year;
}
function padZero(num){  // add 0 if the number is in single digit
    return num<10?"0"+num:num
}
setInterval(displayTime,500) // every 500 sec displayTime function wii be executed