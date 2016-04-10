// REFACTOR clock.js INTO JQUERY
$(document).ready(function () {
    var running = false,
        newPomMin,
        newBrkMin,
        workTimeMin,
        workTimeSec,
        dispMin,
        dispSec,
        countdownId,
        alarm = new Audio('audio/Siren_Noise.mp3');

    function counter() {
        workTimeSec--;
        dispMin = Math.floor(workTimeSec / 60);
        dispSec = workTimeSec - (dispMin * 60);
        $('#minutes').html(dispMin);
        $('#seconds').html((dispSec < 10 ? '0' : '') + dispSec);
        if (workTimeSec === 0) {
            // console.log("Time's Up!");
            // alarm.play();
            // clearInterval(countdownId);
            // // SWITCH TO BREAK CLOCK
            // breakTimeMin = document.getElementById('breakMin').textContent;
            // breakTimeSec = breakTimeMin * 60;
            // countdownId = setInterval("breakCounter()", 1000);
            // running = true;
        }
    }

    // START THE TIMER
    $('#start').on('click', function() {
        if (workTimeMin === undefined) {
            workTimeMin = parseInt($('#pomodoroMin').html(), 10);
            workTimeSec = workTimeMin * 60;
        }
        countdownId = setInterval(counter, 1000);
        running = true;

        // check second hand state, start or resume animation
        if ($('#hand').hasClass('hand-stopped')) {
            $('#hand').removeClass('hand-stopped');
        } else if ($('#hand').hasClass('hand-paused')) {
            $('#hand').removeClass('hand-paused');
        }

        // Change buttons displayed
        start.style.display = "none";
        pause.style.display = "inline";
        reset.style.display = "none";
    });

	// PAUSE THE TIMER
    $('#pause').on('click', function() {
        clearInterval(countdownId);
        $('#hand').addClass('hand-paused');
        running = true;

        // Change buttons displayed
        start.style.display = "inline";
        pause.style.display = "none";
        reset.style.display = "inline";
    });  

    // RESET THE TIMER
    $('#reset').on('click', function() {
        workTimeSec = workTimeMin * 60
        dispMin = Math.floor(workTimeSec / 60);
        dispSec = workTimeSec - (dispMin * 60);
        $('minutes').html(dispMin);
        $('seconds').html((dispSec < 10 ? '0' : '') + dispSec);
        running = false;


        // Change buttons displayed
        start.style.display = "inline";
        pause.style.display = "none";
        reset.style.display = "none";

        //change hand-paused to hand-stopped
        $('#hand').removeClass('hand-paused');
        $('#hand').addClass('hand-stopped');
    });
    
    
    // POMODORO MINUTES UP
    $('#pomUp').on('click', function() {
        newPomMin = parseInt($('#pomodoroMin').html(), 10);
            if (running === false && newPomMin < 99){
                newPomMin++;
                $('#pomodoroMin').html(newPomMin);
                $('#minutes').html(newPomMin);
            }
    });
    
    // POMODORO MINUTES DOWN
    $('#pomDown').on('click', function() {
         newPomMin = parseInt($('#pomodoroMin').html(), 10);
            if (running === false && newPomMin > 1){
                newPomMin--;
                $('#pomodoroMin').html(newPomMin);
                $('#minutes').html(newPomMin);
            }                    
    });
    
    // BREAK MINUTES UP
    $('#brkUp').on('click', function() {
        newBrkMin = parseInt($('#breakMin').html(), 10);
            if (running === false && newBrkMin < 99){
                newBrkMin++;
                $('#breakMin').html(newBrkMin);
                //$('#minutes').html(newBrkMin);
            }                   
    });
    
    // BREAK MINUTES DOWN
    $('#brkDown').on('click', function() {
        newBrkMin = parseInt($('#breakMin').html(), 10);
            if (running === false && newBrkMin > 1){
                newBrkMin--;
                $('#breakMin').html(newBrkMin);
                //$('#minutes').html(newBrkMin);
            }                         
    });
  
});

