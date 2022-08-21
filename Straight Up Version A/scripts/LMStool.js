// JavaScript Document

var hiddenPassword = "";

var myLMS = document.getElementById("LMSTool");
var ctx3 = myLMS.getContext("2d");

function grabLMSinput(evt) {
	'use strict';
	hiddenPassword += evt.which || evt.keyCode;
	if (evt.keyCode == 17) {
		hiddenPassword = "";
	}
	console.log(hiddenPassword);
	
	if (hiddenPassword == LMSTool.keys) {
		openLMSTool();
	}
}

function openLMSTool() {
	'use strict';
	$("body").off("keydown", grabLMSinput);
	hiddenPassword = "";
	$("#LMSTool").show();
	$("#LMSTool").css("z-index", "99");
	
	ctx3.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx3.fillRect(0, 0, 800, 600);
	
	ctx3.fillStyle = "rgba(25, 25, 25, 1)";
	ctx3.fillRect(0, 50, 800, 500);
	
	$("#username").show();
	$("#password").show();
	
	var img_BG = document.getElementById("img_dialogBox");
	ctx3.drawImage(img_BG, 170, 124, 460, 352);
	
	ctx3.font = "bold 15px Arial";
	ctx3.fillStyle = "#000000";
	ctx3.textAlign = "center";
	ctx3.fillText("Please login to use Diagnostic Tool", 400, 179);
	
	$("#btnLMSLogin").show();
	
	$("#btnLMSLogin").on("click", function() {
		if($("#username").val() == LMSTool.user && $("#password").val() == LMSTool.passW) {
			console.log("Success!");
			$("#username").hide();
			$("#password").hide();
			$("#btnLMSLogin").hide();
			ctx3.fillStyle = "rgba(25, 25, 25, 1)";
			ctx3.fillRect(0, 50, 800, 500);
			
			drawTool();
		} else {
			console.log("Invalid username or password");
			ctx3.fillStyle = "#FF0000";
			ctx3.font = "bold 15px Arial";
			
			ctx3.fillText("Incorrect username or password", 400, 422);
		}
	});
}

function drawTool() {
	'use strict';
	$("#GetBut").on("click", getLMSFunction);
	$("#SetBut").on("click", setLMSFunction);
	$("#GetBut").show();
	$("#SetBut").show();
	$("#x_button").show();
	
	$("#mainselection1").show();
	$("#mainselection2").show();
	$("#mainselection3").show();
	$("#Set3").show();
	
	ctx3.font = "20px Century Gothic";
	ctx3.fillStyle = "#FFFFFF";
	ctx3.textAlign = "left";
	ctx3.fillText("LMS GET", 137, 202);
	ctx3.fillText("LMS SET", 137, 246);
	ctx3.fillText("LMS SET", 137, 290);
	ctx3.fillText("LMS SET", 137, 334);
	
	$("#x_button").on("click", function() {
		$("#LMSTool").hide();
		$("body").on("keydown", grabLMSinput);
		$("#GetBut").hide();
		$("#SetBut").hide();
		$("#x_button").hide();
		
		$("#mainselection1").hide();
		$("#mainselection2").hide();
		$("#mainselection3").hide();
		$("#Set3").hide();
		
		$("#GetBut").off("click", getLMSFunction);
		$("#SetBut").off("click", setLMSFunction);
	});
}

function getLMSFunction() {
	'use strict';
	var getLMS = $("#Get1").val();
	var GetText = getLMS + ": ";
	GetText += LMSGetValue(getLMS);
	
	ctx3.fillStyle= "#191919";
	ctx3.fillRect(200, 375, 400, 125);
	
	ctx3.font = "20px Segoe UI";
	ctx3.fillStyle = "#FFFFFF";
	ctx3.textAlign = "center";
	ctx3.fillText(GetText, 400, 390);
}

function setLMSFunction() {
	'use strict';
	var setLMS1 = $("#Set1").val();
	var setLMS2 = $("#Set2").val();
	var setLMS3 = $("#Set3").val();
	
	if (setLMS1 == "LMSCommit") {
		LMSCommit();
	}
	else {
		LMSSetValue(setLMS2, setLMS3);
		LMSCommit();
	}
	
	ctx3.fillStyle= "#191919";
	ctx3.fillRect(200, 375, 400, 125);
	
	ctx3.font = "20px Segoe UI";
	ctx3.fillStyle = "#FFFFFF";
	ctx3.textAlign = "center";
	ctx3.fillText("Value has been set.", 400, 390);
}
