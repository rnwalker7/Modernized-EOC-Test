// Support JavaScript Document for EOC Test template
// Developed by TSgt Walker

/* jshint eqeqeq: false */

// Global variables

"use strict";

var canvas = document.getElementById("myStage");
var ctx = canvas.getContext("2d");
var q_num = 0;
var correctAnswer = "";
var crsNumberName = courseinfo.crsNumberName;
var pdsCode = courseinfo.pdsCode;
var crsLocation = courseinfo.crsLocation;
var signBlock = courseinfo.signBlock;
var sqdrnEmail = courseinfo.sqdrnEmail;
var sqdrnPhone = courseinfo.sqdrnPhone;
var sqdrnSubject = courseinfo.sqdrnSubject;
var contactInfo = courseinfo.contactInfo;
var masterScore = courseinfo.masterScore;
var retestPolicy = courseinfo.retestPolicy;
var crsNumber = courseinfo.crsNumber;
var numQuestions = courseinfo.numQuestions;
var totalScore = 0;
var myPercentage = 0;
var missedQuestions = "";

var selectedanswer = new Array(numQuestions);
var score = new Array(numQuestions);

var qArray = [];
var q_btns = [];
		
var answera = document.getElementById("answera");
var answerb = document.getElementById("answerb");
var answerc = document.getElementById("answerc");
var answerd = document.getElementById("answerd");
var dummybutton = document.getElementById("dummyButton");

// Initialize array of selected answers
for (var x = 0; x < numQuestions; x++) {
	selectedanswer[x] = "";
}

function startTest() {
	ctx.clearRect(0, 0, 800, 600);	
	
	$("#TitleText").show();
	$("#TitleText2").show();
	$("#myQ").show();
	$("#myBox1").show();
	$("#myBox2").show();
	$("#myBox3").show();
	$("#myBox4").show();
	$("#answera").show();
	$("#answerb").show();
	$("#answerc").show();
	$("#answerd").show();
	$("#submit1").show();
	$("label").show();
	$("#btnNext").show();
	$("#btnPrev").show();
	
	var bgImage = document.getElementById("bgimage");
	ctx.drawImage(bgImage, 0, 0);
	var newTitle = courseinfo.sqdrnSubject.split("\n");
	
	$("#TitleText").text(newTitle[0]);
	$("#TitleText2").text(newTitle[1]);
	
	drawQButtons();
	
	loadQuestions(q_num);
	
//	$("#myStage").on("click", qButtonClicked);
//
//	$("#submit1").on("click", scoreQuestion);
//	
//	$("#btnNext").on("click", btnNext_onClick);
//	$("#btnPrev").on("click", btnPrev_onClick);
//	$("#SubmitTest").on("click", submitTest_onClick);
	
	if(q_num == 0) {
		$("#btnPrev").hide();
	} else {
		$("#btnPrev").show();
	}
	
	if(q_num == numQuestions - 1) {
		$("#btnNext").hide();
	} else {
		$("#btnNext").show();
	}
}

function drawQButtons() {
	// Background box
	var canvas = document.getElementById("myStage");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#E0ECF3";
	ctx.fillRect(538, 119, 225, 215);

	// Top text
	
	ctx.font = "9px Segoe UI";
	ctx.fillStyle = "#000000";
	ctx.fillText("CONFIRMED ANSWERS HIGHLIGHTED IN GREEN.", 652, 114);
	
	// Start drawing circles
	var myX, myY, myQNum;
	
	for (myY = 0; myY <= (numQuestions / 10 - 1); myY++) {
		for (myX = 0; myX < 10; myX++) {
			myQNum = myX + (myY * 10);
			ctx.beginPath();
			ctx.arc((myX * 22 + 551), (myY * 22 + 132), 7.5, 0, 2*Math.PI);
			ctx.fillStyle = '#006699';
			ctx.fill();
			q_btns.push({x:(myX * 22 + 559), y:(myY * 22 + 140)});
			
			ctx.font = "10px Segoe UI Bold";
			ctx.fillStyle = "white";
			if (myQNum < 9) {
				ctx.fillText(myQNum + 1, (myX * 22 + 549), (myY * 22 + 135));
			} else {
				ctx.fillText(myQNum + 1, (myX * 22 + 546), (myY * 22 + 135));
			}
		}
	}
	for (myX = 0; myX < (numQuestions % 10); myX++) {
		myQNum = myX + (myY * 10);
		ctx.beginPath();
		ctx.arc((myX * 22 + 551), (myY * 22 + 132), 7.5, 0, 2*Math.PI);
		ctx.fillStyle = '#006699';
		ctx.fill();
		q_btns[myQNum] = {x:(myX * 22 + 551), y:(myY * 22 + 132)};
		
		ctx.font = "10px Segoe UI Bold";
		ctx.fillStyle = "white";
		if (myQNum < 9) {
			ctx.fillText(myQNum + 1, (myX * 22 + 549), (myY * 22 + 135));
		} else {
			ctx.fillText(myQNum + 1, (myX * 22 + 546), (myY * 22 + 135));
		}
	}
}

function qButtonClicked(e) {
	var x;
	
	for (x = 0; x < numQuestions; x++) {
		if ((e.pageX >= q_btns[x].x && e.pageX <= q_btns[x].x + 16) && (e.pageY >= q_btns[x].y && e.pageY <= q_btns[x].y + 16)) {
			loadQuestions(x);
		}
	}
}

