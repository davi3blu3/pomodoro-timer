$(document).ready(function () {
    'use strict';
    
    /*
    *   1. GLOBAL VARIABLES
    */ 
    
    var running = false,        // prevents button press by monitoring run status
        newPomMin,              // placeholder for new selected value
        newBrkMin,              // placeholder for new selected value
        workTimeMin,            // received selected time from DOM to start counter
        workTimeSec,            // calculated from workTimeMin
        breakTimeMin,           // received selected time from DOM to start breakCounter
        breakTimeSec,           // calculated from breakTimeMin
        dispMin,                // minute values to be pushed to DOM
        dispSec,                // second values to be pushed to DOM
        countdownId,            //  handle for clock setInterval
        animation,              //  handle for animation setInterval
        whichClock = "work",    // change to "break" when break clock is running
        dots = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"],
        currentDot = 2,        // starting dot, adjusted for zero index
        alarm = new Audio('audio/Siren_Noise.mp3');

    /*
    *   2. INTERVAL FUNCTIONS
    */    
    
    // WORK CLOCK INTERVAL FUNCTION
    function counter() {
        workTimeSec -= 1;
        dispMin = Math.floor(workTimeSec / 60);
        dispSec = workTimeSec - (dispMin * 60);
        $('#minutes').html(dispMin);
        $('#seconds').html((dispSec < 10 ? '0' : '') + dispSec);    // add leading 0 to seconds
        if (workTimeSec === 0) {
            // alarm.play();
            clearInterval(countdownId);
            workTimeMin = null;
            // SWITCH TO BREAK CLOCK
            // Change appearance
            $('#title').html("BREAK TIME!");
            $('body').css('background', '#ED4337');
            $('body').css('color', 'gold');
            $('.clock').css('color', 'gold');
            
            // Break clock function
            if (breakTimeMin === undefined || breakTimeMin === null) {
                breakTimeMin = parseInt($('#breakMin').html(), 10);
                breakTimeSec = breakTimeMin * 60;
            }
            countdownId = setInterval(breakCounter, 1000);
            whichClock = "break";
        }
    }
    
    // BREAK CLOCK INTERVAL FUNCTION
    function breakCounter() {
        breakTimeSec -= 1;
        dispMin = Math.floor(breakTimeSec / 60);
        dispSec = breakTimeSec - (dispMin * 60);
        $('#minutes').html(dispMin);
        $('#seconds').html((dispSec < 10 ? '0' : '') + dispSec);    // add leading 0 to seconds
        if (breakTimeSec === 0) {
            // alarm.play();
            clearInterval(countdownId);
            breakTimeMin = null;
            // SWITCH TO POMODORO CLOCK
            // Change appearance
            $('#title').html("POMODORO TIMER");
            $('body').css('background', '#889');
            $('body').css('color', 'silver');
            $('.clock').css('color', 'silver');

            // Pom clock function
            if (workTimeMin === undefined || workTimeMin === null) {
                workTimeMin = parseInt($('#pomodoroMin').html(), 10);
                workTimeSec = workTimeMin * 60;
            }
            countdownId = setInterval(counter, 1000);
            whichClock = "work";
        }
    }

    // Helper function to rotateDots, insures number is within 0 - 11 range
    function adjustIndex(index) {
        // if index is > 11, subtract 12
        if ( index > 11 ){ index -= 12; };
        // if index is < 0, add 12
        if ( index < 0 ){ index += 12; };
        return index;
    }

    // CONTROLS ROTATING ANIMATION
    function rotateDots() {
        // keep variables within range
        var curr = currentDot,
            trail1 = adjustIndex(currentDot - 1),
            trail2 = adjustIndex(currentDot - 2),
            trail3 = adjustIndex(currentDot - 3);
        // make all dots invisible
        $(".inner-dot").css("opacity", 0);
        // make current 100% visible, trailers partially visible
        $("#" + dots[curr]).css("opacity", 1);
        $("#" + dots[trail1]).css("opacity", .75);
        $("#" + dots[trail2]).css("opacity", .5);
        $("#" + dots[trail3]).css("opacity", .25);
        // increment currentDot
        currentDot = adjustIndex( currentDot += 1 );
    }      

    /*
    *   3. CLICK EVENT FUNCTIONS
    */
    
    // START THE TIMER
    $('#start').on('click', function() {
        animation = setInterval(rotateDots, 83.333); // Starts animation. 1000 miliesconds divided by 12
        if (whichClock === "work") {
            if (workTimeMin === undefined || workTimeMin === null) {
                workTimeMin = parseInt($('#pomodoroMin').html(), 10);
                workTimeSec = workTimeMin * 60;
            }
            countdownId = setInterval(counter, 1000);
            running = true;
        } else if (whichClock === "break") {
            if (breakTimeMin === undefined || breakTimeMin === null) {
                breakTimeMin = parseInt($('#breakMin').html(), 10);
                breakTimeSec = breakTimeMin * 60;
            }
            countdownId = setInterval(breakCounter, 1000);
            running = true;
        }
        // Change buttons displayed
        start.style.display = "none";
        pause.style.display = "inline";
        reset.style.display = "none";
    });

	// PAUSE THE TIMER
    $('#pause').on('click', function() {
        clearInterval(countdownId);
        clearInterval(animation);

        // Change buttons displayed
        start.style.display = "inline";
        pause.style.display = "none";
        reset.style.display = "inline";
    });  

    // RESET THE TIMER
    $('#reset').on('click', function() {
        clearInterval(animation);
        $(".inner-dot").css("opacity", 0);
        currentDot = 2;
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
                if (whichClock === "work") {
                    $('#minutes').html(newPomMin);
                }
            }
    });
    
    // POMODORO MINUTES DOWN
    $('#pomDown').on('click', function() {
         newPomMin = parseInt($('#pomodoroMin').html(), 10);
            if (running === false && newPomMin > 1){
                newPomMin--;
                $('#pomodoroMin').html(newPomMin);
                if (whichClock === "work") {
                    $('#minutes').html(newPomMin);
                }    
            }
    });
    
    // BREAK MINUTES UP
    $('#brkUp').on('click', function() {
        newBrkMin = parseInt($('#breakMin').html(), 10);
            if (running === false && newBrkMin < 99){
                newBrkMin++;
                $('#breakMin').html(newBrkMin);
                if (whichClock === "break") {
                    $('#minutes').html(newBrkMin);
                }
            }
    });
    
    // BREAK MINUTES DOWN
    $('#brkDown').on('click', function() {
        newBrkMin = parseInt($('#breakMin').html(), 10);
            if (running === false && newBrkMin > 1){
                newBrkMin--;
                $('#breakMin').html(newBrkMin);
                if (whichClock === "break") {
                    $('#minutes').html(newBrkMin);
                } 
            }       
    });  
});
