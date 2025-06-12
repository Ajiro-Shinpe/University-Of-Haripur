import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FundamentalsOfMicrobiology() {
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
      question: "What is the primary function of a cell membrane in microorganisms?",
      options: [
        "Energy production",
        "Selective permeability",
        "Protein synthesis",
        "DNA replication"
      ],
      correctAnswer: "Selective permeability"
    },
    {
      question: "Which of the following is NOT a type of microorganism?",
      options: [
        "Bacteria",
        "Viruses",
        "Plants",
        "Fungi"
      ],
      correctAnswer: "Plants"
    },
    {
      question: "What is the main difference between prokaryotic and eukaryotic cells?",
      options: [
        "Presence of nucleus",
        "Cell size",
        "Metabolic rate",
        "Reproduction method"
      ],
      correctAnswer: "Presence of nucleus"
    },
    {
      question: "Which staining technique is used to identify Gram-positive and Gram-negative bacteria?",
      options: [
        "Acid-fast staining",
        "Gram staining",
        "Simple staining",
        "Negative staining"
      ],
      correctAnswer: "Gram staining"
    },
    {
      question: "What is the role of plasmids in bacteria?",
      options: [
        "Energy production",
        "Extra-chromosomal DNA",
        "Cell wall synthesis",
        "Protein synthesis"
      ],
      correctAnswer: "Extra-chromosomal DNA"
    },
    {
      question: "Which of the following is a characteristic of viruses?",
      options: [
        "Cellular structure",
        "Independent metabolism",
        "Obligate intracellular parasites",
        "Binary fission"
      ],
      correctAnswer: "Obligate intracellular parasites"
    },
    {
      question: "What is the function of endospores in bacteria?",
      options: [
        "Reproduction",
        "Energy storage",
        "Survival in harsh conditions",
        "Protein synthesis"
      ],
      correctAnswer: "Survival in harsh conditions"
    },
    {
      question: "Which of the following is NOT a method of bacterial reproduction?",
      options: [
        "Binary fission",
        "Budding",
        "Meiosis",
        "Conjugation"
      ],
      correctAnswer: "Meiosis"
    },
    {
      question: "What is the primary function of ribosomes in microorganisms?",
      options: [
        "Energy production",
        "Protein synthesis",
        "DNA replication",
        "Cell wall formation"
      ],
      correctAnswer: "Protein synthesis"
    },
    {
      question: "Which of the following is a characteristic of fungi?",
      options: [
        "Chlorophyll presence",
        "Chitin cell walls",
        "Binary fission",
        "Photosynthesis"
      ],
      correctAnswer: "Chitin cell walls"
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
      result.examId === '7' && 
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
      examId: '7', // Fixed exam ID
      examTitle: 'Fundamentals of Microbiology II',
      courseName: 'Fundamentals of Microbiology II',
      date: formattedDate,
      score,
      totalQuestions: questions.length,
      percentage: ((score / questions.length) * 100).toFixed(2),
      answers,
      timestamp: now.toISOString(),
      user: {
        fullName: currentUser.studentName,
        fatherName: currentUser.fatherName,
        rollNumber: currentUser.studentRollNumber,
        programName: currentUser.program,
        section: currentUser.section,
        department: currentUser.department,
        currentSemester: currentUser.semester,
        batch: currentUser.batch,
        academicSession: currentUser.academicSession
      }
    };

    // Save to localStorage
    const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    // Remove any existing result for this exam and user
    const filteredResults = savedResults.filter(r => 
      !(r.examId === '7' && r.user?.rollNumber === currentUser.studentRollNumber)
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
      bottom: 0,
      backgroundColor: '#ffffff'
    }}>
      <div className="quiz-container" style={{
        display: 'block',
        backgroundColor: '#ffffff',
        height: 'auto',
        fontFamily: '"Jost", sans-serif',
        fontSize: '15px',
        fontWeight: 400
      }}>
        {quizStarted && (
          <>
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
          }}><b>Name:</b> {currentUser?.studentName}</div>
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
          }}><b>Father Name:</b> {currentUser?.fatherName}</div>
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
          }}><b>Roll No:</b> {currentUser?.studentRollNumber}</div>
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
              }}><b>Program:</b> {currentUser?.program}</div>
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
          }}><b>Section:</b> {currentUser?.section}</div>
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
              }}><b>Course:</b> Fundamentals of Microbiology II</div>
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
          </>
        )}
      </div>
    </div>
  );
}