import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AvailableExams() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    // Define available exams with correct exam IDs matching sr numbers
    const availableExams = [
      {
        sr: 1,
        courseName: "Quantitative Reasoning-II",
        teacherName: "Muhammad Hasaan Saram",
        testTitle: "Mid Term Examination",
        startTime: "28 Apr 2025 11:40 AM",
        endTime: "---",
        available: true
      },
      {
        sr: 2,
        courseName: "Ideology and Constitution of Pakistan",
        teacherName: "Abdul Waheed",
        testTitle: "Mid Term Examination",
        startTime: "24 Apr 2025 11:40 AM",
        endTime: "---",
        available: true
      },
      {
        sr: 3,
        courseName: "Expository Writing",
        teacherName: "Sadeed Ahmad Khan",
        testTitle: "Mid Term Examination",
        startTime: "25 Apr 2025 11:41 AM",
        endTime: "---",
        available: true
      },
      {
        sr: 4,
        courseName: "Entrepreneurship",
        teacherName: "Imran Qadir",
        testTitle: "Mid Term Examination",
        startTime: "22 Apr 2025 01:25 PM",
        endTime: "---",
        available: true
      },
      {
        sr: 5,
        courseName: "Application of Information and Communication Technologies",
        teacherName: "Ramla Sheikh",
        testTitle: "Mid Term Examination",
        startTime: "21 Apr 2025 11:40 AM",
        endTime: "---",
        available: true
      },
      {
        sr: 6,
        courseName: "Civics and Community Engagement",
        teacherName: "Ezza Rahim",
        testTitle: "Mid Term Examination",
        startTime: "23 Apr 2025 11:30 AM",
        endTime: "---",
        available: true
      },
      {
        sr: 7,
        courseName: "Fundamentals of Microbiology II",
        teacherName: "Rafiq Ahmad",
        testTitle: "Mid Term Examination",
        startTime: "29 Apr 2025 10:15 AM",
        endTime: "---",
        available: true
      }
    ];

    setExams(availableExams);
  }, [navigate]);

  const handleTakeExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      fontFamily: '"Jost", sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '20px'
      }}>
        <h1 style={{
          fontSize: '24px',
          color: '#333',
          marginBottom: '20px'
        }}>Online Tests/Quizzes/Examinations</h1>
        <h2 style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '20px'
        }}>List of Available/ Conducted Tests/Quizzes/Examinations</h2>

        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#00678b',
                color: 'white'
              }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd'
                }}>Sr. No</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd'
                }}>Course Name</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd'
                }}>Teacher Name</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd'
                }}>Test Title</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd'
                }}>Start Time</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd'
                }}>End Time</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd'
                }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => {
                // Get exam results from localStorage
                const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
                const examResult = savedResults.find(result => {
                  const resultRollNumber = result.user?.rollNumber || result.user?.studentRollNumber;
                  const userRollNumber = currentUser?.rollNumber || currentUser?.studentRollNumber;
                  return result.examId === exam.sr.toString() && resultRollNumber === userRollNumber;
                });

                return (
                  <tr key={exam.sr} style={{
                    backgroundColor: exam.sr % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #ddd'
                    }}>{exam.sr}</td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #ddd'
                    }}>{exam.courseName}</td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #ddd'
                    }}>{exam.teacherName}</td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #ddd'
                    }}>{exam.testTitle}</td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #ddd'
                    }}>{exam.startTime}</td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #ddd'
                    }}>{exam.endTime}</td>
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #ddd'
                    }}>
                      {!exam.available ? (
                        exam.action
                      ) : examResult ? (
                        <span style={{ color: '#666' }}>
                          Marks Obtained: {examResult.score}/{examResult.totalQuestions}
                        </span>
                      ) : (
                        <button
                        className='btn btn-sm btn-primary'
                          onClick={() => handleTakeExam(exam.sr)}
                          style={{cursor: 'pointer',background:'#007bff'}}
                        >
                          Take Exam
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 