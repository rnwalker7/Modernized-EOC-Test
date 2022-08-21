// JavaScript Document

var helpWin = document.getElementById("HelpWindow");
var ctx4 = helpWin.getContext("2d");
	var alpha = 0;

$("#btnHelp").on("click", openHelpWin);

function openHelpWin() {
	'use strict';
	
	$("#HelpWindow").show();
	
	ctx4.fillStyle = "rgba(255, 255, 255, .5)";
	ctx4.fillRect(0, 0, 800, 600);
		
	drawRect();
	
	$("#x_button").css("left", "605px");
	$("#x_button").css("top", "125px");
	$("#x_button").css("z-index", "151");
	$("#x_button").show();
	$("#x_button").on("click", closeHelp);

}

function drawRect() {
	alpha += 0.01;
	
	if (alpha > 1) { 
		drawText();
		return;
	}
	
	ctx4.clearRect(175, 115, 458, 370);
	ctx4.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx4.fillRect(175, 115, 458, 370);
	
	var grd = ctx4.createLinearGradient(0, 0, 0, 370);
	grd.addColorStop(0, "rgba(111, 111, 111, " + alpha + ")");
	grd.addColorStop(1, "rgba(45, 45, 45, " + alpha + ")");
	ctx4.fillStyle = grd;
	ctx4.fillRect(175, 115, 458, 370);
	
	setTimeout(drawRect, 5);
}

function drawText() {
	ctx4.font = "bold 20px Arial";
	ctx4.fillStyle = "#000000";
	ctx4.fillText("Testing Instructions", 202, 169);
	
	ctx4.fillStyle = "#FFFFFF";
	ctx4.fillText("Testing Instructions", 205, 166);
	
	ctx4.font = "13px Arial";
	ctx4.fillText("1. To complete this test, you must answer each question.", 205, 216);
	ctx4.fillText("2. After you answer each question, you must confirm your answer by ", 205, 246);
	ctx4.fillText("clicking on the confirm answer button below.", 220, 261);
	ctx4.fillText("3. You can review and change any or all answers at any time", 205, 291);
	ctx4.fillText("during this test. To review each question you can press the forward", 220, 306);
	ctx4.fillText("or back button below or use the question number buttons to", 220, 321);
	ctx4.fillText("navigate to any question.", 220, 336);
	
	ctx4.font = "italic 13px Arial";
	ctx4.fillText("Please note that a question has not been answered", 220, 366);
	ctx4.fillText("and confirmed until the green highlight around the", 220, 381);
	ctx4.fillText("question number button appears.", 220, 396);
	
	ctx4.font = "13px Arial";
	ctx4.fillText("4. After you have answered and confirmed all questions, the submit", 205, 426);
	ctx4.fillText("test button will appear. Click on the submit test button to calculate", 220, 441);
	ctx4.fillText("and record your score.", 220, 456);
	
	ctx4.beginPath();
	ctx4.arc(531, 381, 10, 0, 2*Math.PI);
	ctx4.fillStyle = '#006699';
	ctx4.fill();
	
	ctx4.fillStyle = "#FFFFFF";
	ctx4.fillText("1", 527, 386);

	ctx4.beginPath();
	ctx4.arc(561, 381, 10, 0, 2*Math.PI);
	ctx4.fillStyle = '#006699';
	ctx4.fill();

	ctx4.fillStyle = "#FFFFFF";
	ctx4.fillText("1", 557, 386);

	ctx4.beginPath();
	ctx4.arc(561, 381, 12, 0, 2*Math.PI);
	ctx4.strokeStyle = "#00FF00";
	ctx4.lineWidth = 3;
	ctx4.stroke();

}

function fadeRect() {
	alpha = alpha - 0.01;
	
	if (alpha < 0) { 
		$("#HelpWindow").hide();
		return;
	}
	
	ctx4.clearRect(175, 115, 458, 370);
	ctx4.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx4.fillRect(175, 115, 458, 370);
	
	var grd = ctx4.createLinearGradient(0, 0, 0, 370);
	grd.addColorStop(0, "rgba(111, 111, 111, " + alpha + ")");
	grd.addColorStop(1, "rgba(45, 45, 45, " + alpha + ")");
	ctx4.fillStyle = grd;
	ctx4.fillRect(175, 115, 458, 370);
	
	setTimeout(fadeRect, 5);
}

function closeHelp() {
	$("#x_button").hide();
	$("#x_button").off("click", closeHelp);
	fadeRect();
}