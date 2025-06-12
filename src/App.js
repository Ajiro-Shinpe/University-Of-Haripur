import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Results from './components/Results';
import Exam from './components/Exam';
import Dashboard from './components/Dashboard';
import QuantitativeReasoning from './components/QuantitativeReasoning';
import IdeologyAndConstitution from './components/IdeologyAndConstitution';
import ExpositoryWriting from './components/ExpositoryWriting';
import Entrepreneurship from './components/Entrepreneurship';
import ICT from './components/ICT';
import FundamentalsOfMicrobiology from './components/FundamentalsOfMicrobiology';
import CivicsAndCommunity from './components/CivicsAndCommunity';
import { questions } from './data/questions';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('currentUser') !== null);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('currentUser') !== null);
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth', handleStorageChange);
    };
  }, []);

  const exams = [
    {
      sr: 1,
      courseName: 'Quantitative Reasoning-II',
      teacherName: 'Muhammad Hasaan Saram',
      testTitle: 'Mid Term Examination',
      startTime: '28 Apr 2025 11:40 AM',
      endTime: '---',
      action: 'Marks Obtained: 0/25',
      available: true,
    },
    {
      sr: 2,
      courseName: 'Ideology and Constitution of Pakistan',
      teacherName: 'Abdul Waheed',
      testTitle: 'Mid Term Examination',
      startTime: '24 Apr 2025 11:40 AM',
      endTime: '---',
      action: 'Marks Obtained: 7/25',
      available: true,
    },
    {
      sr: 3,
      courseName: 'Expository Writing',
      teacherName: 'Sadeed Ahmad Khan',
      testTitle: 'Mid Term Examination',
      startTime: '25 Apr 2025 11:41 AM',
      endTime: '---',
      action: 'Marks Obtained: 0/25',
      available: true,
    },
    {
      sr: 4,
      courseName: 'Entrepreneurship',
      teacherName: 'Imran Qadir',
      testTitle: 'Mid Term Examination',
      startTime: '22 Apr 2025 01:25 PM',
      endTime: '---',
      action: 'Marks Obtained: 13/25',
      available: true,
    },
    {
      sr: 5,
      courseName: 'Application of Information and Communication Technologies',
      teacherName: 'Ramla Sheikh',
      testTitle: 'Mid Term Examination',
      startTime: '21 Apr 2025 11:40 AM',
      endTime: '---',
      action: 'Marks Obtained: 43/50',
      available: true,
    },
    {
      sr: 6,
      courseName: 'Civics and Community Engagement',
      teacherName: 'Ezza Rahim',
      testTitle: 'Mid Term Examination',
      startTime: '23 Apr 2025 11:30 AM',
      endTime: '---',
      action: 'Test Not Available',
      available: true,
    },
    {
      sr: 7,
      courseName: 'Fundamentals of Microbiology II',
      teacherName: 'Rafiq Ahmad',
      testTitle: 'Mid Term Examination',
      startTime: '29 Apr 2025 10:15 AM',
      endTime: '---',
      action: 'Test Not Available',
      available: true,
    },
  ];

  const handleSubmit = (examResult) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        academicResults: [...(currentUser.academicResults || []), examResult]
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update students data in localStorage
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const updatedStudents = students.map(s =>
        s.rollNumber === currentUser.rollNumber ? updatedUser : s
      );
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      // Trigger auth event to update state
      window.dispatchEvent(new Event('auth'));
    }
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <Home user={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/results" element={isAuthenticated ? <Results user={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/exams" element={isAuthenticated ? <Dashboard exams={exams} /> : <Navigate to="/login" />} />
            <Route
              path="/exam"
              element={isAuthenticated ? <Exam user={currentUser} questions={questions} exams={exams} /> : <Navigate to="/login" />}
            />
            <Route
              path="/exam/1"
              element={
                isAuthenticated ? (
                  <QuantitativeReasoning
                    exam={exams.find((e) => e.sr === 1)}
                    questions={questions.quantitativeReasoning}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/exam/2"
              element={
                isAuthenticated ? (
                  <IdeologyAndConstitution
                    exam={exams.find((e) => e.sr === 2)}
                    questions={questions.ideologyAndConstitution}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/exam/3"
              element={
                isAuthenticated ? (
                  <ExpositoryWriting
                    exam={exams.find((e) => e.sr === 3)}
                    questions={questions.expositoryWriting}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/exam/4"
              element={
                isAuthenticated ? (
                  <Entrepreneurship
                    exam={exams.find((e) => e.sr === 4)}
                    questions={questions.entrepreneurship}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/exam/5"
              element={
                isAuthenticated ? (
                  <ICT 
                    exam={exams.find((e) => e.sr === 5)} 
                    questions={questions.ict} 
                    onSubmit={handleSubmit} 
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/exam/6"
              element={
                isAuthenticated ? (
                  <CivicsAndCommunity
                    exam={exams.find((e) => e.sr === 6)}
                    questions={questions.civicsAndCommunity}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/exam/7"
              element={
                isAuthenticated ? (
                  <FundamentalsOfMicrobiology
                    exam={exams.find((e) => e.sr === 7)}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;