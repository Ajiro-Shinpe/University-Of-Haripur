import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveExamResult, calculateScore, calculatePercentage } from '../utils/examUtils';

export default function IdeologyAndConstitution() {
  const navigate = useNavigate();
  const location = useLocation();

  // All state hooks at the top
  const [totalTime, setTotalTime] = useState(3000);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFullscreenAlert, setShowFullscreenAlert] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showStartPopup, setShowStartPopup] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const questions = [
    {
      question: "What is the critical value of t* for a one-tailed test with 5 degrees of freedom at a 5% significance level?",
      options: ["2.015", "2.571", "3.365", "4.032"],
      correctAnswer: "2.015"
    },
    {
      question: "What is the primary characteristic that defines a community?",
      options: ["Shared location", "Common values/interests", "Same profession", "Online interaction"],
      correctAnswer: "Common values/interests"
    },
    {
      question: "For a 95% confidence level with 10 degrees of freedom, what is the t* value?",
      options: ["1.812", "2.228", "2.764", "3.169"],
      correctAnswer: "2.228"
    },
    {
      question: "Which type of community is formed based on geographic location?",
      options: ["Cultural community", "Religious community", "Geographical community", "Professional community"],
      correctAnswer: "Geographical community"
    },
    {
      question: "What is the z-score corresponding to a cumulative probability of 0.8413?",
      options: ["0.8", "0.9", "1.0", "1.1"],
      correctAnswer: "1.0"
    },
    {
      question: "What is an example of a virtual community?",
      options: ["A neighborhood", "An online forum", "A church group", "A sports team"],
      correctAnswer: "An online forum"
    },
    {
      question: "What is the critical value of F for 5 numerator and 10 denominator degrees of freedom at a 5% significance level?",
      options: ["2.52", "3.33", "4.24", "5.64"],
      correctAnswer: "3.33"
    },
    {
      question: "Which characteristic is essential for a community to function effectively?",
      options: ["Common interest", "Large population", "Government funding", "Advanced technology"],
      correctAnswer: "Common interest"
    },
    {
      question: "What is the chi-squared critical value for 3 degrees of freedom at a 1% significance level?",
      options: ["7.815", "9.210", "11.345", "16.266"],
      correctAnswer: "11.345"
    },
    {
      question: "What do communities primarily provide to their members?",
      options: ["Financial wealth", "Emotional support", "Job opportunities", "Technical skills"],
      correctAnswer: "Emotional support"
    },
    {
      question: "Which type of community is based on shared cultural backgrounds or traditions?",
      options: ["Geographical", "Cultural or Ethnic", "Religious", "Professional"],
      correctAnswer: "Cultural or Ethnic"
    },
    {
      question: "What is a key benefit of resource sharing in communities?",
      options: ["Increased taxes", "Collective problem-solving", "Government control", "Individual isolation"],
      correctAnswer: "Collective problem-solving"
    },
    {
      question: "What is the t* value for a two-tailed test with 20 degrees of freedom at a 1% significance level?",
      options: ["2.086", "2.528", "2.845", "3.850"],
      correctAnswer: "2.528"
    },
    {
      question: "Which challenge can affect community development?",
      options: ["Excessive engagement", "Resource abundance", "Conflict and divisions", "Too many members"],
      correctAnswer: "Conflict and divisions"
    },
    {
      question: "What is the z-score for a cumulative probability of 0.9772?",
      options: ["1.8", "1.9", "2.0", "2.1"],
      correctAnswer: "2.0"
    },
    {
      question: "What does a religious community primarily share?",
      options: ["Professional skills", "Beliefs and practices", "Geographic location", "Online platforms"],
      correctAnswer: "Beliefs and practices"
    },
    {
      question: "What is the F critical value for 3 numerator and 15 denominator degrees of freedom at a 1% significance level?",
      options: ["5.42", "6.55", "7.76", "9.34"],
      correctAnswer: "5.42"
    },
    {
      question: "Which element contributes to an individual's sense of identity?",
      options: ["Community membership", "Personal wealth", "Government policies", "Technological devices"],
      correctAnswer: "Community membership"
    },
    {
      question: "Which characteristic of a community ensures effective coordination among members?",
      options: ["Common Interest", "Communication", "Mutual Support", "Identity"],
      correctAnswer: "Communication"
    },
    {
      question: "What is a professional community primarily focused on?",
      options: ["Religious activities", "Career collaboration", "Geographic boundaries", "Online gaming"],
      correctAnswer: "Career collaboration"
    },
    {
      question: "What is the chi-squared critical value for 6 degrees of freedom at a 5% significance level?",
      options: ["12.592", "16.812", "22.458", "18.307"],
      correctAnswer: "12.592"
    },
    {
      question: "Which factor can strengthen social bonds in a geographical community?",
      options: ["Shared space", "Different languages", "Varied religions", "Diverse professions"],
      correctAnswer: "Shared space"
    },
    {
      question: "What is the t* value for a one-tailed test with 15 degrees of freedom at a 2.5% significance level?",
      options: ["1.753", "2.131", "2.602", "2.947"],
      correctAnswer: "2.131"
    },
    {
      question: "What is a common challenge faced by many communities?",
      options: ["Lack of engagement", "Too many resources", "Excessive communication", "Overpopulation"],
      correctAnswer: "Lack of engagement"
    },
    {
      question: "What type of community is formed through digital platforms?",
      options: ["Geographical", "Cultural", "Online or Virtual", "Religious"],
      correctAnswer: "Online or Virtual"
    },
    {
      question: "Which type of community forms around academic disciplines?",
      options: ["Cultural", "Professional", "Religious", "Virtual"],
      correctAnswer: "Professional"
    },
    {
      question: "What is the z-score corresponding to a cumulative probability of 0.6915?",
      options: ["0.4", "0.5", "0.6", "0.7"],
      correctAnswer: "0.5"
    },
    {
      question: "What does mutual support in a community help with?",
      options: ["Increasing taxes", "Overcoming challenges", "Creating conflicts", "Reducing communication"],
      correctAnswer: "Overcoming challenges"
    },
    {
      question: "What is the F critical value for 10 numerator and 20 denominator degrees of freedom at a 0.1% significance level?",
      options: ["4.39", "5.28", "6.46", "7.80"],
      correctAnswer: "5.28"
    },
    {
      question: "Which of these is a characteristic of healthy communities?",
      options: ["Effective communication", "Limited resources", "Frequent conflicts", "Member isolation"],
      correctAnswer: "Effective communication"
    },
    {
      question: "What is the primary role of communities in emotional well-being?",
      options: ["Providing isolation", "Offering emotional support", "Limiting communication", "Reducing resource sharing"],
      correctAnswer: "Offering emotional support"
    },
    {
      question: "What can cultural communities be based on?",
      options: ["Shared traditions", "Geographic location", "Online platforms", "Professional skills"],
      correctAnswer: "Shared traditions"
    },
    {
      question: "What is the t* value for a two-tailed test with 30 degrees of freedom at a 5% significance level?",
      options: ["1.697", "2.042", "2.457", "2.750"],
      correctAnswer: "2.042"
    },
    {
      question: "How do communities contribute to social responsibility?",
      options: ["By increasing isolation", "By encouraging positive contributions", "By limiting resources", "By reducing communication"],
      correctAnswer: "By encouraging positive contributions"
    },
    {
      question: "What is the chi-squared critical value for 10 degrees of freedom at a 0.1% significance level?",
      options: ["18.307", "23.209", "29.588", "27.877"],
      correctAnswer: "29.588"
    },
    {
      question: "What is a potential consequence of resource scarcity in communities?",
      options: ["Improved unity", "Strained development", "Increased engagement", "Better communication"],
      correctAnswer: "Strained development"
    },
    {
      question: "Which challenge can strain community development?",
      options: ["Effective communication", "Resource scarcity", "Mutual support", "Common interest"],
      correctAnswer: "Resource scarcity"
    },
    {
      question: "Which statement best describes a community?",
      options: ["A group of unrelated individuals", "A dynamic system of relationships", "A government organization", "A business corporation"],
      correctAnswer: "A dynamic system of relationships"
    },
    {
      question: "What is the z-score for a cumulative probability of 0.9987?",
      options: ["2.8", "2.9", "3.0", "3.1"],
      correctAnswer: "3.0"
    },
    {
      question: "What does a virtual community primarily rely on?",
      options: ["Physical meetings", "Digital platforms", "Geographic proximity", "Government support"],
      correctAnswer: "Digital platforms"
    },
    {
      question: "What is the F critical value for 4 numerator and 5 denominator degrees of freedom at a 5% significance level?",
      options: ["5.19", "6.26", "7.39", "8.45"],
      correctAnswer: "6.26"
    },
    {
      question: "Which benefit do communities NOT typically provide?",
      options: ["Emotional support", "Sense of belonging", "Complete financial security", "Resource sharing"],
      correctAnswer: "Complete financial security"
    },
    {
      question: "What instills a sense of responsibility in community members?",
      options: ["Social responsibility", "Lack of engagement", "Conflicts", "Resource scarcity"],
      correctAnswer: "Social responsibility"
    },
    {
      question: "What can help resolve conflicts within a community?",
      options: ["Effective communication", "Resource hoarding", "Member isolation", "Limited interaction"],
      correctAnswer: "Effective communication"
    },
    {
      question: "What is the t* value for a one-tailed test with 8 degrees of freedom at a 0.5% significance level?",
      options: ["2.896", "3.355", "4.501", "5.041"],
      correctAnswer: "3.355"
    },
    {
      question: "Which factor is crucial for maintaining community identity?",
      options: ["Frequent member changes", "Shared values and interests", "Government intervention", "Technological advancement"],
      correctAnswer: "Shared values and interests"
    },
    {
      question: "What is the chi-squared critical value for 4 degrees of freedom at a 5% significance level?",
      options: ["7.815", "9.488", "11.070", "13.277"],
      correctAnswer: "9.488"
    },
    {
      question: "What is a common purpose of professional communities?",
      options: ["Religious worship", "Knowledge sharing", "Geographic development", "Political campaigns"],
      correctAnswer: "Knowledge sharing"
    },
    {
      question: "Which type of community is based on shared religious beliefs?",
      options: ["Geographical", "Cultural", "Religious", "Professional"],
      correctAnswer: "Religious"
    },
    {
      question: "Which challenge is specific to online communities?",
      options: ["Physical distance", "Lack of digital access", "Geographic boundaries", "Resource abundance"],
      correctAnswer: "Lack of digital access"
    }
  ];
  // All useEffect hooks together
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }

    // Check if exam has already been taken
    const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    const examResult = savedResults.find(result => 
      result.examId === 'ideology-and-constitution' && 
      result.user?.rollNumber === user.rollNumber
    );

    if (examResult) {
      // If exam has been taken, redirect to results
      navigate('/results', { 
        state: { 
          result: examResult,
          currentUser: user
        } 
      });
      return;
    }

    setCurrentUser(user);
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (quizStarted && !quizSubmitted && totalTime > 0) {
      timer = setInterval(() => {
        setTotalTime((prev) => prev - 1);
      }, 1000);
    } else if (totalTime === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizSubmitted, totalTime]);

  useEffect(() => {
    if (quizStarted && !quizSubmitted) {
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
          setShowFullscreenAlert(true);
        } else {
          setShowFullscreenAlert(false);
        }
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }
  }, [quizStarted, quizSubmitted]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (quizStarted && !quizSubmitted) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave the exam?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [quizStarted, quizSubmitted]);

  useEffect(() => {
    if (quizStarted && !quizSubmitted) {
      const handlePopState = () => {
        // Only prevent navigation if the quiz is in progress
        if (quizStarted && !quizSubmitted) {
          window.history.pushState(null, '', location.pathname);
        }
      };

      // Add initial history entry
      window.history.pushState(null, '', location.pathname);
      
      // Add event listener
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [quizStarted, quizSubmitted, location.pathname]);

  // All handler functions
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setShowStartPopup(false);
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  };

  const handleOptionSelect = (option) => {
    const newSelectedOptions = { ...selectedOptions };
    if (newSelectedOptions[currentQuestion] === option) {
      delete newSelectedOptions[currentQuestion];
    } else {
      newSelectedOptions[currentQuestion] = option;
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
    setShowConfirmation(false);

    // Calculate score
    let score = 0;
    const answers = questions.map((q, index) => {
      const isCorrect = selectedOptions[index] === q.correctAnswer;
      if (isCorrect) score++;
      return {
        question: q.question,
        selectedAnswer: selectedOptions[index] || 'Not answered',
        correctAnswer: q.correctAnswer,
        isCorrect
      };
    });

    // Calculate percentage
    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    const formattedPercentage = Number(percentage.toFixed(2));

    // Format date
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create result object
    const result = {
      examId: '2', // Fixed exam ID for Ideology and Constitution
      examTitle: 'Ideology and Constitution of Pakistan',
      courseName: 'Ideology and Constitution of Pakistan',
      date: formattedDate,
      score,
      totalQuestions,
      percentage: formattedPercentage,
      answers,
      timestamp: now.toISOString(),
      user: {
        fullName: currentUser.fullName,
        fatherName: currentUser.fatherName,
        rollNumber: currentUser.rollNumber,
        programName: currentUser.programName,
        section: currentUser.section,
        department: currentUser.department,
        currentSemester: currentUser.currentSemester,
        batch: currentUser.batch,
        academicSession: currentUser.academicSession
      }
    };

    // Save to localStorage
    const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    // Remove any existing result for this exam and user
    const filteredResults = savedResults.filter(r => 
      !(r.examId === '2' && r.user?.rollNumber === currentUser.rollNumber)
    );
    filteredResults.push(result);
    localStorage.setItem('examResults', JSON.stringify(filteredResults));

    // Update user's academic results
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        academicResults: [...(currentUser.academicResults || []), result]
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    // Navigate to results page with the result data
    navigate('/results', { 
      state: { 
        result,
        currentUser: {
          ...currentUser,
          academicResults: [...(currentUser.academicResults || []), result]
        }
      } 
    });
  };

  const updateProgressBar = () => {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    return Math.min(progress, 100); // Ensure we don't exceed 100%
  };

  const formatTime = () => {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0")
    };
  };

  const time = formatTime();

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: '"Jost", sans-serif',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          borderRadius: '6px',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          maxWidth: '320px',
          width: '85%'
        }}>
          <h2 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>Loading...</h2>
          <p style={{ color: '#151515', fontSize: '14px', lineHeight: '1.4' }}>Please wait while we prepare your exam.</p>
        </div>
      </div>
    );
  }

  // Quiz submitted state
  if (quizSubmitted) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: '"Jost", sans-serif',
        backgroundColor: '#ffffff'
      }}>
        <h2 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Quiz Submitted Successfully!</h2>
        <button 
          onClick={() => navigate('/results')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3c96fd',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            width: 'auto'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2558a4'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3c96fd'}
        >
          View Results
        </button>
      </div>
    );
  }

  // Start popup
  if (showStartPopup) {
    return (
      <div className="popup-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9998,
        fontFamily: '"Jost", sans-serif'
      }}>
        <div className="popup-box" style={{
          backgroundColor: '#ffffff',
          borderRadius: '6px',
          padding: '20px',
          width: '85%',
          maxWidth: '320px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Ready to Start the Quiz?</h2>
          <div style={{ borderBottom: '1px solid #ccc', margin: '8px 0' }}></div>
          <p style={{ fontSize: '14px', color: '#151515', margin: '12px 0', lineHeight: '1.4' }}>
            Please click the button below to start the quiz in full-screen mode. You will not be able to exit until you finish the quiz.
          </p>
          <div style={{ borderBottom: '1px solid #ccc', margin: '8px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button 
              onClick={handleStartQuiz}
              style={{
                backgroundColor: '#3c96fd',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                width: 'auto'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2558a4'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3c96fd'}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fullscreen alert
  if (showFullscreenAlert) {
    return (
      <div className="overlay" style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div className="alert" style={{
          background: 'white',
          color: '#333',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '400px'
        }}>
          <h2 style={{ fontSize: '22px', margin: '10px 0' }}>We Noticed Something!</h2>
          <p style={{ fontSize: '16px', margin: '15px 0 20px' }}>
            It seems you've left fullscreen mode.<br />
            For the integrity of the exam, please return to fullscreen to continue.
          </p>
          <button 
            onClick={() => {
              document.documentElement.requestFullscreen();
              setShowFullscreenAlert(false);
            }}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              background: '#5c6ac4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.background = '#404ab1'}
            onMouseOut={(e) => e.target.style.background = '#5c6ac4'}
          >
            Re-enter Fullscreen
          </button>
        </div>
      </div>
    );
  }

  // Confirmation dialog
  if (showConfirmation) {
    return (
      <div style={{
        display: 'flex',
        position: 'fixed',
        zIndex: 9999,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          width: '85%',
          maxWidth: '320px',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f5c391',
            color: '#f39c12',
            borderRadius: '50%',
            fontSize: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px auto',
            fontWeight: 'bold',
            backgroundColor: 'transparent'
          }}>!</div>
          <h2 style={{ marginTop: '10px', marginBottom: '12px', fontSize: '18px' }}>Exam Submission?</h2>
          <p style={{ marginBottom: '20px', fontSize: '14px' }}>Are you sure you want to submit the quiz?</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <button 
              onClick={() => setShowConfirmation(false)}
              style={{
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                backgroundColor: '#ccc',
                color: '#333',
                minWidth: '100px',
                maxWidth: '130px'
              }}
            >
              No, cancel it!
            </button>
            <button 
              onClick={handleSubmit}
              style={{
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                backgroundColor: '#7a69e6',
                color: 'white',
                minWidth: '100px',
                maxWidth: '130px'
              }}
            >
              Yes, I am sure!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main exam interface
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <div className="quiz-container" style={{
        display: quizStarted ? 'block' : 'none',
        backgroundColor: '#ffffff',
        height: 'auto',
        fontFamily: '"Jost", sans-serif',
        fontSize: '15px',
        fontWeight: 400
      }}>
        <div className="timer-container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00678b',
          padding: '50px 10px 20px 10px',
          borderRadius: 0,
          position: 'relative',
          flexDirection: 'column',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          margin: '-20px'
        }}>
          <div className="timer-box" style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <div style={{
              backgroundColor: 'yellow',
              padding: '8px 15px',
              fontSize: '20px',
              borderRadius: '5px',
              border: '2px solid rgb(252, 252, 252)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>{time.hours}</div>
            <span style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>:</span>
            <div style={{
              backgroundColor: 'yellow',
              padding: '8px 15px',
              fontSize: '20px',
              borderRadius: '5px',
              border: '2px solid rgb(252, 252, 252)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>{time.minutes}</div>
            <span style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>:</span>
            <div style={{
              backgroundColor: 'yellow',
              padding: '8px 15px',
              fontSize: '20px',
              borderRadius: '5px',
              border: '2px solid rgb(252, 252, 252)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>{time.seconds}</div>
          </div>
          <div className="timer-labels" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            fontSize: '12px',
            color: 'white',
            fontWeight: 'bold',
            marginTop: '2px',
            marginBottom: '1px'
          }}>
            <span>HOURS</span>
            <span>MIN</span>
            <span>SEC</span>
          </div>
          <div className="yellow-line" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            backgroundColor: '#ffff00',
            boxShadow: `
              0 2px 4px rgba(0, 0, 0, 1),
              0 4px 8px rgba(0, 0, 0, 1),
              0 6px 12px rgba(0, 0, 0, 1),
              0 10px 20px rgba(0, 0, 0, 0.9),
              0 20px 40px rgba(0, 0, 0, 0.6),
              0 30px 60px rgba(0, 0, 0, 0.3),
              0 40px 80px rgba(0, 0, 0, 0.1)
            `
          }}></div>
        </div>
        <div className="quiz-body" style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          overflowY: 'visible',
          margin: '0 auto',
          padding: '10px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box'
        }}>
          <div className="white-line" style={{
            width: '100%',
            height: '20px',
            marginTop: '160px',
            backgroundColor: '#ffffff'
          }}></div>
          <div className="section-header" style={{
            backgroundColor: '#00678b',
            color: 'white',
            padding: '10px',
            marginBottom: '1px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            boxSizing: 'border-box',
            fontWeight: 'bold'
          }}><b>Name:</b> &nbsp; {currentUser?.fullName}</div>
          <div className="section-header" style={{
            backgroundColor: '#00678b',
            color: 'white',
            padding: '10px',
            marginBottom: '1px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            boxSizing: 'border-box',
            fontWeight: 'bold'
          }}><b>Father Name:</b> &nbsp; {currentUser?.fatherName}</div>
          <div className="section-header" style={{
            backgroundColor: '#00678b',
            color: 'white',
            padding: '10px',
            marginBottom: '1px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            boxSizing: 'border-box',
            fontWeight: 'bold'
          }}><b>Roll No:</b> &nbsp; {currentUser?.rollNumber}</div>
          <div className="section-header" style={{
            backgroundColor: '#00678b',
            color: 'white',
            padding: '10px',
            marginBottom: '1px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            boxSizing: 'border-box',
            fontWeight: 'bold'
          }}><b>Program:</b> &nbsp; {currentUser?.programName}</div>
          <div className="section-header" style={{
            backgroundColor: '#00678b',
            color: 'white',
            padding: '10px',
            marginBottom: '1px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            boxSizing: 'border-box',
            fontWeight: 'bold'
          }}><b>Section:</b> &nbsp; {currentUser?.section}</div>
          <div className="section-header" style={{
            backgroundColor: '#00678b',
            color: 'white',
            padding: '10px',
            marginBottom: '1px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            boxSizing: 'border-box',
            fontWeight: 'bold'
          }}><b>Course:</b>&nbsp; Ideology and Constitution</div>
          <div className="question-number" style={{
            fontSize: '25px',
            margin: '25px 0',
            display: 'flex',
            fontWeight: 'bold',
            width: '100%',
            justifyContent: 'center'
          }}>Question <span>{currentQuestion + 1}</span> of {questions.length}</div>
          <div className="question-text" style={{
            fontSize: '18px',
            textAlign: 'center',
            marginBottom: '30px',
            lineHeight: '1.3',
            fontWeight: 'bold'
          }}>{questions[currentQuestion].question}</div>
          {['A', 'B', 'C', 'D'].map((letter, index) => (
            <div 
              key={index}
              onClick={() => handleOptionSelect(questions[currentQuestion].options[index])}
              className="option" style={{
                backgroundColor: selectedOptions[currentQuestion] === questions[currentQuestion].options[index] ? '#00678b' : '#f5f5f5',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                display: 'flex',
                alignItems: 'flex-start',
                cursor: 'pointer',
                color: selectedOptions[currentQuestion] === questions[currentQuestion].options[index] ? 'white' : '#151515'
              }}
            >
              <div className="latter_box" style={{
                margin: '0px 10px',
                width: '40px',
                height: '40px',
                border: '1px solid rgba(171, 171, 171, 0.347)',
                display: 'flex',
                justifyContent: 'center',
                marginRight: '10px',
                backgroundColor: '#ffffff',
                flexShrink: '0'
              }}>
                <span className="option-letter" style={{
                  fontSize: '18px',
                  color: '#3f77af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}>{letter}</span>
              </div>
              <span>{questions[currentQuestion].options[index]}</span>
            </div>
          ))}
          <div className="progress-bar" style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#ffffff',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '40px',
            marginBottom: '30px'
          }}>
            <div className="progress-fill" style={{
              height: '100%',
              backgroundColor: '#ffff00',
              width: `${updateProgressBar()}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666',
            marginTop: '-25px',
            marginBottom: '20px'
          }}>
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="action-buttons" style={{
            backgroundColor: '#00678b',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '30px',
            borderRadius: '2px'
          }}>
            <button 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              style={{
                width: '100%',
                maxWidth: '200px',
                padding: '12px',
                border: 'none',
                backgroundColor: currentQuestion === 0 ? '#ccc' : '#ffff00',
                color: '#000000',
                borderRadius: '3px',
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
              onMouseDown={(e) => {
                if (currentQuestion !== 0) {
                  e.target.style.backgroundColor = '#008000';
                }
              }}
              onMouseUp={(e) => {
                if (currentQuestion !== 0) {
                  e.target.style.backgroundColor = '#ffff00';
                }
              }}
              onMouseLeave={(e) => {
                if (currentQuestion !== 0) {
                  e.target.style.backgroundColor = '#ffff00';
                }
              }}
            >
              PREVIOUS QUESTION
            </button>
            <button 
              onClick={handleNext}
              style={{
                width: '100%',
                maxWidth: '200px',
                border: 'none',
                padding: '12px',
                backgroundColor: '#ffff00',
                color: '#000000',
                borderRadius: '3px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
              onClickCapture={(e) => e.target.style.backgroundColor = '#008000'}
              onMouseUp={(e) => e.target.style.backgroundColor = '#ffff00'}
            >
              {currentQuestion === questions.length - 1 ? 'SUBMIT QUIZ' : 'NEXT QUESTION'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}