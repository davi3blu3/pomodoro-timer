// REFACTOR clock.js INTO JQUERY
$(document).ready(function() {
    var running = false,
        newPomMin,
        newBrkMin;

    // CLOCK CONTROL FUNCTIONS
//    $('#start').on('click', startTimer() {
//                   
//    });
//
//    $('#pause').on('click', pauseTimer() {
//                   
//    });  
//
//    $('#reset').on('click', resetTimer() {
//                   
//    });
    
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
