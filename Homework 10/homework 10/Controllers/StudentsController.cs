using homework_10.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace homework_10.Controllers
{
    public class StudentsController : ApiController
    {
        Student[] Students = new Student[]
        {
            // Data setup is kind of strange due to it being dummy data.  Should technically use a relational database to represent it better.
            new Student
            {
                id = 0, name = "Jeff", level = "Senior", photo_filename = "", Course = new List<Course>
                {
                    new Course { coursenum = "CS108", name = "Computing Fundamentals", max_students = 20 },
                    new Course { coursenum = "CS490", name = "Web Design and Programming", max_students = 30 }
                }
            },
            new Student
            { id = 1, name = "Sam", level = "Junior", photo_filename = "", Course = new List<Course>
                {
                    new Course { coursenum = "CS108", name = "Computing Fundamentals", max_students = 20 }
                }
            },
            new Student
            {
                id = 2, name = "Greg", level = "Senior", photo_filename = "", Course = new List<Course>
                {
                    new Course { coursenum = "CS490", name = "Web Design and Programming", max_students = 30 }
                }
            },
            new Student
            {
                id = 3, name = "John", level = "Senior", photo_filename = "",  Course = new List<Course>
                {
                    new Course { coursenum = "CS108", name = "Computing Fundamentals", max_students = 20 },
                    new Course { coursenum = "CS490", name = "Web Design and Programming", max_students = 30 }
                }
            }
        };

        //Equivilent to http://localhost_or_similar/Students/GetAll 
        //We could add another parameter in the WebApiConfig so that it would be {controller}/{command}/{id}.
        //Then we could check to see what the command is, but it just feels like it's adding unneeded layer of complexity to the problem.
        public IHttpActionResult GetAllStudents() // "localhost/students/" returns all students.
        {
            return Json(Students); // forces JSON to be returned.
            //The documentation for the .net restful apis leads me to believe that if you leave it as just "return Students;"
            //whoever is making the request can request xml or json in the head.
            //However for the homework assignment we just want JSON and all my browsers were defaulting to XML, so I forced it to JSON.
        }

        //Equivilent to http://localhost_or_similar/Students/GetStudentsInCourse 
        public IHttpActionResult GetStudentsInCourse(string id)  // "localhost/students/coursenum" returns all students in the specific course, ex. cs490.
        {
            //Get all students where any of the student's coursesnumbers equal the coursenumber requested. Also ignore case sensitivity.
            var students = Students.Where((s) => s.Course.Any((c) => c.coursenum.Equals(id, StringComparison.OrdinalIgnoreCase)));
            if (students == null)
            {
                return NotFound();
            }
            return Json(students);
        }
    }
}
