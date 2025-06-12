const generateStudents = () => {
  const departments = ['Computer Science', 'Biology', 'Chemistry', 'Physics', 'Mathematics'];
  const programs = [
    'Bachelor of Science in Computer Science',
    'Bachelor of Studies in Zoology',
    'Bachelor of Science in Chemistry',
    'Bachelor of Science in Physics',
    'Bachelor of Science in Mathematics'
  ];
  const sessions = ['Spring 2025', 'Fall 2024'];
  const batches = ['Batch-9', 'Batch-8', 'Batch-7'];
  const sections = ['A', 'B', 'C'];
  const religions = ['ISLAM', 'CHRISTIANITY', 'HINDUISM'];

  const students = [];

  for (let i = 1; i <= 100; i++) {
    const studentId = `F24-${String(i).padStart(4, '0')}`;
    const deptIndex = Math.floor(Math.random() * departments.length);
    
    students.push({
      userImage: 'default-image.png',
      name: `Student ${i}`,
      fatherName: `Father ${i}`,
      cnic: `${1330222649125 + i}`,
      session: sessions[Math.floor(Math.random() * sessions.length)],
      department: departments[deptIndex],
      program: programs[deptIndex],
      currentSemester: `${Math.floor(Math.random() * 8) + 1}${['st', 'nd', 'rd', 'th'][Math.floor(Math.random() * 4)]}`,
      batch: batches[Math.floor(Math.random() * batches.length)],
      section: sections[Math.floor(Math.random() * sections.length)],
      dateOfBirth: `200${Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      religion: religions[Math.floor(Math.random() * religions.length)],
      email: `${studentId}@student.uoh.edu.pk`,
      password: Math.random().toString(36).slice(-8), // Generate random 8-character password
      studentId: studentId,
      results: []
    });
  }

  return students;
};

export default generateStudents; 