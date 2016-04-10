// REFACTOR WITH JQUERY
$(document).ready( function() {

	// ** DECLARE VARIABLES
	var
	workTimeMin = 0,
	workTimeSec = 0,
	breakTimeMin = 0,
	breakTimeSec = 0,
	dispMin = 0,
	dispSec = 0,
	minField = document.getElementById('minutes'),	// $('#minutes')
	secField = document.getElementById('seconds'),	// $('#seconds')
	secondHand = document.getElementById('hand'),	// $('#hand')
	countdownId = 0,
	running = false,
	alarm = new Audio('audio/Siren_Noise.mp3');

	// CLOCK SELECTORS
	$('#pomUp').click(function() {
  
	})
	$('#pomDown').click(function() {
	  
	})
	$('#brkUp').click(function() {
	  
	})
	$('#brkDown').click(function() {
	  
	})

	// START TIMER
	$('#start').on('click', function startTimer() {

	})

	// RESET TIMER
	$('#reset').on('click', function resetTimer() {

	})

	// PAUSE TIMER
	$('#pause').on('click', function pauseTimer() {

	})



});