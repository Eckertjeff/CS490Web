using homework_10.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace homework_10.Controllers
{
    public class CoursesController : ApiController
    {
        //StudentsController is more thoroughly commented with rational for design choices that would just be repeated here.
        Course[] Courses = new Course[]
        {
            new Course
            {
                coursenum = "CS108", name = "Computing Fundamentals", max_students = 20, students = new List<Student>
                {
                    new Student { id = 0, name = "Jeff", level = "Senior", photo_filename = "" },
                    new Student { id = 1, name = "Sam", level = "Junior", photo_filename = "" },
                    new Student { id = 3, name = "John", level = "Senior", photo_filename = "" }
                }
            }, 
            new Course
            {
                coursenum = "CS490", name = "Web Design and Programming", max_students = 30, students = new List<Student>
                {   new Student { id = 0, name = "Jeff", level = "Senior", photo_filename = "" },
                    new Student { id = 2, name = "Greg", level = "Senior", photo_filename = "" },
                    new Student { id = 3, name = "John", level = "Senior", photo_filename = "" }
                }
            }
        };

        //Equivilent to http://localhost_or_similar/Courses/GetAll
        public IHttpActionResult GetAllCourses() // "localhost/courses" returns all courses.
        {
            return Json(Courses);
        }

        //Equivilent to http://localhost_or_similar/Courses/GetCoursesForStudent 
        public IHttpActionResult GetCoursesForStudent(int id) // "localhost/courses/studentid" returns all courses that that student is in.
        {
            //Get all the courses where any of the students in the course have an id that equals the id requested.
            var course = Courses.Where((c) => c.students.Any((s) => s.id == id));
            if (course == null)
            {
                return NotFound();
            }
            return Json(course);
        }
    }
}
