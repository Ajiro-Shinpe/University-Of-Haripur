import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Dashboard({ exams }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [examResults, setExamResults] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    // Get exam results from localStorage
    const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    const userResults = savedResults.filter(result => 
      result.user?.rollNumber === user.rollNumber
    );
    setExamResults(userResults);
  }, [navigate]);

  const handleTakeExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  const getExamResult = (examId) => {
    return examResults.find(result => result.examId === examId.toString());
  };

  return (
    <Container fluid className="py-4 min-vh-100">
      <div className="bg-white rounded shadow-sm p-4">
        <h1 className="h3 mb-3 text-dark">Online Tests/Quizzes/Examinations</h1>
        <h2 className="h5 mb-4 text-secondary">List of Available/Conducted Tests/Quizzes/Examinations</h2>

        <div className="table-responsive">
          <Table className="table-hover">
            <thead className="bg-primary text-white">
              <tr className="bg-primary text-white">
                <th>Sr. No</th>
                <th>Course Name</th>
                <th>Teacher Name</th>
                <th>Test Title</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => {
                const examResult = getExamResult(exam.sr);
                const isExamTaken = examResult !== undefined;
                const isExamAvailable = exam.available && !isExamTaken;

                return (
                  <tr key={exam.sr} className={exam.sr % 2 === 0 ? 'bg-white' : 'bg-light'}>
                    <td>{exam.sr}</td>
                    <td>{exam.courseName}</td>
                    <td>{exam.teacherName}</td>
                    <td>{exam.testTitle}</td>
                    <td>{exam.startTime}</td>
                    <td>{exam.endTime}</td>
                    <td>
                      {!exam.available ? (
                        <span className="text-secondary">Test Not Available</span>
                      ) : isExamTaken ? (
                        <div className="d-flex flex-column">
                          <span className="text-secondary mb-1">
                            Marks Obtained: {examResult.score}/{examResult.totalQuestions}
                          </span>
                          <span className="text-secondary">
                            Percentage: {examResult.percentage}%
                          </span>
                        </div>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleTakeExam(exam.sr)}
                          className="px-3"
                        >
                          Take Exam
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div className="text-center text-secondary mt-4 pt-3 border-top">
          Copyright © {new Date().getFullYear()} The University of Haripur. All rights reserved.
        </div>
      </div>
    </Container>
  );
}

export default Dashboard; 