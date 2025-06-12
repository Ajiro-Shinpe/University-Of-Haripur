// Register.js
import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    cnicNumber: '',
    universityId: '',
    department: '',
    programName: '',
    currentSemester: '',
    batch: '',
    section: '',
    academicSession: '',
    dateOfBirth: '',
    religion: '',
    emailAddress: '',
    accountPassword: '',
    rollNumber: '',
    profilePicture: null,
    academicResults: [],
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Validate required fields
      const requiredFields = [
        'fullName', 'fatherName', 'cnicNumber', 'universityId', 
        'department', 'programName', 'currentSemester', 'batch', 
        'section', 'academicSession', 'dateOfBirth', 'religion', 
        'emailAddress', 'accountPassword', 'rollNumber'
      ];

      for (const field of requiredFields) {
        if (!formData[field]) {
          setError(`Please fill in all required fields. Missing: ${field}`);
          return;
        }
      }

      // Validate CNIC number (13 digits)
      if (!/^\d{13}$/.test(formData.cnicNumber)) {
        setError('CNIC number must be exactly 13 digits');
        return;
      }

      // Validate roll number format (e.g., F24-XXXX)
      if (!/^F24-\d{4}$/.test(formData.rollNumber)) {
        setError('Roll number must be in the format F24-XXXX (e.g., F24-0194)');
        return;
      }

      // Get existing students from localStorage
      const existingStudents = JSON.parse(localStorage.getItem('students')) || [];

      // Check if roll number already exists
      if (existingStudents.some((student) => student.rollNumber === formData.rollNumber)) {
        setError('This roll number is already registered. Please use a different roll number or login if this is your account.');
        return;
      }

      // Check if email already exists
      if (existingStudents.some((student) => student.emailAddress === formData.emailAddress)) {
        setError('This email address is already registered. Please use a different email address.');
        return;
      }

      // Validate password strength (at least 8 characters)
      if (formData.accountPassword.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      // Handle profile picture (convert to base64 if needed)
      let profilePictureData = '';
      if (formData.profilePicture) {
        const reader = new FileReader();
        profilePictureData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(formData.profilePicture);
        });
      }

      // Create user data object
      const userData = {
        userImage: profilePictureData,
        fullName: formData.fullName,
        fatherName: formData.fatherName,
        cnicNumber: formData.cnicNumber,
        universityId: formData.universityId,
        department: formData.department,
        programName: formData.programName,
        currentSemester: formData.currentSemester,
        batch: formData.batch,
        section: formData.section,
        academicSession: formData.academicSession,
        dateOfBirth: formData.dateOfBirth,
        religion: formData.religion,
        emailAddress: formData.emailAddress,
        accountPassword: formData.accountPassword,
        rollNumber: formData.rollNumber,
        academicResults: [],
      };

      // Add new student to the list
      const updatedStudents = [...existingStudents, userData];
      localStorage.setItem('students', JSON.stringify(updatedStudents));

      // Clear form
      setFormData({
        fullName: '',
        fatherName: '',
        cnicNumber: '',
        universityId: '',
        department: '',
        programName: '',
        currentSemester: '',
        batch: '',
        section: '',
        academicSession: '',
        dateOfBirth: '',
        religion: '',
        emailAddress: '',
        accountPassword: '',
        rollNumber: '',
        profilePicture: null,
        academicResults: [],
      });

      // Show success message and navigate
      alert('Registration successful! Please log in to continue.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center m-0 p-0" style={{
      background: "linear-gradient(240deg, #2E265D, #2B6751)",
      position:"absolute",
      top:0,
      left:0,
      right:0,
      width: "100%",
      minHeight: "100vh",
      position: "relative",
      overflowY: "auto",
      padding: "1rem 0.5rem"
    }}>
      <div className="row justify-content-center w-100">
        <div className="col-xl-11 col-lg-12 col-md-12">
          <Card className="o-hidden border-0 shadow-lg">
            <Card.Header className="text-center" style={{
              background: "linear-gradient(240deg, #2E265D, #2B6751)",
              color: "#fff",
              borderTop: "2px solid blue"
            }}>
              <h1 className="text-white text-center mb-1">Create an Account!</h1>
            </Card.Header>
            <Card.Body className="p-5">
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="fullName">Full Name</Form.Label>
                      <Form.Control
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Enter full name"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="fatherName">Father's Name</Form.Label>
                      <Form.Control
                        id="fatherName"
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter father's name"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="cnicNumber">CNIC Number</Form.Label>
                      <Form.Control
                        id="cnicNumber"
                        type="text"
                        name="cnicNumber"
                        value={formData.cnicNumber}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        maxLength="13"
                        pattern="\d{13}"
                        title="CNIC must be 13 digits"
                        placeholder="Enter 13-digit CNIC"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="rollNumber">Roll Number</Form.Label>
                      <Form.Control
                        id="rollNumber"
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="e.g., F24-0194"
                        pattern="F24-\d{4}"
                        title="Roll number must be in the format F24-XXXX"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="universityId">University ID</Form.Label>
                      <Form.Control
                        id="universityId"
                        type="text"
                        name="universityId"
                        value={formData.universityId}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter university ID"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="emailAddress">Email Address</Form.Label>
                      <Form.Control
                        id="emailAddress"
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="Enter email address"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="department">Department</Form.Label>
                      <Form.Control
                        id="department"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter department"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="programName">Program Name</Form.Label>
                      <Form.Control
                        id="programName"
                        type="text"
                        name="programName"
                        value={formData.programName}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter program name"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="currentSemester">Current Semester</Form.Label>
                      <Form.Control
                        id="currentSemester"
                        type="text"
                        name="currentSemester"
                        value={formData.currentSemester}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter current semester"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="batch">Batch</Form.Label>
                      <Form.Control
                        id="batch"
                        type="text"
                        name="batch"
                        value={formData.batch}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter batch"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="section">Section</Form.Label>
                      <Form.Control
                        id="section"
                        type="text"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter section"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="academicSession">Academic Session</Form.Label>
                      <Form.Control
                        id="academicSession"
                        type="text"
                        name="academicSession"
                        value={formData.academicSession}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter academic session"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                      <Form.Control
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="religion">Religion</Form.Label>
                      <Form.Control
                        id="religion"
                        type="text"
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Enter religion"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="accountPassword">Password</Form.Label>
                      <Form.Control
                        id="accountPassword"
                        type="password"
                        name="accountPassword"
                        value={formData.accountPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        placeholder="Enter password"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="profilePicture">Profile Picture</Form.Label>
                      <Form.Control
                        id="profilePicture"
                        type="file"
                        name="profilePicture"
                        onChange={handleChange}
                        accept="image/*"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Button 
                    type="submit"
                    size="sm"
                    className="w-100"
                    style={{
                      background: "linear-gradient(240deg, #2E265D, #2B6751)",
                      border: "1px solid blue",
                      minWidth:"21.6rem",
                      color: "#fff"
                    }}
                  >
                    Register Account
                  </Button>
                </div>
                <div className="text-center">
                    <p className="mb-0">
                      Already have an account?{' '}
                      <Link to="/login" className="text-decoration-none" style={{color:'#2B6751'}}>
                        Login here
                      </Link>
                    </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;