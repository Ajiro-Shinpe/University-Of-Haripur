import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const user = localStorage.getItem('currentUser');
      setIsAuthenticated(!!user);
    };

    // Initial check
    checkAuth();

    // Listen for auth changes
    window.addEventListener('auth', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('auth', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Don't show navbar on login or register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const handleLogout = () => {
    // Remove user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserRollNumber');
    
    // Trigger auth event
    window.dispatchEvent(new Event('auth'));
    
    // Navigate to login
    navigate('/login', { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
      <Container fluid style={{ background: 'linear-gradient(40deg, #2E265D, #2B6751)' }}>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="./sip-logo-bold.png"
            alt="Logo"
            className="img img-fluid"
            style={{ width: '100px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className="text-white"
              onClick={() => navigate('/')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate('/exams')}
            >
              Exams
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate('/results')}
            >
              Results
            </Nav.Link>
            <Nav.Link
              style={{ cursor: 'pointer' }}
              className="text-white"
              onClick={handleLogout}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;