function isItAnswered(i) {
	if (selectedanswer[i] != "" && selectedanswer[i] != "Z") {
		switch(selectedanswer[i]) {
			case "A":
				answera.checked = true;
				break;
			case "B":
				answerb.checked = true;
				break;
			case "C":
				answerc.checked = true;
				break;
			case "D":
				answerd.checked = true;
				break;
		}
	} else { 
		dummybutton.checked = true;
	}
		
}

function loadQuestions(qNum) {
	
	if(questions[qNum].questionText.length > 250) {
		$("#myQ").css("font-size", "11px");
	} else {
		$("#myQ").css("font-size", "12px");
	}
	
	if(questions[qNum].questionText.length > 300) {
		$("#myQ").css("top", "185px");
	} else {
		$("#myQ").css("top", "195px");
	}
	
	$("#myQ").text(questions[qNum].questionText);
	$("#myBox1").text(questions[qNum].answerA);
	$("#myBox2").text(questions[qNum].answerB);
	$("#myBox3").text(questions[qNum].answerC);
	$("#myBox4").text(questions[qNum].answerD);
	correctAnswer = questions[qNum].correctAnswer;
	q_num = qNum;
	
	// Check to see if question was previously answered; if so, let's select that answer
	isItAnswered(qNum);
	
	// Check if this is the first or last question; disable nav buttons as necessary
	if (qNum == 0)	{
		$("#btnPrev").hide();
	} else {
		$("#btnPrev").show();
	}
	
	if (qNum == (numQuestions - 1)) {
		$("#btnNext").hide();
	} else {
		$("#btnNext").show();
	}
	
	// Hide any unused radio buttons
	if ($("#myBox3").text() == "") {
		$("#answerc").hide();
	} else {
		$("#answerc").show();
	}
	
	if ($("#myBox4").text() == "") {
		$("#answerd").hide();
	} else {
		$("#answerd").show();
	}
	
}

// Question control functions
function questionmap(i) {
	console.log($(".answerRadio:checked").val());
	selectedanswer[i] = $(".answerRadio:checked").val();
	
	if(selectedanswer[i] != "Z" && selectedanswer[i] != "") {
		color(i);
	}
}

function scoreQuestion() {
	questionmap(q_num);
	submittest();

	if (selectedanswer[q_num] == correctAnswer) {
		score[q_num] = 1;
	}
	else {
		score[q_num] = 0;
	}
	console.log("Q"+(q_num + 1)+" score = "+score[q_num]);
}

function color(i) {
	var canvas = document.getElementById("myStage");
	var ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.arc(q_btns[i].x, q_btns[i].y, 9, 0, 2*Math.PI);
	ctx.strokeStyle = "#00FF00";
	ctx.lineWidth = 3;
	ctx.stroke();
	
}

//SUBMIT TEST BUTTON SCRIPT
function submittest()
{
	var allSelected = true;
	var i;
	for (i = 0; i < numQuestions; i++) {
		if (selectedanswer[i] == "" || selectedanswer[i] == "Z") {
			allSelected = false;
		}
	}
	if (allSelected) {
		$("#SubmitTest").show();
		$("#submitInstructions").show();
		$("#submitInstructions").text("Review answers and click submit test.");
	}
}

// Submit Button event function
function submitTest_onClick() 
{
	for (var i = 0; i < numQuestions; i++) { 
		totalScore = totalScore + score[i];
	}
	console.log("score " + totalScore);
	myPercentage = Math.round(100 * totalScore / numQuestions);
	console.log("myPercentage " + myPercentage);
	console.log("masterScore" + masterScore);
	
	for (i = 0; i < numQuestions; i++) {
		if (score[i] == 0) {
			missedQuestions += "Question " + (i + 1) + " = " + selectedanswer[i] + "\n";
		}
	}

	try {
		if (myPercentage >= masterScore)
		{
			LMSSetValue("cmi.core.score.raw", myPercentage);
			LMSSetValue("cmi.core.lesson_status", "completed");
			LMSCommit();
		}
		if (myPercentage < masterScore)
		{
			if (LMSGetValue("cmi.suspend_data") == "Version BVersion A")
			{
				LMSSetValue("cmi.core.score.raw", myPercentage);
				LMSSetValue("cmi.core.lesson_status", "failed");
				LMSCommit();
			}
			else
			{
				LMSSetValue("cmi.core.score.raw", myPercentage);
				LMSSetValue("cmi.core.lesson_status", "incomplete");
				LMSCommit();
			}
		}
	} catch(e) {
		console.log("No LMS found");
	}

	// Hide the HTML elements we had before
	
	$("#TitleText").hide();
	$("#TitleText2").hide();
	$("#TitleText").remove();
	$("#TitleText2").remove();
	$(".answerRadio").hide();
	$(".answerRadio").remove();
	$("#btnNext").hide();
	$("#btnPrev").hide();
	$("#btnNext").remove();
	$("#btnPrev").remove();
	$(".questions").hide();
	$(".questions").remove();
	$(".btn").hide();
	$(".btn").remove();
	$("#submitInstructions").hide();
	$("#submitInstructions").remove();
	$(".answers").hide();
	$(".answers").remove();

	surveyLogin();
}

function btnPrev_onClick() {
	loadQuestions(q_num - 1);
}

function btnNext_onClick() {
	loadQuestions(q_num + 1);
}
