$(document).ready(function () {
    'use strict';
    
    var running = false,// prevents button press by monitoring run status
        newPomMin,  // placeholder for new selected value
        newBrkMin,  // placeholder for new selected value
        workTimeMin,    // received selected time from DOM to start counter
        workTimeSec,    // calculated from workTimeMin
        breakTimeMin,   // received selected time from DOM to start breakCounter
        breakTimeSec,   // calculated from breakTimeMin
        dispMin,    // minute values to be pushed to DOM
        dispSec,    // second values to be pushed to DOM
        countdownId,    //  handle for setInterval
        whichClock = "work",    // change to "break" when break clock is running
        alarm = new Audio('audio/Siren_Noise.mp3');
    
    // ANIMATION VARIABLES
    var dots = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"],
        currentDot = 11, // adjusted for zero index, represents dot twelve
        animation;
    

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
            countdownId = setInterval(breakCounter, 1000);
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
            countdownId = setInterval(counter, 1000);
            whichClock = "work";
        }
    }

    // insures number is within 0 - 11 range
    function adjustIndex(index) {
        // if index is > 11, subtract 12
        if ( index > 11 ){ index -= 12; };
        // if index is < 0, add 12
        if ( index < 0 ){ index += 12; };
        return index;
    }

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


        // check second hand state, start or resume animation
//        if ($('#hand').hasClass('hand-stopped')) {
//            $('#hand').removeClass('hand-stopped');
//        } else if ($('#hand').hasClass('hand-paused')) {
//            $('#hand').removeClass('hand-paused');
//        }

        // Change buttons displayed
        start.style.display = "none";
        pause.style.display = "inline";
        reset.style.display = "none";
    });

	// PAUSE THE TIMER
    $('#pause').on('click', function() {
        clearInterval(countdownId);
        clearInterval(animation);
        currentDot = 11;
//        $('#hand').addClass('hand-paused');

        // Change buttons displayed
        start.style.display = "inline";
        pause.style.display = "none";
        reset.style.display = "inline";
    });  

    // RESET THE TIMER
    $('#reset').on('click', function() {
        clearInterval(animation);
        $(".inner-dot").css("opacity", 1);
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
