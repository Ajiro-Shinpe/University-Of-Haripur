import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function QuantitativeReasoning() {
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

  const questions = [
    {
      question: "What is the primary characteristic that defines a community?",
      options: ["Shared location", "Common values/interests", "Same profession", "Online interaction"],
      correctAnswer: "Common values/interests"
    },
    {
      question: "Which type of community is formed based on geographic location?",
      options: ["Cultural community", "Religious community", "Geographical community", "Professional community"],
      correctAnswer: "Geographical community"
    },
    {
      question: "What is an example of a virtual community?",
      options: ["A neighborhood", "An online forum", "A church group", "A sports team"],
      correctAnswer: "An online forum"
    },
    {
      question: "Which characteristic is essential for a community to function effectively?",
      options: ["Common interest", "Large population", "Government funding", "Advanced technology"],
      correctAnswer: "Common interest"
    },
    {
      question: "What do communities primarily provide to their members?",
      options: ["Financial wealth", "Emotional support", "Job opportunities", "Technical skills"],
      correctAnswer: "Emotional support"
    },
    {
      question: "Which of the following is NOT a type of community mentioned?",
      options: ["Religious", "Academic", "Political", "Geographical"],
      correctAnswer: "Political"
    },
    {
      question: "What is a key benefit of resource sharing in communities?",
      options: ["Increased taxes", "Collective problem-solving", "Government control", "Individual isolation"],
      correctAnswer: "Collective problem-solving"
    },
    {
      question: "Which challenge can affect community development?",
      options: ["Excessive engagement", "Resource abundance", "Conflict and divisions", "Too many members"],
      correctAnswer: "Conflict and divisions"
    },
    {
      question: "What does a religious community primarily share?",
      options: ["Professional skills", "Beliefs and practices", "Geographic location", "Online platforms"],
      correctAnswer: "Beliefs and practices"
    },
    {
      question: "Which element contributes to an individual's sense of identity?",
      options: ["Community membership", "Personal wealth", "Government policies", "Technological devices"],
      correctAnswer: "Community membership"
    },
    {
      question: "What is a professional community primarily focused on?",
      options: ["Religious activities", "Career collaboration", "Geographic boundaries", "Online gaming"],
      correctAnswer: "Career collaboration"
    },
    {
      question: "Which factor can strengthen social bonds in a geographical community?",
      options: ["Shared space", "Different languages", "Varied religions", "Diverse professions"],
      correctAnswer: "Shared space"
    },
    {
      question: "What is a common challenge faced by many communities?",
      options: ["Lack of engagement", "Too many resources", "Excessive communication", "Overpopulation"],
      correctAnswer: "Lack of engagement"
    },
    {
      question: "Which type of community forms around academic disciplines?",
      options: ["Cultural", "Professional", "Religious", "Virtual"],
      correctAnswer: "Professional"
    },
    {
      question: "What does mutual support in a community help with?",
      options: ["Increasing taxes", "Overcoming challenges", "Creating conflicts", "Reducing communication"],
      correctAnswer: "Overcoming challenges"
    },
    {
      question: "Which of these is a characteristic of healthy communities?",
      options: ["Effective communication", "Limited resources", "Frequent conflicts", "Member isolation"],
      correctAnswer: "Effective communication"
    },
    {
      question: "What can cultural communities be based on?",
      options: ["Shared traditions", "Geographic location", "Online platforms", "Professional skills"],
      correctAnswer: "Shared traditions"
    },
    {
      question: "How do communities contribute to social responsibility?",
      options: ["By increasing isolation", "By encouraging positive contributions", "By limiting resources", "By reducing communication"],
      correctAnswer: "By encouraging positive contributions"
    },
    {
      question: "What is a potential consequence of resource scarcity in communities?",
      options: ["Improved unity", "Strained development", "Increased engagement", "Better communication"],
      correctAnswer: "Strained development"
    },
    {
      question: "Which statement best describes a community?",
      options: [
        "A group of unrelated individuals",
        "A dynamic system of relationships",
        "A government organization",
        "A business corporation"
      ],
      correctAnswer: "A dynamic system of relationships"
    },
    {
      question: "What does a virtual community primarily rely on?",
      options: ["Physical meetings", "Digital platforms", "Geographic proximity", "Government support"],
      correctAnswer: "Digital platforms"
    },
    {
      question: "Which benefit do communities NOT typically provide?",
      options: ["Emotional support", "Sense of belonging", "Complete financial security", "Resource sharing"],
      correctAnswer: "Complete financial security"
    },
    {
      question: "What can help resolve conflicts within a community?",
      options: ["Effective communication", "Resource hoarding", "Member isolation", "Limited interaction"],
      correctAnswer: "Effective communication"
    },
    {
      question: "Which factor is crucial for maintaining community identity?",
      options: ["Frequent member changes", "Shared values and interests", "Government intervention", "Technological advancement"],
      correctAnswer: "Shared values and interests"
    },
    {
      question: "What is a common purpose of professional communities?",
      options: ["Religious worship", "Knowledge sharing", "Geographic development", "Political campaigns"],
      correctAnswer: "Knowledge sharing"
    },
    {
      question: "Which challenge is specific to online communities?",
      options: ["Physical distance", "Lack of digital access", "Geographic boundaries", "Resource abundance"],
      correctAnswer: "Lack of digital access"
    },
    {
      question: "What does community engagement typically lead to?",
      options: ["Stronger bonds", "More conflicts", "Resource depletion", "Member isolation"],
      correctAnswer: "Stronger bonds"
    },
    {
      question: "Which element is NOT a characteristic of communities?",
      options: ["Common interest", "Communication", "Isolation", "Mutual support"],
      correctAnswer: "Isolation"
    },
    {
      question: "What role does communication play in communities?",
      options: ["Creates divisions", "Enables coordination", "Reduces resources", "Limits membership"],
      correctAnswer: "Enables coordination"
    },
    {
      question: "Which type of community would a neighborhood fall under?",
      options: ["Cultural", "Religious", "Geographical", "Professional"],
      correctAnswer: "Geographical"
    },
    {
      question: "What is a primary function of cultural communities?",
      options: ["Share professional skills", "Preserve traditions", "Develop technology", "Govern geographic areas"],
      correctAnswer: "Preserve traditions"
    },
    {
      question: "How do communities affect individual well-being?",
      options: ["Increase isolation", "Reduce sense of belonging", "Provide support systems", "Limit personal growth"],
      correctAnswer: "Provide support systems"
    },
    {
      question: "Which factor can threaten community unity?",
      options: ["Shared values", "Effective communication", "Differing opinions", "Mutual support"],
      correctAnswer: "Differing opinions"
    },
    {
      question: "What is essential for collective problem-solving in communities?",
      options: ["Member cooperation", "Government control", "Individual isolation", "Resource hoarding"],
      correctAnswer: "Member cooperation"
    },
    {
      question: "Which benefit is specific to geographical communities?",
      options: ["Online interaction", "Localized governance", "Global membership", "Virtual communication"],
      correctAnswer: "Localized governance"
    },
    {
      question: "What does a lack of engagement in communities lead to?",
      options: ["Stronger bonds", "Community decline", "More resources", "Better communication"],
      correctAnswer: "Community decline"
    },
    {
      question: "Which element is crucial for virtual communities?",
      options: ["Physical proximity", "Internet access", "Government funding", "Religious unity"],
      correctAnswer: "Internet access"
    },
    {
      question: "What do religious communities primarily gather for?",
      options: ["Professional development", "Worship and ceremonies", "Geographic planning", "Online gaming"],
      correctAnswer: "Worship and ceremonies"
    },
    {
      question: "How do communities contribute to progress?",
      options: ["Through isolation", "By limiting communication", "Via human connection", "Through government control"],
      correctAnswer: "Via human connection"
    },
    {
      question: "Which challenge is common to all community types?",
      options: ["Maintaining engagement", "Lack of common interests", "Too many resources", "Physical distance"],
      correctAnswer: "Maintaining engagement"
    },
    {
      question: "What is the foundation of cultural/ethnic communities?",
      options: ["Shared backgrounds", "Professional skills", "Online platforms", "Government policies"],
      correctAnswer: "Shared backgrounds"
    },
    {
      question: "Which factor helps communities overcome resource scarcity?",
      options: ["Resource sharing", "Member isolation", "Limited communication", "Government control"],
      correctAnswer: "Resource sharing"
    },
    {
      question: "What does community membership provide to individuals?",
      options: ["Complete independence", "Sense of purpose", "Financial wealth", "Technological skills"],
      correctAnswer: "Sense of purpose"
    },
    {
      question: "Which statement about online communities is true?",
      options: [
        "They require physical proximity",
        "They interact through digital platforms",
        "They are limited by geography",
        "They don't share common interests"
      ],
      correctAnswer: "They interact through digital platforms"
    },
    {
      question: "What is a key difference between physical and virtual communities?",
      options: [
        "Virtual communities don't communicate",
        "Physical communities don't share interests",
        "Virtual communities rely on digital interaction",
        "Physical communities have no structure"
      ],
      correctAnswer: "Virtual communities rely on digital interaction"
    },
    {
      question: "How do communities instill social responsibility?",
      options: [
        "By encouraging selfishness",
        "Through positive contributions",
        "By limiting member interaction",
        "Through government enforcement"
      ],
      correctAnswer: "Through positive contributions"
    },
    {
      question: "Which factor is most important for community identity?",
      options: ["Government control", "Shared characteristics", "Member wealth", "Technological access"],
      correctAnswer: "Shared characteristics"
    },
    {
      question: "What is the primary purpose of academic communities?",
      options: ["Religious worship", "Knowledge collaboration", "Geographic planning", "Political organization"],
      correctAnswer: "Knowledge collaboration"
    },
    {
      question: "Which challenge is unique to geographical communities?",
      options: ["Digital access", "Local resource management", "Online communication", "Virtual interaction"],
      correctAnswer: "Local resource management"
    },
    {
      question: "What is the ultimate value of communities according to the content?",
      options: [
        "Financial gain",
        "Human connection and cooperation",
        "Technological advancement",
        "Government control"
      ],
      correctAnswer: "Human connection and cooperation"
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
      result.examId === 'quantitative-reasoning' && 
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
  }, [navigate]); // Add navigate to dependencies

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
      navigate(location.pathname, { replace: true });
      window.onpopstate = () => {
        navigate(location.pathname, { replace: true });
      };
    }
  }, [quizStarted, quizSubmitted, navigate, location]);

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
        selectedAnswer: selectedOptions[index],
        correctAnswer: q.correctAnswer,
        isCorrect
      };
    });

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
      examId: location.pathname.split('/').pop(), // Get exam ID from URL
      examTitle: 'Quantitative Reasoning',
      courseName: 'Quantitative Reasoning-II',
      date: formattedDate,
      score,
      totalQuestions: questions.length,
      percentage: ((score / questions.length) * 100).toFixed(2),
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
    savedResults.push(result);
    localStorage.setItem('examResults', JSON.stringify(savedResults));

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
    return ((currentQuestion + 1) / questions.length) * 100;
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
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f4f8'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '30px',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#1a3c34', marginBottom: '1rem' }}>Loading...</h2>
          <p style={{ color: '#4a5e6d' }}>Please wait while we prepare your exam.</p>
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
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2>Quiz Submitted Successfully!</h2>
        <button 
          onClick={() => navigate('/results')}
          style={{
            padding: '10px 20px',
            marginTop: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          View Results
        </button>
      </div>
    );
  }

  // Start popup
  if (showStartPopup) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h2>Ready to Start?</h2>
          <p>This exam will be in fullscreen mode. Make sure you're ready to begin.</p>
          <button 
            onClick={() => {
              document.documentElement.requestFullscreen();
              setShowStartPopup(false);
              setQuizStarted(true);
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // Fullscreen alert
  if (showFullscreenAlert) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            margin: '0 auto 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
          </div>
          <h2>We Noticed Something!</h2>
          <p>It seems you've left fullscreen mode.<br />For the integrity of the exam, please return to fullscreen to continue.</p>
          <button 
            onClick={() => {
              document.documentElement.requestFullscreen();
              setShowFullscreenAlert(false);
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#ffeb3b',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 20px',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>!</div>
          <h2>Exam Submission?</h2>
          <p>Are you sure you want to submit the quiz?</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '20px'
          }}>
            <button 
              onClick={() => setShowConfirmation(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              No, cancel it!
            </button>
            <button 
              onClick={handleSubmit}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
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
      width: "100vw",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#D8EDE7",
      overflow: "auto",
      zIndex: 9999
    }}>
      {/* Loading state */}
      {isLoading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f0f4f8'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '30px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            maxWidth: '400px'
          }}>
            <h2 style={{ color: '#1a3c34', marginBottom: '1rem' }}>Loading...</h2>
            <p style={{ color: '#4a5e6d' }}>Please wait while we prepare your exam.</p>
          </div>
        </div>
      )}

      {/* Quiz submitted state */}
      {quizSubmitted && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          maxWidth: '100%',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h2>Quiz Submitted Successfully!</h2>
          <button 
            onClick={() => navigate('/results')}
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            View Results
          </button>
        </div>
      )}

      {/* Start popup */}
      {showStartPopup && !quizSubmitted && !isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <h2>Ready to Start?</h2>
            <p>This exam will be in fullscreen mode. Make sure you're ready to begin.</p>
            <button 
              onClick={() => {
                document.documentElement.requestFullscreen();
                setShowStartPopup(false);
                setQuizStarted(true);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Start Exam
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen alert */}
      {showFullscreenAlert && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              margin: '0 auto 20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>⚠️</span>
            </div>
            <h2>We Noticed Something!</h2>
            <p>It seems you've left fullscreen mode.<br />For the integrity of the exam, please return to fullscreen to continue.</p>
            <button 
              onClick={() => {
                document.documentElement.requestFullscreen();
                setShowFullscreenAlert(false);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Re-enter Fullscreen
            </button>
          </div>
        </div>
      )}

      {/* Confirmation dialog */}
      {showConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#ffeb3b',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto 20px',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>!</div>
            <h2>Exam Submission?</h2>
            <p>Are you sure you want to submit the quiz?</p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '20px'
            }}>
              <button 
                onClick={() => setShowConfirmation(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                No, cancel it!
              </button>
              <button 
                onClick={handleSubmit}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Yes, I am sure!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main exam interface */}
      {!isLoading && !quizSubmitted && !showStartPopup && !showFullscreenAlert && !showConfirmation && (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
          <div style={{
            maxWidth: '100%',
            margin: '0 auto',
            padding: '20px'
          }}>
            {/* Timer section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '5px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px'
              }}>
                <div style={{ backgroundColor: '#00ab41', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '1.2rem', fontWeight: '500' }}>
                  Time Remaining: {`${time.hours}:${time.minutes}:${time.seconds}`}
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '200px',
                marginTop: '5px',
                color: '#666'
              }}>
                <span>HOURS</span>
                <span>MIN</span>
                <span>SEC</span>
              </div>
              <div style={{
                height: '2px',
                width: '100%',
                backgroundColor: '#ffeb3b',
                marginTop: '10px'
              }} />
            </div>

            {/* Quiz body */}
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ height: '1px', backgroundColor: '#ccc', margin: '10px 0' }} />
              
              {/* Student info */}
              <div style={{ marginBottom: '5px' }}><b>Name:</b> {currentUser?.name}</div>
              <div style={{ marginBottom: '5px' }}><b>Father Name:</b> {currentUser?.fatherName}</div>
              <div style={{ marginBottom: '5px' }}><b>Roll No:</b> {currentUser?.rollNumber}</div>
              <div style={{ marginBottom: '5px' }}><b>Program:</b> {currentUser?.program}</div>
              <div style={{ marginBottom: '20px' }}><b>Section:</b> {currentUser?.section}</div>
              
              {/* Question counter */}
              <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Question <span>{currentQuestion + 1}</span> of {questions.length}
              </div>
              
              {/* Question text */}
              <div style={{
                fontSize: '18px',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>
                {questions[currentQuestion].question}
              </div>
              
              {/* Options */}
              {['A', 'B', 'C', 'D'].map((letter, index) => (
                <div 
                  key={letter}
                  onClick={() => handleOptionSelect(questions[currentQuestion].options[index])}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: selectedOptions[currentQuestion] === questions[currentQuestion].options[index] ? '#e6f7ff' : 'white'
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: selectedOptions[currentQuestion] === questions[currentQuestion].options[index] ? '#4CAF50' : '#ddd',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '10px',
                    color: selectedOptions[currentQuestion] === questions[currentQuestion].options[index] ? 'white' : 'black'
                  }}>
                    <span>{letter}</span>
                  </div>
                  <span>{questions[currentQuestion].options[index]}</span>
                </div>
              ))}
              
              {/* Progress bar */}
              <div style={{
                height: '10px',
                backgroundColor: '#f0f0f0',
                borderRadius: '5px',
                margin: '20px 0'
              }}>
                <div 
                  style={{
                    height: '100%',
                    width: `${updateProgressBar()}%`,
                    backgroundColor: '#4CAF50',
                    borderRadius: '5px',
                    transition: 'width 0.3s'
                  }}
                />
              </div>
              
              {/* Navigation buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <button 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: currentQuestion === 0 ? '#ccc' : '#f0f0f0',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  PREVIOUS QUESTION
                </button>
                <button 
                  onClick={handleNext}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {currentQuestion === questions.length - 1 ? 'SUBMIT QUIZ' : 'NEXT QUESTION'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}