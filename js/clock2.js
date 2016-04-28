// REFACTOR clock.js INTO JQUERY
$(document).ready(function () {
    'use strict';
    
    var running = false,
        newPomMin,  // placeholder for new selected value
        newBrkMin,  // placeholder for new selected value
        workTimeMin,    // received selected time from DOM to start counter
        workTimeSec,    // calculated from workTimeMin
        breakTimeMin,
        breakTimeSec,
        dispMin,    // time values to be pushed to DOM
        dispSec,    // ^^
        countdownId,
        whichClock = "work",    // change to "break" when break clock is running
        alarm = new Audio('audio/Siren_Noise.mp3');

    function counter() {
        workTimeSec -= 1;
        dispMin = Math.floor(workTimeSec / 60);
        dispSec = workTimeSec - (dispMin * 60);
        $('#minutes').html(dispMin);
        $('#seconds').html((dispSec < 10 ? '0' : '') + dispSec);    // add leading 0 to seconds
        if (workTimeSec === 0) {
            console.log("Time's Up!");
            // alarm.play();
            clearInterval(countdownId);
            workTimeMin = null;
            // SWITCH TO BREAK CLOCK
            // Break clock appearance
            $('#title').html("BREAK TIME!");
            
            $('body').css('background', '#ED4337');
            $('.circle-two').css('background', '#ED4337');
            
            $('body').css('color', 'gold');
            $('.clock').css('color', 'gold');
            $('.circle-one').css('background', 'gold');
            
            // Break clock function
            if (breakTimeMin === undefined || breakTimeMin === null) {
                breakTimeMin = parseInt($('#breakMin').html(), 10);
                breakTimeSec = breakTimeMin * 60;
            }
            countdownId = setInterval(breakCounter, 100);
            whichClock = "break";
        }
    }
    
    function breakCounter() {
        breakTimeSec -= 1;
        dispMin = Math.floor(breakTimeSec / 60);
        dispSec = breakTimeSec - (dispMin * 60);
        $('#minutes').html(dispMin);
        $('#seconds').html((dispSec < 10 ? '0' : '') + dispSec);    // add leading 0 to seconds
        if (breakTimeSec === 0) {
            console.log("Time's Up!");
            // alarm.play();
            clearInterval(countdownId);
            breakTimeMin = null;
            // SWITCH TO POMODORO CLOCK
            // Pom clock appearance
            $('#title').html("POMODORO TIMER");
            
            $('body').css('background', '#889');
            $('.circle-two').css('background', '#889');
            
            $('body').css('color', 'silver');
            $('.clock').css('color', 'silver');
            $('.circle-one').css('background', 'silver');

            // Pom clock function
            if (workTimeMin === undefined || workTimeMin === null) {
                workTimeMin = parseInt($('#pomodoroMin').html(), 10);
                workTimeSec = workTimeMin * 60;
            }
            countdownId = setInterval(counter, 100);
            whichClock = "work";
        }
    }    

    // START THE TIMER
    $('#start').on('click', function() {
        if (whichClock === "work") {
            if (workTimeMin === undefined || workTimeMin === null) {
                workTimeMin = parseInt($('#pomodoroMin').html(), 10);
                workTimeSec = workTimeMin * 60;
            }
            countdownId = setInterval(counter, 100);
            running = true;
        } else if (whichClock === "break") {
            if (breakTimeMin === undefined || breakTimeMin === null) {
                breakTimeMin = parseInt($('#breakMin').html(), 10);
                breakTimeSec = breakTimeMin * 60;
            }
            countdownId = setInterval(breakCounter, 100);
            running = true;
        }


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

        // Change buttons displayed
        start.style.display = "inline";
        pause.style.display = "none";
        reset.style.display = "inline";
    });  

    // RESET THE TIMER
    $('#reset').on('click', function() {
        if (whichClock === "work") {
            workTimeSec = workTimeMin * 60
            dispMin = Math.floor(workTimeSec / 60);
            dispSec = workTimeSec - (dispMin * 60);
            workTimeMin = null;
        } else if (whichClock === "break") {
            breakTimeSec = breakTimeMin * 60
            dispMin = Math.floor(breakTimeSec / 60);
            dispSec = breakTimeSec - (dispMin * 60);
            breakTimeMin = null;
        }
            
        $('#minutes').html(dispMin);
        $('#seconds').html((dispSec < 10 ? '0' : '') + dispSec);            
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

