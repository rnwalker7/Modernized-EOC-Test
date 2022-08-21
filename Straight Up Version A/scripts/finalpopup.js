// JavaScript replacement for FinalPopup MovieClip
// Developed by TSgt Walker, 37 TRSS/ITU

var canvas = document.getElementById("myStage");
var attritionData = "";

function surveyLogin() {
	var ctx = canvas.getContext("2d");
	
	// Gray out the background
	ctx.fillStyle = "rgba(0, 0, 0, .73)";
	ctx.fillRect(0, 0, 800, 600);
	
	var img_BG = document.getElementById("img_BG");
	ctx.drawImage(img_BG, 60, 103, 680, 394);
	
	var img_dialogBox = document.getElementById("img_dialogBox");
	ctx.drawImage(img_dialogBox, 246, 185, 308, 230);
	
	// Text for the survey message box
	
	ctx.font = "15px Segoe UI";
	ctx.fillStyle = "#FF0000";
	ctx.textAlign = "center";
	ctx.fillText("YOU HAVE COMPLETED THE TEST.", 400, 208);
	
	var surveyMsg1 = "You MUST complete the course survey";
	var surveyMsg2 = "before receiving your results. Click on";
	var surveyMsg3 = "the button below to complete the survey.";
	var surveyMsg4 = "After you complete the survey, close";
	var surveyMsg5 = "the browser window and have your test";
	var surveyMsg6 = "proctor enter his/her password.";
	ctx.font = "16px Segoe UI";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "center";
	ctx.fillText(surveyMsg1, 400, 241);
	ctx.fillText(surveyMsg2, 400, 259);
	ctx.fillText(surveyMsg3, 400, 277);
	ctx.fillText(surveyMsg4, 400, 295);
	ctx.fillText(surveyMsg5, 400, 313);
	ctx.fillText(surveyMsg6, 400, 331);
	
	$("#btnEnterSurvey").css("display", "inline-block");

	$("#myStage").off("click", qButtonClicked);
	$("#btnEnterSurvey").on("click", launchSurvey);
}

function launchSurvey() {
//	window.open(courseinfo.surveyLink, "_blank");
	openLogin();
}

function openLogin() {
	$("#btnEnterSurvey").css("display", "none");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(246, 185, 308, 230);
	
	var img_dialogBox = document.getElementById("img_dialogBox");
	ctx.drawImage(img_dialogBox, 246, 185, 308, 230);
	
	ctx.font = "17px Segoe UI";
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "center";
	ctx.fillText("TO VIEW YOUR RESULTS, HAVE YOUR TEST", 400, 145);
	ctx.fillText("ADMINISTRATOR ENTER A PASSWORD.", 400, 165);
	
	ctx.font = "19px Segoe UI";
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "left";
	ctx.fillText("Enter Password:", 292, 244);
	
	$("#txtSurveyPassword").show();
	$("#btnLogin").show();
	$("#btnLogin").on("click", checkFinalLogin);
	$("#loginMsg").show();
	
	$("#txtSurveyPassword").focus();
}

function checkFinalLogin() {
	var gotAHit = false;
	
	for (var x = 0; x < 6; x++) {
		if ($("#txtSurveyPassword").val() == passwords[x].myPassword) {
			gotAHit = true;
		}
	}
	
	$("#loginMsg").css("font-family", "Segoe, 'Segoe UI', 'DejaVu Sans', 'Trebuchet MS', Verdana, sans-serif");
	$("#loginMsg").css("font-size", "17px");
	$("#loginMsg").css("font-weight", "bold");
	if (gotAHit) {
		$("#loginMsg").css("color", "#00FF00");
		$("#loginMsg").text("Access granted!");
		$("#btnLogin").off("click", checkLogin);
		didWePass();
	} else {
		$("#loginMsg").css("color", "#FF0000");
		$("#loginMsg").text("Access denied! Please try again.");
		$("#txtSurveyPassword").val("");
	}
}

function didWePass() {
	if(myPercentage >= masterScore) {
		console.log("We passed");
		setTimeout(showCertificate, 500);
	} else {
		console.log("We failed");
		setTimeout(failureLetter, 500);
	}
}

function cleanStage() {
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 800, 600);
	
	$("#txtSurveyPassword").hide();
	$("#btnLogin").hide();
	$("#loginMsg").hide();
	
	ctx.fillStyle = "#CCCCCC";
	ctx.fillRect(0, 0, 800, 600);
	
	$("#finalDocs").show();
}

