import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNumber: '',
    accountPassword: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      
      // Find user with matching credentials in both arrays
      const user = [...registeredUsers, ...students].find(u => 
        u.rollNumber === formData.rollNumber && 
        u.accountPassword === formData.accountPassword
      );

      if (user) {
        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Store roll number separately for easier lookup
        localStorage.setItem('currentUserRollNumber', user.rollNumber);
        
        // Trigger auth event
        window.dispatchEvent(new Event('auth'));
        
        // Redirect to home page
        navigate('/', { replace: true });
      } else {
        setError('Invalid roll number or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center m-0 p-0"
      style={{
        background: "linear-gradient(240deg, #2E265D, #2B6751)",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0
      }}>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <img src="./sip-logo-bold.png" alt="sip-logo" className='img img-fluid' style={{
                width: "280px",
                objectFit: "contain"
              }} />
            </div>

            <Card className="border-0 shadow-lg">
              <Card.Header className="text-white text-center " style={{
                background: "linear-gradient(240deg, #2E265D, #2B6751)",
                borderTop: "2px solid blue"
              }}>
                <h2 className="mb-0">Login</h2>
              </Card.Header>
              <Card.Body className="p-4 p-md-5">
                {error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      <FaUser className="me-2" />
                      Roll Number
                    </Form.Label>
                    <Form.Control
                      id="rollNumber"
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      placeholder="Enter your roll number (e.g., F24-0194)"
                      pattern="F24-\d{4}"
                      title="Roll number must be in the format F24-XXXX"
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      <FaLock className="me-2" />
                      Password
                    </Form.Label>
                    <Form.Control
                      id="accountPassword"
                      type="password"
                      name="accountPassword"
                      value={formData.accountPassword}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="form-control-lg"
                    />
                  </Form.Group>
                  <div className="d-grid gap-2 mb-4 w-100">
                    <Button
                      type="submit"
                      size="sm"
                      className="w-100"
                      style={{
                        background: "linear-gradient(240deg, #2E265D, #2B6751)",
                        border: "1px solid blue",
                        minWidth:"100%",
                        color: "#fff"
                      }}
                    >
                      Sign In
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-decoration-none" style={{color:'#2B6751'}}>
                        Register here
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;