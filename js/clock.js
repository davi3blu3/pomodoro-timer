// ** DECLARE VARIABLES
var
workTimeMin = 0,
workTimeSec = 0,
breakTimeMin = 0,
breakTimeSec = 0,
dispMin = 0,
dispSec = 0,
minField = document.getElementById('minutes'),
secField = document.getElementById('seconds'),
secondHand = document.getElementById('hand'),
countdownId = 0,
running = false,
alarm = new Audio('audio/Siren_Noise.mp3');


// ** REGISTER TIMER BUTTONS
var start = document.getElementById('start');
start.addEventListener("click", startTimer);

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
  console.log("start timer");
  workTimeMin = document.getElementById('pomodoroMin').textContent;
  workTimeSec = workTimeMin * 60;
  countdownId = setInterval("counter()", 1000);
  running = true;

  // check second hand state, start or resume animation
  if ( hand.className.match(/(?:^|\s)hand-stopped(?!\S)/) ) {
    hand.className = hand.className.replace( /(?:^|\s)hand-stopped(?!\S)/g , '' );  
  } else if ( hand.className.match(/(?:^|\s)hand-paused(?!\S)/) ) {
    hand.className = hand.className.replace( /(?:^|\s)hand-paused(?!\S)/g , '' );  
  }
  

  // Change buttons displayed
  start.style.display = "none";
  pause.style.display = "inline";
  reset.style.display = "none";
}

function resetTimer() {
  console.log("reset timer");
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

  //change hand-paused to hand-stopped
  if ( hand.className.match(/(?:^|\s)hand-paused(?!\S)/) ) {
    hand.className = hand.className.replace( /(?:^|\s)hand-paused(?!\S)/g , '' );  
  }
  hand.className += " hand-stopped";
}

function pauseTimer() {
  console.log("pause timer");
  clearInterval(countdownId);
  hand.className += " hand-paused";
  running = true;

  // Change buttons displayed
  start.style.display = "inline";
  pause.style.display = "none";
  reset.style.display = "inline";
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

// REFACTORING IN jQUERY
// whoopie!

// Declare variables
var
workTimeMin = 25,
workTimeSec = 0,
breakTimeMin = 5,
breakTimeSec = 0,
dispMin = 0,
dispSec = 0,
paused = false,
alarm = new Audio('audio/Siren_Noise.mp3');


//minField = document.getElementById('minutes'),
$('#minutes')

//secField = document.getElementById('seconds'),
$('#seconds')

//secondHand = document.getElementById('hand'),
$('#hand')

// BUTTONS
$('#start').click(function() {
  
})
$('#reset').click(function() {
  
})
$('#pause').click(function() {
  
})
$('#pomUp').click(function() {
  
})
$('#pomDown').click(function() {
  
})
$('#brkUp').click(function() {
  
})
$('#brkDown').click(function() {
  
})