function showCertificate() {
	cleanStage();
	var ctx = canvas.getContext("2d");
	var canvas2 = document.getElementById("finalDocs");
	var ctx2 = canvas2.getContext("2d");
	
	ctx2.scale(0.8, 0.8);
	
	var cert = document.getElementById("certificate");
	ctx2.drawImage(cert, 0, 0);
	
	var studentName = "";
	
	try {
		studentName = (LMSGetValue("cmi.core.student_name") != null ? LMSGetValue("cmi.core.student_name") : "SrA Joe Blow");
	} catch(e) {
		studentName = "SrA Joe Blow";
	}

	
	ctx2.font = "italic 20px Arial";
	ctx2.textAlign = "center";
	ctx2.fillStyle = "#000000";
	ctx2.fillText(studentName, 350, 240);
	
	ctx2.font = "11px Verdana";
	ctx2.textAlign = "center";
	ctx2.fillStyle = "#000000";
	ctx2.fillText(crsNumberName, 350, 290);
	ctx2.fillText(pdsCode, 350, 304);
	ctx2.fillText(crsLocation, 350, 318);
	
	ctx2.textAlign = "left";	
	var signBlock2 = signBlock.split("\n");
	ctx2.fillText(signBlock2[0], 90, 490);
	ctx2.fillText(signBlock2[1], 90, 504);
	
	var dateToday = new Date();
	var mm = dateToday.getMonth() + 1;
	var dd = dateToday.getDate();
	var yyyy = dateToday.getFullYear();
	var compDate = mm + "/" + dd + "/" + yyyy;
	
	ctx2.fillText(compDate, 488, 471);
	
	ctx.font = "14px Arial";
	ctx.fillStyle="#000000";
	ctx.fillText("STUDENT SCORE " + this.parent.myPercentage + "%", 570, 66);
	ctx.fillText("Click on the Print Certificate button.", 570, 86);
	ctx.fillText("To receive credit for Testing, the", 570, 106);
	ctx.fillText("DLPOC MUST click on the Test", 570, 126);
	ctx.fillText("Results button and follow the", 570, 146);
	ctx.fillText("corresponding instructions.", 570, 166);

	$("#getResults").css("left", "600px");
	$("#getResults").css("top", "307px");
	$("#getResults").show();
	
	$("#getResults").on("click", submitResults);
	
}

function failureLetter() {
	cleanStage();
	
	var canvas2 = document.getElementById("finalDocs");
	var ctx2 = canvas2.getContext("2d");
	
	ctx2.scale(0.8, 0.8);
	
	ctx2.fillStyle = "#FFFFFF";
	ctx2.fillRect(0, 0, 700, 800);
	
	ctx2.font = "bold 21px Verdana";
	ctx2.fillStyle = "#000000";
	ctx2.textAlign = "center";
	ctx2.fillText("Failure Letter", 350, 55);
	
	ctx2.font = "15px Verdana";
	ctx2.fillText("FOR OFFICIAL USE ONLY. THIS DOCUMENT CONTAINS INFORMATION EXEMPT FROM", 350, 80);
	ctx2.fillText("MANDATORY DISCLOSURE UNDER THE FOIA. TITLE 5 U.S.C. 552(B)(6) APPLIES. THIS", 350, 98);
	ctx2.fillText("DOCUMENT ALSO CONTAINS PERSONAL INFORMATION THAT IS PROTECTED BY THE", 350, 116);
	ctx2.fillText("PRIVACY ACT OF 1974 AND MUST BE SAFEGUARDED FROM UNAUTHORIZED DISCLOSURE.", 350, 134);
	
	ctx2.font = "italic bold 15px Verdana";
	ctx2.fillText("SrA Blow, Joe", 350, 158);
	
	var failLine1 = "This student did not achieve the minimum passing score of " + courseinfo.masterScore + "%.";
	var failLine2 = "Re-test is authorized, for Course Number: " + courseinfo.crsNumber;
	
	ctx2.font = "bold 15px Verdana";
	ctx2.textAlign = "left";
	ctx2.fillText(failLine1, 50, 176);
	ctx2.fillText(failLine2, 50, 194);
	
	failLine1 = "1. You did not achieve the minimum passing score of " + courseinfo.masterScore + "%.  A re-test is authorized for";
	failLine2 = "course number: " + courseinfo.crsNumber + " and is not to exceed 30 calendar days after";
	ctx2.font = "bold 12px Verdana";
	ctx2.fillText(failLine1, 50, 236);
	ctx2.fillText(failLine2, 50, 254);
	ctx2.fillText("initial failure.  For extenuating circumstances contact the course administrator.", 50, 272);
	
	ctx2.fillText("2. Re-tests must be scheduled with the test administrator.  Students who fail the", 50, 314);
	ctx2.fillText("course academically or do not complete the course by the scheduled completion", 50, 332);
	ctx2.fillText("date will be washed back or eliminated from training.", 50, 350);
	
	failLine1 = "3. Students who achieve the minimum passing score of " + courseinfo.masterScore + "% on the End of Course";
	ctx2.fillText(failLine1, 50, 392);
	ctx2.fillText("(EOC) examination are authorized to be awarded a Certificate of Completion. The", 50, 410);
	ctx2.fillText("certificate can be accessed through the ADLS student’s profile.", 50, 428);
	
	failLine1 = "The course administrator can be contacted at: " + courseinfo.sqdrnEmail + " or";
	failLine2 = "DSN " + courseinfo.sqdrnPhone + ".";
	ctx2.fillText(failLine1, 50, 470);
	ctx2.fillText(failLine2, 50, 488);
	
	failLine1 = "The student scored " + totalScore + " out of " + courseinfo.numQuestions + " questions correctly, achieving a " + myPercentage + "%.";
	
	ctx2.fillText(failLine1, 50, 530);
	
	fillSidebar();
}

