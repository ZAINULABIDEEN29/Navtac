const users = [ 
  { name: "Alice", courses: ["Math", "Science", "English"] }, 
  { name: "Bob", courses: ["Math", "Art"] }, 
  { name: "Charlie", courses: ["Science", "Math", "History"] }, 
  { name: "David", courses: ["Math", "English"] }, 
  { name: "Eve", courses: ["Art", "Science"] } 
]; 

const courseCounts = {};

for (let i = 0; i < users.length; i++) {
  const courses = users[i].courses;
  for (let j = 0; j < courses.length; j++) {
    const course = courses[j];
    if (courseCounts[course]) {
      courseCounts[course]++;
    } else {
      courseCounts[course] = 1;
    }
  }
}

let maxCourse = "";
let maxCount = 0;

for (const course in courseCounts) {
    const count = courseCounts[course];
    console.log(`${course}: ${count} student${count > 1 ? 's' : ''}`);
    
    if (count > maxCount) {
        maxCount = count;
        maxCourse = course;
    }
}

console.log(`Most popular course: ${maxCourse} with ${maxCount} students`);
