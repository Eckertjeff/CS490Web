using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace homework_10.Models
{
    public class Course
    {
        public string coursenum { get; set; }
        public string name { get; set; }
        public int max_students { get; set; }
        public List<Student> students { get; set; }
    }
}
