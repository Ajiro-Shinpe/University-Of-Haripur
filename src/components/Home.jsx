import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Fallback image
  const defaultImage = 'https://via.placeholder.com/150';
  const profileImage = user.userImage || defaultImage;
  return (
    <Container fluid className="py-3 px-2" style={{ backgroundColor: "#D8EDE7", minHeight: "100vh" }}>
      <Row className="g-3">
        <h3 className='fs-5 fw-bold text-dark px-3'>Student Profile</h3>
        <Col xs={12} md={4}>
          <Card className="shadow-sm h-100" style={{ borderTop: "2px solid blue" }}>
            <Card.Body className="text-center p-3">
              <Image
                src={profileImage}
                alt="Profile Picture"
                className='img img-fluid mb-3 shadow'
                style={{ width: '120px', height: '120px', objectFit: 'cover', border: '1px solid black' }}
                onError={(e) => { e.target.src = defaultImage; }}
              />
              <h4 className="fs-5 mb-3">{user.fullName}</h4>
              <div className="d-flex flex-column gap-2">
                <h5 className="fs-6 mb-0 pb-2 border-bottom">{user.department}</h5>
                <h5 className="fs-6 mb-0 pb-2 border-bottom">{user.fatherName}</h5>
                <h5 className="fs-6 mb-0 pb-2 border-bottom">{user.rollNumber}</h5>
                <h5 className="fs-6 mb-0 pb-2 border-bottom">{user.universityId}</h5>
              </div>
              <div className="mt-3">
                <h5 className='bg-primary text-white rounded w-100 py-2 mb-3 fs-6'>Official Email Credentials</h5>
                <p className='text-primary mb-2 fs-6'>Email Address <br /> {user.emailAddress}</p>
                <p className='text-primary mb-0 fs-6'>Password <br /> {user.accountPassword}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Card className="shadow-sm h-100">
            <Card.Header className="text-white py-3" style={{ background: "linear-gradient(240deg, #2E265D, #2B6751)" }}>
              <h5 className="mb-0 fs-6">Information</h5>
            </Card.Header>
            <Card.Body className="p-3">
              <Row className="g-3">
                {[
                  { label: "Name", value: user.fullName },
                  { label: "Father Name", value: user.fatherName },
                  { label: "CNIC Number", value: user.cnicNumber },
                  { label: "Session", value: user.academicSession },
                  { label: "Department", value: user.department },
                  { label: "Program", value: user.programName },
                  { label: "Current Semester", value: user.currentSemester },
                  { label: "Batch", value: user.batch },
                  { label: "Section", value: user.section },
                  { label: "Date of Birth", value: user.dateOfBirth },
                  { label: "Religion", value: user.religion }
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <Col xs={12} sm={3}>
                      <p className="mb-0 fs-6">{item.label}</p>
                    </Col>
                    <Col xs={12} sm={9}>
                      <p className="mb-0 fs-6" style={{ backgroundColor: "#E9ECEF", padding: "8px 12px", borderRadius: "8px" }}>
                        {item.value}
                      </p>
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row >
    </Container >
  );
};

export default Home;  