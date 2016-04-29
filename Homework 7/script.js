//students.js contains a variable students which has an array of student objects.  It is included seperately.
var coursesAPI = []; //Global coursesAPI array.
var studentsAPI = []; //Global studentsAPI array.  Was created to preserve original students array.
//Could simply be swapped with the normal "students" array if you didn't care about clobbering the old data.

$(document).ready(function () {
	loadStudents();

	//Trigger to open the studentModal.
	$('#studentModal').on('show.bs.modal', function (event)
	{
		var modal = $(this);
		//Clear the body spans of existing data.
		modal.find(".modal-body > span").empty();
		//Button that triggered the modal
		var button = $(event.relatedTarget); 
		//Extract the data sent from the button.
		var studentName = button.data('name');
		var studentClass = button.data("class");
		var studentID = button.data("id");
		var studentLevel = button.data("level");
		var studentOwner = button.data("owner");
		var studentPhoto = button.data("photo");
		var studentActive = button.data("active");

		
		//Insert the data into the modal.
		modal.find('.modal-title').text(studentName);
		if (studentID != undefined){ //Preserves use of modal for previous homework content.
			modal.find("#modalClasses").text("Classes:");
			$.get("http://web.cs.sunyit.edu/~lampej/web/api/Course/getCoursesForStudent/"+studentID)
			.done(function(data){
				for(course of data){
					modal.find("#modalClasses").append("<br/>"+course.coursenum+": "+course.name);
				}
			})
			.fail(function(){
				console.log("Failed to retrieve data from the API.");
			});
			modal.find('#studentID').text("ID: "+studentID);
			modal.find('#studentLevel').text("Level: "+studentLevel);
			modal.find('#studentOwner').text("Owner: "+studentOwner);
			modal.find('#studentActive').text("Active: "+studentActive);
			//If there was pictures, we could put them in a figure, then have an image inside it.
			//However since none exist in out data, we might as well just show "None".
			if(studentPhoto == "")
				modal.find('#studentPhoto').text("Photo Filename: None");
			else
				modal.find('#studentPhoto').text("Photo Filename: "+studentPhoto);
		}
		else
		modal.find('#modalClasses').text("Class: "+studentClass);
	});
	
	//Trigger for the classModal
	//Second modal was created instead of trying to shove a course into sections made for a student.
	//Making one, more versatile modal would probably be a better design.
	$('#courseModal').on('show.bs.modal', function (event)
	{
		var modal = $(this);
		//Clear the body spans of existing data.
		modal.find(".modal-body > span").empty();
		//Button that triggered the modal
		var button = $(event.relatedTarget);
		var courseNum = button.data("coursenum");
		var courseName = button.data("name");
		var courseMaxStudents = button.data("max_students");
		var courseOwner = button.data("owner");
		var courseActive = button.data("active");

		//Inser the data into the modal
		modal.find(".modal-title").text(courseNum+": "+courseName);
		modal.find("#courseMaxStudents").text("Max Students: "+courseMaxStudents);
		modal.find("#courseOwner").text("Owner: "+courseOwner);
		modal.find("#courseActive").text("Active: "+courseActive);
		modal.find("#courseStudents").text("Students: ");

		//Get active students
		$.get("http://web.cs.sunyit.edu/~lampej/web/api/Student/getStudentsInCourse/"+courseNum)
			.done(function(data){
				for(student of data){
					modal.find("#courseStudents").append("<br/>"+student.name);
				}
			})
			.fail(function(){
				console.log("Failed to retrieve data from the API.");
			});
	});
});

function loadStudents() {
	//Empty the students already present in each class's table, this removes redundant data when adding a student.
	$(".classPanel").empty();

	for (student of students){
		//Stuff buttonData with the button, datatoggle, target, and data we're sending to the modal.
		var buttonData = "<button class=\"col-md-12 col-sm-12 col-xs-12\" data-toggle=\"modal\" data-target=\"#studentModal\" data-name=\""+student.name+"\" data-class=\""+student.classNum+"\">";
		
		//For each student in the array, put their name, and the appropriate buttonData in a row element.
		var studentButtonEl = $(buttonData+student.name+"</button>");

		//Put the student's name into the table corresponding to the class they're attending.
		if(student.classNum == "CS108")
		{
			var panelBody = $("#cs108Body");
			panelBody.append(studentButtonEl);
		}
		if(student.classNum == "CS220")
		{
			var panelBody = $("#cs220Body");
			panelBody.append(studentButtonEl);
		}
		if(student.classNum == "CS240")
		{
			var panelBody = $("#cs240Body");
			panelBody.append(studentButtonEl);
		}
		if(student.classNum == "CS249")
		{
			var panelBody = $("#cs249Body");
			panelBody.append(studentButtonEl);
		}
		if(student.classNum == "CS490")
		{
			var panelBody = $("#cs490Body");
			panelBody.append(studentButtonEl);
		}
	}
}

