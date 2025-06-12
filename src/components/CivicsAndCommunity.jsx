import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { calculateScore, calculatePercentage, saveExamResult } from '../utils/examUtils';

export default function CivicsAndCommunity() {
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
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [error, setError] = useState(null);

  const questions = [
    {
      question: "What is a mutation in bacteria?",
      options: ["A temporary change in cell structure", "A permanent change in the DNA sequence", "A change in cell wall composition", "A reversible alteration in protein synthesis"],
      correctAnswer: "A permanent change in the DNA sequence"
    },
    {
      question: "Which type of mutation involves a single base change in DNA?",
      options: ["Frameshift mutation", "Point mutation", "Insertion mutation", "Deletion mutation"],
      correctAnswer: "Point mutation"
    },
    {
      question: "What is the primary source of genetic variation in bacteria?",
      options: ["Cell division", "Mutations", "Protein synthesis", "Cell wall synthesis"],
      correctAnswer: "Mutations"
    },
    {
      question: "Which process involves the uptake of naked DNA by bacteria?",
      options: ["Transduction", "Conjugation", "Transformation", "Replication"],
      correctAnswer: "Transformation"
    },
    {
      question: "What is the role of the sex pilus in bacterial conjugation?",
      options: ["DNA replication", "Attachment to recipient cell", "DNA packaging", "Phage infection"],
      correctAnswer: "Attachment to recipient cell"
    },
    {
      question: "Which type of transduction transfers any gene from the donor bacterium?",
      options: ["Specialized transduction", "Generalized transduction", "Restricted transduction", "Selective transduction"],
      correctAnswer: "Generalized transduction"
    },
    {
      question: "What is a common cause of spontaneous mutations in bacteria?",
      options: ["UV light exposure", "Chemical mutagens", "DNA replication errors", "Bacteriophage infection"],
      correctAnswer: "DNA replication errors"
    },
    {
      question: "Which mechanism of horizontal gene transfer involves bacteriophages?",
      options: ["Transformation", "Transduction", "Conjugation", "Mutation"],
      correctAnswer: "Transduction"
    },
    {
      question: "What is the significance of bacterial mutation and variation?",
      options: ["Reduces genetic diversity", "Leads to antibiotic resistance", "Prevents evolution", "Inhibits gene transfer"],
      correctAnswer: "Leads to antibiotic resistance"
    },
    {
      question: "Which bacterial structure is primarily targeted by β-lactam antibiotics?",
      options: ["Cell membrane", "Cell wall", "Ribosomes", "DNA"],
      correctAnswer: "Cell wall"
    },
    {
      question: "What is the main function of normal flora in the human body?",
      options: ["Cause infections", "Provide nutrients", "Antagonize pathogens", "Degrade toxins"],
      correctAnswer: "Antagonize pathogens"
    },
    {
      question: "Which antibiotic resistance mechanism involves enzymes like β-lactamases?",
      options: ["Altered target site", "Enzyme degradation", "Efflux pumps", "Reduced permeability"],
      correctAnswer: "Enzyme degradation"
    },
    {
      question: "What does the Kirby-Bauer test measure?",
      options: ["Bacterial growth rate", "Antibiotic susceptibility", "DNA replication", "Protein synthesis"],
      correctAnswer: "Antibiotic susceptibility"
    },
    {
      question: "Which type of bacteria lack a cell wall target for antibiotics?",
      options: ["Gram-positive", "Gram-negative", "Mycoplasma", "Actinomycetes"],
      correctAnswer: "Mycoplasma"
    },
    {
      question: "What is the primary source of natural antibiotics?",
      options: ["Fungal molds", "Synthetic chemicals", "Viral particles", "Plant extracts"],
      correctAnswer: "Fungal molds"
    },
    {
      question: "Which bacterial virulence factor facilitates adhesion to host cells?",
      options: ["Endotoxin", "Adhesin", "Exotoxin", "Capsule"],
      correctAnswer: "Adhesin"
    },
    {
      question: "What enzyme do some bacteria produce to degrade connective tissue matrix?",
      options: ["Hyaluronidase", "Collagenase", "Streptokinase", "Coagulase"],
      correctAnswer: "Hyaluronidase"
    },
    {
      question: "Which bacterial structure helps resist phagocytosis?",
      options: ["Flagella", "Polysaccharide capsule", "Pili", "Cell wall"],
      correctAnswer: "Polysaccharide capsule"
    },
    {
      question: "What is the main difference between exotoxins and endotoxins?",
      options: ["Exotoxins are proteins; endotoxins are LPS", "Exotoxins are heat-resistant; endotoxins are not", "Exotoxins are from Gram-negative bacteria only", "Endotoxins are secreted by living cells"],
      correctAnswer: "Exotoxins are proteins; endotoxins are LPS"
    },
    {
      question: "Which cytokine is primarily responsible for fever during infection?",
      options: ["IL-10", "IL-6", "IL-1", "IFN"],
      correctAnswer: "IL-1"
    },
    {
      question: "What is the role of Protein A in Staphylococcus aureus?",
      options: ["Promotes phagocytosis", "Blocks opsonization", "Degrades antibiotics", "Enhances adhesion"],
      correctAnswer: "Blocks opsonization"
    },
    {
      question: "Which bacterial infection is characterized by a thick gray throat coating?",
      options: ["Tetanus", "Diphtheria", "Cholera", "Syphilis"],
      correctAnswer: "Diphtheria"
    },
    {
      question: "What is the primary route of transmission for Mycobacterium tuberculosis?",
      options: ["Gastrointestinal tract", "Respiratory tract", "Genitourinary tract", "Skin contact"],
      correctAnswer: "Respiratory tract"
    },
    {
      question: "Which bacteria is associated with hospital-acquired infections?",
      options: ["Pseudomonas aeruginosa", "Vibrio cholerae", "Clostridium botulinum", "Helicobacter pylori"],
      correctAnswer: "Pseudomonas aeruginosa"
    },
    {
      question: "What is the term for bacteria in the bloodstream without propagation?",
      options: ["Septicemia", "Bacteremia", "Toxemia", "Pyemia"],
      correctAnswer: "Bacteremia"
    },
    {
      question: "Which factor determines the virulence of a bacterial pathogen?",
      options: ["Cell size", "Invasiveness", "Growth rate", "Color"],
      correctAnswer: "Invasiveness"
    },
    {
      question: "What is the LD50 of a pathogen?",
      options: ["Dose causing infection in 50% of hosts", "Dose killing 50% of hosts", "Dose causing mutation", "Dose preventing infection"],
      correctAnswer: "Dose killing 50% of hosts"
    },
    {
      question: "Which bacteria causes botulism?",
      options: ["Clostridium botulinum", "Salmonella typhi", "Shigella spp.", "Vibrio cholerae"],
      correctAnswer: "Clostridium botulinum"
    },
    {
      question: "What is the role of normal flora in immunoenhancement?",
      options: ["Degrade antibodies", "Promote lymphatic tissue development", "Inhibit immune response", "Produce cytokines"],
      correctAnswer: "Promote lymphatic tissue development"
    },
    {
      question: "Which condition promotes opportunistic infections?",
      options: ["High immunity", "Dysbacteriosis", "Normal flora absence", "Antibiotic resistance"],
      correctAnswer: "Dysbacteriosis"
    },
    {
      question: "What is a nosocomial infection?",
      options: ["Infection from food", "Hospital-acquired infection", "Viral infection", "Chronic infection"],
      correctAnswer: "Hospital-acquired infection"
    },
    {
      question: "Which bacteria is known for producing Shiga toxin via horizontal gene transfer?",
      options: ["E. coli", "MRSA", "Salmonella", "Streptococcus"],
      correctAnswer: "E. coli"
    },
    {
      question: "What is the primary component of endotoxin?",
      options: ["Protein", "Lipopolysaccharide (LPS)", "Polysaccharide capsule", "Peptidoglycan"],
      correctAnswer: "Lipopolysaccharide (LPS)"
    },
    {
      question: "Which exotoxin type targets nerve cells?",
      options: ["Enterotoxin", "Neurotoxin", "Cytotoxin", "Hemotoxin"],
      correctAnswer: "Neurotoxin"
    },
    {
      question: "What is the function of streptokinase in bacterial infections?",
      options: ["Degrades fibrin", "Promotes adhesion", "Inhibits phagocytosis", "Produces toxins"],
      correctAnswer: "Degrades fibrin"
    },
    {
      question: "Which bacteria is associated with tertiary syphilis?",
      options: ["Neisseria gonorrhoeae", "Treponema pallidum", "Chlamydia trachomatis", "Escherichia coli"],
      correctAnswer: "Treponema pallidum"
    },
    {
      question: "What is the main clinical effect of endotoxin (LPS)?",
      options: ["Neurotoxicity", "Inflammation", "Hemolysis", "Immune suppression"],
      correctAnswer: "Inflammation"
    },
    {
      question: "Which bacterial structure is used for conjugation?",
      options: ["Flagella", "Sex pilus", "Capsule", "Cell wall"],
      correctAnswer: "Sex pilus"
    },
    {
      question: "What is the primary site of Shigella infection?",
      options: ["Respiratory tract", "Gastrointestinal tract", "Skin", "Bloodstream"],
      correctAnswer: "Gastrointestinal tract"
    },
    {
      question: "Which factor contributes to bacterial invasiveness?",
      options: ["Hyaluronidase", "Endotoxin", "Ribosomes", "Pili"],
      correctAnswer: "Hyaluronidase"
    },
    {
      question: "What is the role of adhesins in bacterial pathogenesis?",
      options: ["Toxin production", "Host cell attachment", "DNA replication", "Phagocytosis resistance"],
      correctAnswer: "Host cell attachment"
    },
    {
      question: "Which bacteria is known for producing a biofilm?",
      options: ["Pseudomonas aeruginosa", "Vibrio cholerae", "Clostridium tetani", "Salmonella typhi"],
      correctAnswer: "Pseudomonas aeruginosa"
    },
    {
      question: "What is the main source of exotoxins?",
      options: ["Gram-negative bacteria only", "Gram-positive and some Gram-negative bacteria", "Viruses", "Fungi"],
      correctAnswer: "Gram-positive and some Gram-negative bacteria"
    },
    {
      question: "Which process describes bacteria entering host cells?",
      options: ["Adhesion", "Invasion", "Propagation", "Toxin release"],
      correctAnswer: "Invasion"
    },
    {
      question: "What is the primary role of cytokines in bacterial infections?",
      options: ["Degrade toxins", "Regulate immune response", "Promote bacterial growth", "Inhibit adhesion"],
      correctAnswer: "Regulate immune response"
    },
    {
      question: "Which bacteria is associated with neonatal tetanus?",
      options: ["Clostridium tetani", "Corynebacterium diphtheriae", "Shigella spp.", "Yersinia pestis"],
      correctAnswer: "Clostridium tetani"
    },
    {
      question: "What is the main route of transmission for cholera?",
      options: ["Respiratory droplets", "Contaminated food/water", "Insect bites", "Blood transfusion"],
      correctAnswer: "Contaminated food/water"
    },
    {
      question: "Which bacterial infection is characterized by pyogenic foci?",
      options: ["Bacteremia", "Septicemia", "Pyemia", "Toxemia"],
      correctAnswer: "Pyemia"
    },
    {
      question: "What is the primary function of coagulase in bacterial pathogenesis?",
      options: ["Degrade connective tissue", "Form fibrin clots", "Promote phagocytosis", "Inhibit adhesion"],
      correctAnswer: "Form fibrin clots"
    },
    {
      question: "Which bacteria is commonly associated with peptic ulcers?",
      options: ["Helicobacter pylori", "Salmonella typhi", "Vibrio cholerae", "Shigella spp."],
      correctAnswer: "Helicobacter pylori"
    }
  ];

  // Add this function before the useEffect hooks
  const verifyAndFormatUserData = (user) => {
    if (!user) return null;
    
    // Ensure all required fields are present and properly formatted
    const formattedUser = {
      rollNumber: user.rollNumber?.toString() || 'N/A',
      fullName: user.fullName?.toString() || 'N/A',
      fatherName: user.fatherName?.toString() || 'N/A',
      programName: user.programName?.toString() || 'N/A',
      section: user.section?.toString() || 'N/A',
      universityId: user.universityId?.toString() || 'N/A',
      department: user.department?.toString() || 'N/A',
      batch: user.batch?.toString() || 'N/A',
      currentSemester: user.currentSemester?.toString() || 'N/A'
    };

    // Log the formatted user data for debugging
    console.log('Formatted user data:', formattedUser);
    
    return formattedUser;
  };

  // All useEffect hooks together
  useEffect(() => {
    try {
      const userData = localStorage.getItem('currentUser');
      if (!userData) {
        console.error('No user data found in localStorage');
        navigate('/login');
        return;
      }

      const user = JSON.parse(userData);
      console.log('Raw user data from localStorage:', user);
      
      const formattedUser = verifyAndFormatUserData(user);
      if (!formattedUser) {
        console.error('Failed to format user data');
        navigate('/login');
        return;
      }

      // Check if exam has already been taken
      const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
      const examResult = savedResults.find(result => 
        result.examId === '6' && result.user?.rollNumber === formattedUser.rollNumber
      );

      if (examResult) {
        navigate('/results', {
          state: {
            result: examResult,
            currentUser: formattedUser
          }
        });
        return;
      }

      setCurrentUser(formattedUser);
      setIsLoading(false);
      setSelectedOptions(new Array(questions.length).fill(null));
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/login');
    }
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
      examId: '6', // Fixed exam ID for Civics and Community
      examTitle: 'Civics and Community Engagement',
      courseName: 'Civics and Community Engagement',
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
      !(r.examId === '6' && r.user?.rollNumber === currentUser.rollNumber)
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
          }}><b>Course:</b>&nbsp; Civics and Community</div>
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
              transition: 'width.3s ease'
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
      </div>
    </div>
  );
}
