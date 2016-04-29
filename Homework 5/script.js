//students.js contains a variable students which has an array of student objects.  It is included seperately.

$(document).ready(function () {
	loadStudents();
});

function loadStudents() {
	//Empty the students already present in each class's table, this removes redundant data when adding a student.
	$("#cs108Table > tbody > tr:not(:first-child)").empty();
	$("#cs220Table > tbody > tr:not(:first-child)").empty();
	$("#cs240Table > tbody > tr:not(:first-child)").empty();
	$("#cs249Table > tbody > tr:not(:first-child)").empty();

	for (student of students){
		//For each student in the array, put their name in a row element.
		var trEl = $("<tr><td>"+student.name+"</td></tr>");

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
	//Get the new student's name and class from the editbox and dropdown
	var newName = $("#newStudentName").val();
	var newClass = $("#classDD option:selected").val();

	//Put the new name and class into appropriate object notation
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
}
