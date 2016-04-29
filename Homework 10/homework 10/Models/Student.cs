using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace homework_10.Models
{
    public class Student
    {
        public int id { get; set; }
        public string name { get; set; }
        public string level { get; set; }
        public string photo_filename { get; set; }
        public List<Course> Course { get; set; }
    }
}