function fillSidebar() {
	var ctx = canvas.getContext("2d");
	
	ctx.font = "14px Verdana";
	ctx.fillStyle = "#000000";
	ctx.fillText("1. Please let the student review", 560, 55);
	ctx.fillText("the Failure Letter.", 580, 73);
	ctx.fillText("2. Print the student copy.", 560, 115);
	ctx.fillText("3. Have the student complete", 560, 157);
	ctx.fillText("the Attrition Survey.", 580, 175);
	ctx.fillText("4. Submit the results.", 560, 217);
	
	$("#btnPrintFail").show();
	$("#btnAttrition").show();
	$("#btnPrintFail").on("click", printLetter);
	$("#btnAttrition").on("click", attritionSurvey);
}

function printLetter() {
    var dataUrl = document.getElementById("finalDocs").toDataURL(); //attempt to save base64 string to server using this var  
    var windowContent = "<!DOCTYPE html>";
    windowContent += "<html>";
    windowContent += "<head><title>Print canvas</title></head>";
    windowContent += "<body>";
    windowContent += "<img src='" + dataUrl + "' style='position:absolute; top:48px; left:72px' />";
    windowContent += "</body>";
    windowContent += "</html>";
    var printWin = window.open("","","width=800,height=900");
    printWin.document.open();
    printWin.document.write(windowContent);
	printWin.document.addEventListener("load", function() {
		printWin.focus();
		printWin.print();
		printWin.document.close();
		printWin.close();            
	}, true);
}

function attritionSurvey() {
	$("#finalDocs").hide();
	
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 800, 600);
	$("#btnPrintFail").hide();
	$("#btnAttrition").hide();
	$("#btnPrintFail").off("click", printLetter);
	$("#btnAttrition").off("click", attritionSurvey);
	
	ctx.fillStyle = "#49709E";
	ctx.fillRect(0, 0, 800, 600);
	
	ctx.font = "bold 20px Verdana";
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "center";
	ctx.fillText("Attrition Survey", 400, 60);
	
	ctx.font = "14px Verdana";
	ctx.textAlign = "left";
	ctx.fillText("Please help us improve this course.  Select the top three problems that interfered with your efforts to", 30, 90);
	ctx.fillText("complete the course.  Rate each problem area you experienced as", 30, 110);
	
	ctx.font = "bold 14px Verdana";
	ctx.fillText("1 = most important, 2 = next", 520, 110);
	ctx.fillText("most important, and 3 = least important.", 30, 130);
	
	ctx.fillText("1    2    3", 525, 170);
	
	ctx.font = "14px Verdana";
	ctx.fillText("Course scheduling", 153, 190);
	ctx.fillText("Problems with onsite equipment", 153, 210);
	ctx.fillText("Conflicts with duty", 153, 230);
	ctx.fillText("Personal or family medical problems", 153, 250);
	ctx.fillText("Instruction was hard to follow or didn't track well", 153, 270);
	ctx.fillText("Personal or family emergency", 153, 290);
	ctx.fillText("Permanent change of station", 153, 310);
	ctx.fillText("Extended temporary duty (TDY) or deployments", 153, 330);
	
	$(".group1").show();
	$(".group2").show();
	$(".group3").show();
	$(".group4").show();
	$(".group5").show();
	$(".group6").show();
	$(".group7").show();
	$(".group8").show();
	
	$("#additionalInfo").show();
	
	$("#getResults").css("left", "307px");
	$("#getResults").css("top", "500px");
	$("#getResults").show();
	
	$("#getResults").on("click", submitResults);
}

function group1text() {
	if($(".group1:checked").val()) {
		return "Course Scheduling = " + $(".group1:checked").val() + "\n";
	} else {
		return "";
	}
}

function group2text() {
	if($(".group2:checked").val()) {
		return "Problems with onsite equipment = " + $(".group2:checked").val() + "\n";
	} else {
		return "";
	}
}

function group3text() {
	if($(".group3:checked").val()) {
		return "Conflicts with duty = " + $(".group3:checked").val() + "\n";
	} else {
		return "";
	}
}