function addStudent(){
	//Get the new student's name and class from the editbox and dropdown.
	var newNameInput = $("#newStudentName");
	var newName = $("#newStudentName").val();
	//Check to see if the studentName input is empty, if it is, add a red border around it and return.
	if(newName ==""){
		newNameInput.addClass("invalidInput");
		return;
	}
	//If the studentName input wasn't empty, and it had a red border on it from previous attempts, remove it.
	if(newNameInput.hasClass("invalidInput")){
		newNameInput.removeClass("invalidInput");
	}
	var newClass = $("#classDD option:selected").val();

	//Disable the button so they can't click it again until we're ready.
	var addButton = $("#addButton");
	addButton.attr("disabled", true);
	addButton.slideToggle();

	//Add a Spinner to where the button was.
	var spinner = $("#spinner");
	if(!spinner.hasClass("fa-spinner")){
		spinner.slideToggle();
		spinner.addClass("fa-spinner");
	}

	//Put the new name and class into appropriate object notation.
	var newStudent = {
		"name":newName,
		"classNum":newClass
	};

	//Push the newStudent object to the students array.
	students.push(newStudent);

	//Reset the editbox to blank.
	$("#newStudentName").val("");

	//Load the students again with the new student in the array.
	loadStudents();
	setTimeout(function () {
		spinner.slideToggle();
		spinner.removeClass("fa-spinner");
    	$("#addButton").attr("disabled", false);
    	addButton.slideToggle();
	}, 1500); 
	
}

function getAllStudentsAPI()
{
	$.get("http://web.cs.sunyit.edu/~lampej/web/api/Student/")
	.done(function(data){
		console.log("API Retreival Successful.");
		studentsAPI.length = 0; //Clears the array by setting the length to zero.
		for(student of data)
		{
			//Take each student, format it correctly, and push it to the array.
			var newid = student.id;
			var newName = student.name;
			var newLevel = student.level;
			var newOwner = student.owner;
			var newPhotoFilename = student.photo_filename;
			var newActive = student.active;
			var newStudent = {
				"id":newid,
				"name":newName,
				"level":newLevel,
				"owner":newOwner,
				"photo_filename":newPhotoFilename,
				"active":newActive
			};
			studentsAPI.push(newStudent);
		}
		//Load to the screen, all the students added to the array.
		loadAllStudentsAPI();
	})
	.fail(function(){
		console.log("Failed to retrieve data from the API.");
	});
}

function loadAllStudentsAPI(){
	//Empty the existing values in the API panel.
	$(".apiDisplayPanel").empty();
	for(student of studentsAPI)
	{
		//Stuffing the button with appropriate data.
		var buttonData = "<button class=\"col-md-12 col-sm-12 col-xs-12\" data-toggle=\"modal\" data-target=\"#studentModal\" data-id=\""+student.id+"\" data-name=\""+student.name+"\" data-level=\""+student.level+"\" data-owner=\""+student.owner+"\" data-photo=\""+student.photo_filename+"\" data-active=\""+student.active+"\">";
		var studentButtonEl = $(buttonData+student.name+"</button>");
		//Append the button to the body of the display panel.
		$("#apiDisplayBody").append(studentButtonEl);
	}
}

function getAllCoursesAPI(){
	$.get("http://web.cs.sunyit.edu/~lampej/web/api/Course/")
	.done(function(data){
		console.log("API Retreival Successful.");
		coursesAPI.length = 0;
		for(course of data)
		{
			//Take each course, format it correctly, and push it to the array
			var newCourseNum = course.coursenum;
			var newName = course.name;
			var newMaxStudents = course.max_students;
			var newOwner = course.owner;
			var newActive = course.active;
			var newCourse = {
				"coursenum":newCourseNum,
				"name":newName,
				"max_students":newMaxStudents,
				"owner":newOwner,
				"active":newActive
			};
			coursesAPI.push(newCourse);
		}
		//Load to the screen, all the courses added to the array.
		loadAllCoursesAPI();
	})
	.fail(function(){
		console.log("Failed to retrieve data from the API.");
	});
}

function loadAllCoursesAPI(){
	//Empty the existing values in the API panel.
	$(".apiDisplayPanel").empty();
	for(course of coursesAPI)
	{
		//Stuffing the button with appropriate data.
		var buttonData = "<button class=\"col-md-12 col-sm-12 col-xs-12\" data-toggle=\"modal\" data-target=\"#courseModal\" data-coursenum=\""+course.coursenum+"\" data-name=\""+course.name+"\" data-max_students=\""+course.max_students+"\" data-owner=\""+course.owner+"\"  data-active=\""+course.active+"\">";
		var courseButtonEl = $(buttonData+course.coursenum+": "+course.name+"</button>");
		//Append the button to the body of the display panel.
		$("#apiDisplayBody").append(courseButtonEl);
	}
}