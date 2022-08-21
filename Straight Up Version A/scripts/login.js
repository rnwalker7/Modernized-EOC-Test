// JavaScript Document

var origLoginY = $("#btnLogin").css("top");

function loadLogin() {
	
	$("span").hide();
	$("input").hide();
	$("label").hide();
	$("#submit1").hide();
	$("img").hide();
	
	$("#img_BG").show();
	$("#img_BG2").show();
	$("#img_colorbar1").show();
	$("#img_colorbar2").show();
	$("#img_dialogBox").show();
	
	$("#txtLogin1").show();
		
	$("#btnStart").show();
	$("#btnStart").on("click", checkLMS);
	
}

function checkLMS() {
	var stringData = LMSGetValue("cmi.suspend_data");
	var blockScore = Number(LMSGetValue("cmi.core.score.raw"));

	if(blockScore == 0)
	{
		showLogin();
	}
	else if (!blockScore)
	{
		blockScore = 0;
		LMSSetValue("cmi.core.score.raw", "0");
		LMSCommit();
	}
	//new code for allowing into test
	if (blockScore >= 70)
	{
		alert("Access denied! You already passed this Block Test.");
	}
	else if (stringData == "Version AVersion B" || stringData == "Version BVersion A")
	{
		alert("Access denied! You failed Version A and Version B of this Block Test. Please consult the Course Manager.");
	}
	else if (stringData == "Version A")
	{
		alert("Access denied! You failed Version A of this Block Test. You must attempt Version B.");
	}
	else
	{
		showLogin();
	}
}

function showLogin() {
	$("#btnStart").off("click", showLogin);
	$("#btnStart").hide();
	$("#txtLogin1").hide();
	
	$("#txtLogin2").show();
	$("#txtLogin3").show();	
	$("#imgStudName").show();
	$("#imgLoginPasswd").show();
	
	var studentName = (LMSGetValue("cmi.core.student_name") ? LMSGetValue("cmi.core.student_name") : "SrA Blow, Joe");
	
	$("#txtLogin4").text(studentName);
	$("#txtLogin4").show();
		
	$("#initPassword").show();
	$("#errorMessage").show();
	
	$("#btnLogin").show();
	$("#btnLogin").on("click", checkLogin);
}

function checkLogin() {
	
	var password1 = $("#initPassword").val();
	var stringData = (LMSGetValue("cmi.suspend_data") ? LMSGetValue("cmi.suspend_data") : "");
	
	var passwordMatch = false;
	$("#errorMessage").css("font-weight", "bolder");
	
	for (var x = 0; x < 6; x++) {
		if (password1 == passwords[x].myPassword) {
			passwordMatch = true;
		}
	}

	if (passwordMatch)
	{
		$("#errorMessage").css("color", "#00FF00");
		$("#errorMessage").html("Access granted!");
		if (stringData == "Version B") {
			try {
				LMSSetValue("cmi.suspend_data", "Version BVersion A");
				LMSCommit();
			} catch(e) {
			}
		} else {
			try {
				LMSSetValue("cmi.suspend_data", "Version A");
				LMSCommit();
			} catch(e) {
			}
		}
		
		$("#img_BG").hide();
		$("#img_BG2").hide();
		$("#img_colorbar1").hide();
		$("#img_colorbar2").hide();
		$("#img_dialogBox").hide();
		
		$("#txtLogin1").hide();
		
		$("#txtLogin2").hide();
		$("#txtLogin3").hide();	
		$("#txtLogin4").hide();
		$("#imgStudName").hide();
		$("#imgLoginPasswd").hide();

		$("#initPassword").hide();
		$("#errorMessage").hide();
		
		$("#btnLogin").hide();
		startTest();
	} else {
		$("#errorMessage").css("color", "#FF0000");
		$("#errorMessage").html("Access denied! Enter Password Again.");
		$("#initPassword").focus();
	}
}