function group4text() {
	if($(".group4:checked").val()) {
		return "Personal or family medical problems = " + $(".group4:checked").val() + "\n";
	} else {
		return "";
	}
}

function group5text() {
	if($(".group5:checked").val()) {
		return "Instruction was hard to follow or didn't track well = " + $(".group5:checked").val() + "\n";
	} else {
		return "";
	}
}

function group6text() {
	if($(".group6:checked").val()) {
		return "Personal or family emergency = " + $(".group6:checked").val() + "\n";
	} else {
		return "";
	}
}

function group7text() {
	if($(".group7:checked").val()) {
		return "Permanent change of station = " + $(".group7:checked").val() + "\n";
	} else {
		return "";
	}
}

function group8text() {
	if($(".group8:checked").val()) {
		return "Extended temporary duty (TDY) or deployments = " + $(".group8:checked").val() + "\n";
	} else {
		return "";
	}
}


function submitResults() {
	attritionData = "Attrition Survey Results\n\n" + group1text() + group2text() + group3text() + group4text() + group5text() + group6text() + group7text() + group8text() + "\nAdditional Info: " + $("#additionalInfo").val() + "\n";
	
	console.log(attritionData);
	
	$("input").hide();
	$("#getResults").off("click", submitResults);
	//$("#getResults").hide();
	$("#additionalInfo").hide();
	
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 800, 600);
	
	showResults();
}

function showResults() {
	console.log(missedQuestions);
	
	var canvas2 = document.getElementById("finalDocs");
	var ctx2 = canvas2.getContext("2d");
	
	var studentName;
	try {
		studentName = (LMSGetValue("cmi.core.student_name") != null ? LMSGetValue("cmi.core.student_name") : "SrA Joe Blow");
	} catch(e) {
		studentName = "SrA Joe Blow";
	}
	
	var ctx = canvas.getContext("2d");

	ctx2.scale(1, 1);
	
	ctx.fillStyle = "#CCCCCC";
	ctx.fillRect(0, 0, 800, 600);
	
	$("#finalDocs").show();
	
	ctx2.fillStyle="#FFFFFF";
	ctx2.fillRect(0, 0, 700, 900);

	ctx2.scale(0.8, 0.8);
	
	ctx2.font = "bold 18px Arial";
	ctx2.fillStyle = "#000000";
	ctx2.fillText(studentName, 20, 60);
	ctx2.fillText(sqdrnSubject, 20, 84);
	ctx2.fillText("Score: " + myPercentage + "%", 20, 108);
	
	var attritionText
	
	if(myPercentage >= masterScore) {
		attritionText = "No Attrition Survey required";
	} else {
		attritionText = attritionData.split("\n");
	}
	
	ctx2.font="italic 14px Segoe UI";
	for (var x = 0; x < attritionText.length; x++) {
		ctx2.fillText(attritionText[x], 20, ((x * 18) + 140));
	}
	
	var fouo = "FOR OFFICIAL USE ONLY. THIS DOCUMENT CONTAINS INFORMATION EXEMPT";
	var fouo2 = "FROM MANDATORY DISCLOSURE UNDER THE FOIA. TITLE 5 U. S. C. 552 (B) (6)";
	var fouo3 = "APPLIES. THIS DOCUMENT ALSO CONTAINS PERSONAL INFORMATION THAT IS";
	var fouo4 = "PROTECTED BY THE PRIVACY ACT OF 1974 AND MUST BE SAFEGUARDED FROM";
	var fouo5 = "UNAUTHORIZED DISCLOSURE.";
	ctx2.font = "italic 12px Segoe UI";
	ctx2.fillText(fouo, 20, 620);
	ctx2.fillText(fouo2, 20, 638);
	ctx2.fillText(fouo3, 20, 656);
	ctx2.fillText(fouo4, 20, 674);
	ctx2.fillText(fouo5, 20, 692);
	
	ctx2.font = "bold 16px Segoe UI";
	ctx2.fillText("STUDENT INCORRECT RESPONSES", 500, 40);
	
	var questionsMissed = missedQuestions.split("\n");
	
	ctx2.font = "14px Segoe UI";
	for (x = 0; x < questionsMissed.length; x++) {
		ctx2.fillText(questionsMissed[x], 500, (x * 20) + 60);
	}
	
	ctx.font = "bold 16px Segoe UI";
	ctx.fillText("INSTRUCTIONS", 600, 60);
	ctx.font = "16px Segoe UI";
	ctx.fillText("DL POC: Please print and FAX/Email the", 600, 80);
	ctx.fillText("results to the course administrator listed", 600, 100);
	ctx.fillText("below. After printing the results, please", 600, 120);
	ctx.fillText("exit the test.", 600, 140);
	
	$("#btnPrintResults").show();
	$("#btnPrintResults").on("click", printLetter);
}