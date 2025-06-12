import studentsData from '../data/students-info.json';

const initializeStudents = () => {
  try {
    // Get existing students from localStorage
    const existingStudents = JSON.parse(localStorage.getItem('students')) || [];
    
    // If no data exists, initialize with the data from students-info.json
    if (existingStudents.length === 0) {
      localStorage.setItem('students', JSON.stringify(studentsData));
      console.log('Students data initialized successfully');
    } else {
      // Merge new students with existing ones, avoiding duplicates
      const newStudents = studentsData.filter(newStudent => 
        !existingStudents.some(existingStudent => 
          existingStudent.rollNumber === newStudent.rollNumber
        )
      );
      
      if (newStudents.length > 0) {
        const updatedStudents = [...existingStudents, ...newStudents];
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        console.log('New students added to existing data');
      }
    }
  } catch (error) {
    console.error('Error initializing students data:', error);
  }
};

export default initializeStudents; 