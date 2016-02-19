// ** DECLARE VARIABLES
var workTimeMin = 0;
var workTimeSec = 0;
var breakTimeMin = 0;
var breakTimeSec = 0;
var dispMin = 0;
var dispSec = 0;
var minField = document.getElementById('minutes');
var secField = document.getElementById('seconds');
var secondHand = document.getElementById('hand');
var countdownId = 0;
var running = false;
var alarm = new Audio('audio/Siren_Noise.mp3');



// ** REGISTER TIMER BUTTONS
var start = document.getElementById('start');
start.addEventListener("click", startTimer);

var resume = document.getElementById('resume');
resume.addEventListener("click", resumeTimer);

var reset = document.getElementById('reset');
reset.addEventListener("click", resetTimer);

var pause = document.getElementById('pause');
pause.addEventListener("click", pauseTimer);


// ** REGISTER TIME SELECT BUTTONS
var pomUp = document.getElementById('pomUp');
pomUp.addEventListener("click", pomValUp);

var pomDown = document.getElementById('pomDown');
pomDown.addEventListener("click", pomValDown);

var brkUp = document.getElementById('brkUp');
brkUp.addEventListener("click", brkValUp);

var brkDown = document.getElementById('brkDown');
brkDown.addEventListener("click", brkValDown);


// ** TIMER CONTROL FUNCTIONS
function startTimer() {
  workTimeMin = document.getElementById('pomodoroMin').textContent;
  workTimeSec = workTimeMin * 60;
  countdownId = setInterval("counter()", 1000);
  running = true;

  // Change buttons displayed
  start.style.display = "none";
  pause.style.display = "inline";
  reset.style.display = "none";
  resume.style.display = "none";
}

function resumeTimer() {
  countdownId = setInterval("counter()", 1000);
  running = true;

  // Change buttons displayed
  start.style.display = "none";
  pause.style.display = "inline";
  reset.style.display = "none";
  resume.style.display = "none";
}

function resetTimer() {
  workTimeSec = workTimeMin * 60
  dispMin = Math.floor(workTimeSec / 60);
  dispSec = workTimeSec - (dispMin * 60);
  minField.innerHTML = dispMin;
  secField.innerHTML = (dispSec < 10 ? '0' : '') + dispSec;;
  running = false;

  // Change buttons displayed
  start.style.display = "inline";
  pause.style.display = "none";
  reset.style.display = "none";
  resume.style.display = "none";
}

function pauseTimer() {
  clearInterval(countdownId);
  running = true;

  // Change buttons displayed
  start.style.display = "none";
  pause.style.display = "none";
  reset.style.display = "inline";
  resume.style.display = "inline";
}

function counter() {
  workTimeSec--;
  dispMin = Math.floor(workTimeSec / 60);
  dispSec = workTimeSec - (dispMin * 60);
  minField.innerHTML = dispMin;
  secField.innerHTML = (dispSec < 10 ? '0' : '') + dispSec;;
  if (workTimeSec === 0) {
    console.log("Time's Up!");
    alarm.play();
    clearInterval(countdownId);
    // SWITCH TO BREAK CLOCK
    breakTimeMin = document.getElementById('breakMin').textContent;
    breakTimeSec = breakTimeMin * 60;
    countdownId = setInterval("breakCounter()", 1000);
    running = true;
  }
}

function breakCounter() {
  breakTimeSec--;
  dispMin = Math.floor(breakTimeSec / 60);
  dispSec = breakTimeSec - (dispMin * 60);
  minField.innerHTML = dispMin;
  secField.innerHTML = (dispSec < 10 ? '0' : '') + dispSec;;
  if (breakTimeSec === 0) {
    console.log("Break's Over!");
    alarm.play();
    clearInterval(countdownId);
    // SWITCH TO WORK CLOCK
    workTimeMin = document.getElementById('pomodoroMin').textContent;
    workTimeSec = workTimeMin * 60;
    countdownId = setInterval("counter()", 1000);
    running = true;
  }
}

// ** TIME SELECTION FUNCTIONS
function pomValUp() {
  var pomMin = document.getElementById('pomodoroMin');
  var newPomMin = document.getElementById('pomodoroMin').textContent;
  if (running === false && newPomMin < 99){
      newPomMin++;
      pomMin.innerHTML = newPomMin;
      minField.innerHTML = newPomMin;
  };
}

function pomValDown() {
  var pomMin = document.getElementById('pomodoroMin');
  var newPomMin = document.getElementById('pomodoroMin').textContent;
  if (running === false && newPomMin > 1){
      newPomMin--;
      pomMin.innerHTML = newPomMin;
      minField.innerHTML = newPomMin;
  };
}

function brkValUp() {
  var brkMin = document.getElementById('breakMin');
  var newBrkMin = document.getElementById('breakMin').textContent;
  if (running === false && newBrkMin < 99){
      newBrkMin++;
      brkMin.innerHTML = newBrkMin;
  }
}

function brkValDown() {
  var brkMin = document.getElementById('breakMin');
  var newBrkMin = document.getElementById('breakMin').textContent;
  if (running === false && newBrkMin > 1){
    newBrkMin--;
    brkMin.innerHTML = newBrkMin;
  }
}


