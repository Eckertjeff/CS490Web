//students.js contains a variable students which has an array of student objects.  It is included seperately.

$(document).ready(function () {
	loadStudents();

	//Trigger to open the studentModal.
	$('#studentModal').on('show.bs.modal', function (event) {
		//Button that triggered the modal
		var button = $(event.relatedTarget); 
		//Extract the data sent from the button.
		var studentName = button.data('name');
		var studentClass = button.data("class");
		var modal = $(this);
		//Insert the data into the modal.
		modal.find('.modal-title').text(studentName);
		modal.find('#modalClasses').text("Class: "+studentClass);
	});
});

function loadStudents() {
	//Empty the students already present in each class's table, this removes redundant data when adding a student.
	$("#cs108Table > tbody > tr:not(:first-child)").empty();
	$("#cs220Table > tbody > tr:not(:first-child)").empty();
	$("#cs240Table > tbody > tr:not(:first-child)").empty();
	$("#cs249Table > tbody > tr:not(:first-child)").empty();

	for (student of students){
		//Stuff buttonData with the button, datatoggle, target, and data we're sending to the modal.
		var buttonData = "<button data-toggle=\"modal\" data-target=\"#studentModal\" data-name=\""+student.name+"\" data-class=\""+student.classNum+"\">";
		
		//For each student in the array, put their name, and the appropriate buttonData in a row element.
		var trEl = $("<tr><td>"+buttonData+student.name+"</button></td></tr>");

		//Put the student's name into the table corresponding to the class they're attending.
		if(student.classNum == "CS108")
		{
			var table = $("#cs108Table > tbody");
			table.append(trEl);
		}
		if(student.classNum == "CS220")
		{
			var table = $("#cs220Table > tbody");
			table.append(trEl);
		}
		if(student.classNum == "CS240")
		{
			var table = $("#cs240Table > tbody");
			table.append(trEl);
		}
		if(student.classNum == "CS249")
		{
			var table = $("#cs249Table > tbody");
			table.append(trEl);
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
