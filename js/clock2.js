// REFACTOR clock.js INTO JQUERY
$(document).ready(function () {
    var running = false,
        newPomMin,
        newBrkMin,
        workTimeMin,
        workTimeSec;

    // CLOCK CONTROL FUNCTIONS
    $('#start').on('click', startTimer() {
        console.log("start timer");
        workTimeMin = parseInt($('#pomodoroMin').html, 10);
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
    });

    $('#pause').on('click', pauseTimer() {
                   
    });  

    $('#reset').on('click', resetTimer() {
                   
    });
    
    
    // TIME SELECTOR FUNCTIONS
    $('#pomUp').on('click', function() {
        newPomMin = parseInt($('#pomodoroMin').html(), 10);
            if (running === false && newPomMin < 99){
                newPomMin++;
                $('#pomodoroMin').html(newPomMin);
                $('#minutes').html(newPomMin);
            }
    });
    
    $('#pomDown').on('click', function() {
         newPomMin = parseInt($('#pomodoroMin').html(), 10);
            if (running === false && newPomMin > 1){
                newPomMin--;
                $('#pomodoroMin').html(newPomMin);
                $('#minutes').html(newPomMin);
            }                    
    });
    
    $('#brkUp').on('click', function() {
        newBrkMin = parseInt($('#breakMin').html(), 10);
            if (running === false && newBrkMin < 99){
                newBrkMin++;
                $('#breakMin').html(newBrkMin);
                //$('#minutes').html(newBrkMin);
            }                   
    });
    
    $('#brkDown').on('click', function() {
        newBrkMin = parseInt($('#breakMin').html(), 10);
            if (running === false && newBrkMin > 1){
                newBrkMin--;
                $('#breakMin').html(newBrkMin);
                //$('#minutes').html(newBrkMin);
            }                         
    });
  
});
