import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    // Get results from localStorage
    const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    const userResults = savedResults
      .filter(result => {
      const resultRollNumber = result.user?.rollNumber || result.user?.studentRollNumber;
      const userRollNumber = user.rollNumber || user.studentRollNumber;
      return resultRollNumber === userRollNumber;
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setResults(userResults);

    // If result is passed through location state, set it as selected
    if (location.state?.result) {
      setSelectedResult(location.state.result);
    }
  }, [navigate, location.state]);

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#28a745'; // Green for excellent
    if (percentage >= 60) return '#17a2b8'; // Blue for good
    if (percentage >= 40) return '#ffc107'; // Yellow for average
    return '#dc3545'; // Red for poor
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Jost", sans-serif',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '1px solid #eee'
      }}>
        <h1 style={{
          fontSize: '24px',
          color: '#333',
            margin: 0
          }}>Exam Results</h1>
          <div style={{
            fontSize: '16px',
            color: '#666'
          }}>
            Welcome, {currentUser?.fullName} (Roll Number: {currentUser?.rollNumber})
          </div>
        </div>

        <div style={{
          overflowX: 'auto',
          marginBottom: '20px'
        }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px'
            }}>
              <thead>
                <tr style={{
                  background: "linear-gradient(40deg, #2E265D, #2B6751)",
                  color: 'white'
                }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '15px',
                  borderBottom: '2px solid #ddd'
                }}>Course Name</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '15px',
                  borderBottom: '2px solid #ddd'
                }}>Test Title</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '15px',
                  borderBottom: '2px solid #ddd'
                }}>Date</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '15px',
                  borderBottom: '2px solid #ddd'
                }}>Marks Obtained</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '15px',
                  borderBottom: '2px solid #ddd'
                }}>Total Marks</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '15px',
                  borderBottom: '2px solid #ddd'
                }}>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                <tr 
                  key={index} 
                  onClick={() => handleResultClick(result)}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    ':hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <td style={{
                    fontSize: '14px',
                    padding: '12px',
                    borderBottom: '1px solid #ddd'
                  }}>{result.courseName}</td>
                  <td style={{
                    fontSize: '14px',
                    padding: '12px',
                    borderBottom: '1px solid #ddd'
                  }}>{result.examTitle}</td>
                  <td style={{
                    fontSize: '14px',
                    padding: '12px',
                    borderBottom: '1px solid #ddd'
                  }}>{result.date}</td>
                  <td style={{
                    fontSize: '14px',
                    padding: '12px',
                    borderBottom: '1px solid #ddd'
                  }}>{result.score}</td>
                  <td style={{
                    fontSize: '14px',
                    padding: '12px',
                    borderBottom: '1px solid #ddd'
                  }}>{result.totalQuestions}</td>
                  <td style={{
                    fontSize: '14px',
                    padding: '12px',
                    borderBottom: '1px solid #ddd',
                    color: getScoreColor(parseFloat(result.percentage))
                  }}>{result.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        {selectedResult && (
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{
              fontSize: '20px',
              color: '#333',
              marginBottom: '15px'
            }}>Detailed Result: {selectedResult.examTitle}</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>Score</h3>
                <p style={{ fontSize: '24px', color: getScoreColor(parseFloat(selectedResult.percentage)), fontWeight: 'bold' }}>
                  {selectedResult.score}/{selectedResult.totalQuestions}
                </p>
              </div>
              
              <div style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>Percentage</h3>
                <p style={{ fontSize: '24px', color: getScoreColor(parseFloat(selectedResult.percentage)), fontWeight: 'bold' }}>
                  {selectedResult.percentage}%
                </p>
              </div>
              
              <div style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>Date</h3>
                <p style={{ fontSize: '18px', color: '#333' }}>{selectedResult.date}</p>
              </div>
            </div>

            <div style={{
              marginTop: '20px'
            }}>
              <h3 style={{
                fontSize: '18px',
                color: '#333',
                marginBottom: '15px'
              }}>Question-wise Analysis</h3>

        <div style={{
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {selectedResult.answers.map((answer, index) => (
                  <div key={index} style={{
                    padding: '15px',
                    marginBottom: '10px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                  }}>
                    <p style={{
                      fontSize: '14px',
                      color: '#333',
                      marginBottom: '10px'
                    }}><strong>Q{index + 1}:</strong> {answer.question}</p>
                    <div style={{
                      display: 'flex',
                      gap: '20px',
              fontSize: '14px'
                    }}>
                      <div>
                        <strong style={{ color: '#666' }}>Your Answer:</strong>
                        <span style={{
                          color: answer.isCorrect ? '#28a745' : '#dc3545'
                        }}> {answer.selectedAnswer}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#666' }}>Correct Answer:</strong>
                        <span style={{ color: '#28a745' }}> {answer.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}