import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { calculateScore, calculatePercentage, saveExamResult } from '../utils/examUtils';

export default function ICT() {
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
      question: "What is the definition of data in the context of data communication?",
      options: ["Processed information", "Raw or unorganized information", "Stored digital files", "Encrypted messages"],
      correctAnswer: "Raw or unorganized information"
    },
    {
      question: "Which component of data communication converts digital signals into a transmittable form?",
      options: ["Sender", "Receiver", "Encoder", "Decoder"],
      correctAnswer: "Encoder"
    },
    {
      question: "What is the role of the communication medium in data communication?",
      options: ["Encrypts data", "Stores data", "Connects sender and receiver", "Decodes signals"],
      correctAnswer: "Connects sender and receiver"
    },
    {
      question: "Which of the following is an example of wired communication media?",
      options: ["Wi-Fi", "Satellite", "Fiber optic cable", "Bluetooth"],
      correctAnswer: "Fiber optic cable"
    },
    {
      question: "What is the transmission speed of coaxial cable?",
      options: ["1 Mbps", "1 Gbps", "10 Gbps", "100 Mbps"],
      correctAnswer: "1 Gbps"
    },
    {
      question: "What is the primary application of twisted pair cable?",
      options: ["Satellite communication", "Telephone systems", "Radio transmission", "Optical networking"],
      correctAnswer: "Telephone systems"
    },
    {
      question: "Which technology uses glass threads to transmit data?",
      options: ["Coaxial cable", "Twisted pair cable", "Fiber optic cable", "Satellite"],
      correctAnswer: "Fiber optic cable"
    },
    {
      question: "What is the typical frequency range for Wi-Fi communication?",
      options: ["2.4 GHz and 5 GHz", "1 MHz and 10 MHz", "100 GHz", "500 MHz"],
      correctAnswer: "2.4 GHz and 5 GHz"
    },
    {
      question: "How many devices can Bluetooth typically connect to simultaneously?",
      options: ["One", "Three", "Seven", "Ten"],
      correctAnswer: "Seven"
    },
    {
      question: "What is a key social impact of sports on society?",
      options: ["Reducing literacy", "Promoting gender equality", "Increasing pollution", "Limiting community interaction"],
      correctAnswer: "Promoting gender equality"
    },
    {
      question: "How do sports contribute to mental health?",
      options: ["Increase stress", "Reduce self-esteem", "Boost self-esteem", "Limit social interaction"],
      correctAnswer: "Boost self-esteem"
    },
    {
      question: "Which storage device uses flash memory for faster data access?",
      options: ["HDD", "SSD", "Magnetic tape", "CD"],
      correctAnswer: "SSD"
    },
    {
      question: "What is the primary function of RAM in a computer?",
      options: ["Permanent storage", "Temporary data storage", "Data encryption", "Network connectivity"],
      correctAnswer: "Temporary data storage"
    },
    {
      question: "Which storage type involves remote servers accessed over the internet?",
      options: ["Primary storage", "Secondary storage", "Cloud storage", "Cache memory"],
      correctAnswer: "Cloud storage"
    },
    {
      question: "What is a key feature of data storage for businesses?",
      options: ["Reducing data security", "Enabling data analysis", "Limiting data access", "Increasing data loss"],
      correctAnswer: "Enabling data analysis"
    },
    {
      question: "What is the smallest living unit of an organism?",
      options: ["Organelle", "Cell", "Tissue", "Molecule"],
      correctAnswer: "Cell"
    },
    {
      question: "Which component of a cell separates the interior from the external environment?",
      options: ["Cytoplasm", "Nucleus", "Cell membrane", "DNA"],
      correctAnswer: "Cell membrane"
    },
    {
      question: "Which type of cell lacks membrane-enclosed organelles?",
      options: ["Eukaryotic", "Prokaryotic", "Plant cell", "Animal cell"],
      correctAnswer: "Prokaryotic"
    },
    {
      question: "What is the function of the nucleolus in a cell?",
      options: ["Protein synthesis", "Ribosome production", "DNA replication", "Energy production"],
      correctAnswer: "Ribosome production"
    },
    {
      question: "Which organelle is responsible for transporting materials within a cell?",
      options: ["Nucleus", "Mitochondria", "Endoplasmic reticulum", "Golgi apparatus"],
      correctAnswer: "Endoplasmic reticulum"
    },
    {
      question: "What distinguishes rough ER from smooth ER?",
      options: ["Presence of ribosomes", "Lack of DNA", "Smaller size", "Smooth texture"],
      correctAnswer: "Presence of ribosomes"
    },
    {
      question: "What is ATP commonly referred to as in cells?",
      options: ["Energy currency", "Structural molecule", "Genetic material", "Enzyme catalyst"],
      correctAnswer: "Energy currency"
    },
    {
      question: "Which cellular process is powered by ATP?",
      options: ["DNA replication", "Muscle contraction", "Cell division", "RNA transcription"],
      correctAnswer: "Muscle contraction"
    },
    {
      question: "What happens when ATP is broken down into ADP?",
      options: ["Energy is stored", "Energy is released", "DNA is synthesized", "Proteins are degraded"],
      correctAnswer: "Energy is released"
    },
    {
      question: "Why is ATP essential for living cells?",
      options: ["Provides structural support", "Acts as genetic material", "Serves as an energy source", "Inhibits cellular processes"],
      correctAnswer: "Serves as an energy source"
    },
    {
      question: "What is the primary goal of food preservation?",
      options: ["Reduce nutritional value", "Prevent microbial spoilage", "Decrease shelf life", "Alter food taste"],
      correctAnswer: "Prevent microbial spoilage"
    },
    {
      question: "Which food preservation technique involves drying, handling, and storage?",
      options: ["Thermal processing", "Postharvest handling", "Sanitization", "Canning"],
      correctAnswer: "Postharvest handling"
    },
    {
      question: "Who is considered the father of canning?",
      options: ["Louis Pasteur", "Nicolas Appert", "John Snow", "Robert Koch"],
      correctAnswer: "Nicolas Appert"
    },
    {
      question: "Which type of hazard in food includes mycotoxins and pesticides?",
      options: ["Biological", "Chemical", "Physical", "Environmental"],
      correctAnswer: "Chemical"
    },
    {
      question: "What is the purpose of blanching in food preservation?",
      options: ["Enhance flavor", "Inactivate enzymes", "Increase microbial growth", "Reduce nutritional value"],
      correctAnswer: "Inactivate enzymes"
    },
    {
      question: "Which temperature is typically used for pasteurization?",
      options: ["0°C to 10°C", "65°C to 95°C", "100°C to 120°C", "150°C to 200°C"],
      correctAnswer: "65°C to 95°C"
    },
    {
      question: "What is autolysis in the context of food preservation?",
      options: ["Microbial growth", "Enzyme-driven cell degradation", "Chemical contamination", "Physical damage"],
      correctAnswer: "Enzyme-driven cell degradation"
    },
    {
      question: "Which acid is commonly used to reduce pH in food preservation?",
      options: ["Citric acid", "Lactic acid", "Sulfuric acid", "Hydrochloric acid"],
      correctAnswer: "Lactic acid"
    },
    {
      question: "What is the primary purpose of sanitization in food processing?",
      options: ["Enhance flavor", "Reduce bacterial load", "Increase shelf life", "Alter texture"],
      correctAnswer: "Reduce bacterial load"
    },
    {
      question: "Which heat transfer method involves physical contact between objects?",
      options: ["Conduction", "Convection", "Radiation", "Evaporation"],
      correctAnswer: "Conduction"
    },
    {
      question: "What is a biomolecule?",
      options: ["A synthetic molecule", "A molecule essential for life", "A non-organic compound", "A microbial toxin"],
      correctAnswer: "A molecule essential for life"
    },
    {
      question: "Which biomolecule provides energy in the form of sugars and starches?",
      options: ["Proteins", "Lipids", "Carbohydrates", "Nucleic acids"],
      correctAnswer: "Carbohydrates"
    },
    {
      question: "What is the general formula for carbohydrates?",
      options: ["CnH2nOn", "CnHnOn", "CnH2nO2n", "CnH3nOn"],
      correctAnswer: "CnH2nOn"
    },
    {
      question: "Which biomolecule is composed of amino acids linked by peptide bonds?",
      options: ["Carbohydrates", "Proteins", "Lipids", "Nucleic acids"],
      correctAnswer: "Proteins"
    },
    {
      question: "Which biomolecule is hydrophobic and includes fats and oils?",
      options: ["Carbohydrates", "Proteins", "Lipids", "Nucleic acids"],
      correctAnswer: "Lipids"
    },
    {
      question: "What is the primary function of DNA in cells?",
      options: ["Protein synthesis", "Energy storage", "Genetic information storage", "Cell membrane support"],
      correctAnswer: "Genetic information storage"
    },
    {
      question: "Which biomolecule is involved in protein synthesis in some viruses?",
      options: ["DNA", "RNA", "Lipids", "Carbohydrates"],
      correctAnswer: "RNA"
    },
    {
      question: "What is an example of a protein biomolecule?",
      options: ["Glucose", "Cholesterol", "Hemoglobin", "Cellulose"],
      correctAnswer: "Hemoglobin"
    },
    {
      question: "Which element is commonly found in proteins but not in carbohydrates?",
      options: ["Carbon", "Hydrogen", "Nitrogen", "Oxygen"],
      correctAnswer: "Nitrogen"
    },
    {
      question: "What is the building block of nucleic acids?",
      options: ["Amino acids", "Nucleotides", "Fatty acids", "Monosaccharides"],
      correctAnswer: "Nucleotides"
    },
    {
      question: "Which storage device is used for archiving large amounts of data?",
      options: ["RAM", "SSD", "Magnetic tape", "HDD"],
      correctAnswer: "Magnetic tape"
    },
    {
      question: "What is the primary advantage of SSDs over HDDs?",
      options: ["Lower cost", "Larger capacity", "Faster speeds", "Magnetic storage"],
      correctAnswer: "Faster speeds"
    },
    {
      question: "Which food preservation method uses high temperatures to inactivate spores?",
      options: ["Freezing", "Thermal processing", "Drying", "Salting"],
      correctAnswer: "Thermal processing"
    },
    {
      question: "What is the primary role of RNA in cells?",
      options: ["Energy storage", "Protein synthesis", "Structural support", "DNA replication"],
      correctAnswer: "Protein synthesis"
    },
    {
      question: "Which type of biomolecule includes cholesterol and phospholipids?",
      options: ["Carbohydrates", "Proteins", "Lipids", "Nucleic acids"],
      correctAnswer: "Lipids"
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
        result.examId === '5' && result.user?.rollNumber === formattedUser.rollNumber
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

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

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
      examId: '5', // Fixed exam ID for ICT
      examTitle: 'Application of Information and Communication Technologies',
      courseName: 'Application of Information and Communication Technologies',
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
      !(r.examId === '5' && r.user?.rollNumber === currentUser.rollNumber)
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
              }}><b>Section:</b>&nbsp; {currentUser?.section}</div>
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
              }}><b>Course:</b> &nbsp; Information and Communication Technology</div>
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
