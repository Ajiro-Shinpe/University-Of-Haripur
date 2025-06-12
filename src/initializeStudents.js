const students = [
  {
    "fullName": "Al Rayyan Khan",
    "fatherName": "Sultan Mehmood",
    "cnicNumber": "1330222649125",
    "universityId": "F24-0845-DOB-BS(ZO)/UOH",
    "academicSession": "Spring 2025",
    "department": "Biology",
    "programName": "Bachelor of Studies in Zoology",
    "currentSemester": "2nd",
    "batch": "Batch-9",
    "section": "A",
    "dateOfBirth": "2006-08-31",
    "religion": "Islam",
    "emailAddress": "F24-0845@student.uoh.edu.pk",
    "accountPassword": "wa938qxc",
    "rollNumber": "F24-0845",
    "academicResults": []
  },
  {
    "fullName": "Arooj Rasheed",
    "fatherName": "Abdul Rasheed",
    "cnicNumber": "1330286131382",
    "universityId": "F24-0194-MIC-BS(Micro)/UOH",
    "academicSession": "Spring 2025",
    "department": "Microbiology",
    "programName": "BS (4 years) of Microbiology",
    "currentSemester": "2nd",
    "batch": "Batch-16",
    "section": "A",
    "dateOfBirth": "2005-06-27",
    "religion": "Islam",
    "emailAddress": "F24-0194@student.uoh.edu.pk",
    "accountPassword": "qj474pkg",
    "rollNumber": "F24-0194",
    "academicResults": []
  }
];

// Save to localStorage
localStorage.setItem('students', JSON.stringify(students));
console.log('Students data initialized successfully'); 