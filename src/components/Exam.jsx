import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Exam = ({ user }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [showWarning, setShowWarning] = useState(false);

  // Sample questions - you can replace these with your actual questions
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    // Add more questions as needed
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    try {
      // Calculate score
      const score = questions.reduce((acc, q, index) => {
        return acc + (answers[index] === q.correctAnswer ? 1 : 0);
      }, 0);

      // Save results
      const result = {
        examId: 'sample-exam-1',
        score,
        totalQuestions: questions.length,
        answers,
        timestamp: new Date().toISOString()
      };

      // Get existing results from localStorage
      const existingResults = JSON.parse(localStorage.getItem('examResults') || '[]');
      
      // Add new result
      existingResults.push(result);

      // Save to localStorage
      localStorage.setItem('examResults', JSON.stringify(existingResults));
      
      navigate('/results');
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3>Exam in Progress</h3>
          <div className="text-danger">
            Time Remaining: {formatTime(timeLeft)}
          </div>
        </Card.Header>
        <Card.Body>
          {showWarning && (
            <Alert variant="warning" onClose={() => setShowWarning(false)} dismissible>
              Are you sure you want to submit? You cannot change your answers after submission.
            </Alert>
          )}
          
          <div className="mb-4">
            <ProgressBar 
              now={(currentQuestion + 1) / questions.length * 100} 
              label={`Question ${currentQuestion + 1} of ${questions.length}`}
            />
          </div>

          <Card className="mb-4">
            <Card.Body>
              <h4>Question {currentQuestion + 1}</h4>
              <p>{questions[currentQuestion].question}</p>
              <div className="d-grid gap-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion] === option ? "primary" : "outline-primary"}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button
                variant="success"
                onClick={() => setShowWarning(true)}
              >
                Submit Exam
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Exam;