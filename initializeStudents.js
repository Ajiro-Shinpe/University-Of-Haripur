const students = [];
const departments = ['Biology', 'Computer Science', 'Physics', 'Chemistry'];
const programs = ['Bachelor of Studies in Zoology', 'BS Computer Science', 'BS Physics', 'BS Chemistry'];
const sessions = ['Spring 2025', 'Fall 2025', 'Spring 2024', 'Fall 2024'];
const batches = ['Batch-9', 'Batch-10', 'Batch-11'];
const sections = ['A', 'B', 'C'];

for (let i = 1; i <= 100; i++) {
  const studentId = `F24-${String(i).padStart(4, '0')}`;
  const student = {
    userImage: 'default-image.png',
    name: `Student ${i}`,
    fatherName: `Parent ${i}`,
    cnic: `13302${String(i).padStart(9, '0')}`,
    session: sessions[Math.floor(Math.random() * sessions.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    program: programs[Math.floor(Math.random() * programs.length)],
    currentSemester: `${Math.floor(Math.random() * 8) + 1}th`,
    batch: batches[Math.floor(Math.random() * batches.length)],
    section: sections[Math.floor(Math.random() * sections.length)],
    dateOfBirth: `200${Math.floor(Math.random() * 5) + 2}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    religion: 'ISLAM',
    email: `${studentId}@student.uoh.edu.pk`,
    password: `pass${i}`,
    studentId: studentId,
    results: []
  };
  students.push(student);
}

// Save to localStorage
localStorage.setItem('students', JSON.stringify(students));
console.log('100 students initialized in localStorage');