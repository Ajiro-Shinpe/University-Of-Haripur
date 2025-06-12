export const saveExamResult = (result) => {
  try {
    // Get existing results
    const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    
    // Remove any existing result for this exam and user
    const filteredResults = savedResults.filter(r => 
      !(r.examId === result.examId && r.user?.rollNumber === result.user?.rollNumber)
    );
    
    // Add new result
    filteredResults.push(result);
    
    // Save back to localStorage
    localStorage.setItem('examResults', JSON.stringify(filteredResults));
    
    // Update user's academic results
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        academicResults: [...(currentUser.academicResults || []), result]
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    
    return true;
  } catch (error) {
    console.error('Error saving exam result:', error);
    return false;
  }
};

export const calculateScore = (questions, selectedOptions) => {
  let score = 0;
  questions.forEach((question, index) => {
    if (selectedOptions[index] === question.correctAnswer) {
      score++;
    }
  });
  return score;
};

export const calculatePercentage = (score, totalQuestions) => {
  return ((score / totalQuestions) * 100).toFixed(2);
}; 