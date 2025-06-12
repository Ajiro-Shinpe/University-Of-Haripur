import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Exam from './components/Exam';
import Results from './components/Results';
import Profile from './components/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user in localStorage on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated} 
          user={user} 
        />
        <Container fluid className="flex-grow-1">
          <Routes>
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? (
                  <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? (
                  <Register setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/exam" 
              element={
                <ProtectedRoute>
                  <Exam user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/results" 
              element={
                <ProtectedRoute>
                  <Results user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile user={user} />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App; 