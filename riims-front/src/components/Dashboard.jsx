import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaUsers, FaCheckCircle, FaTimesCircle, FaUserShield } from 'react-icons/fa'; 
import '../css/Dashboard.css'; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwtToken'); 

  useEffect(() => {
    if (token) {
      fetchUsers();
    } else {
      alert('Token not found. Please log in again.');
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7254/api/UserProfile/get-all-profiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user profiles:', err);
      setError('Failed to fetch user profiles. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <Container fluid>
      <Row className="my-4 text-center">
        <Col>
          <h1 className="text-center  dashboard-title mt-4">Admin Dashboard</h1>
        </Col>
      </Row>

      {/* First row: Welcome Admin card */}
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="text-center shadow-lg welcome-admin-card animated-card">
            <Card.Body className="p-4">
              <FaUserShield size={60} className="mb-3 text-white icon-background" />
              <Card.Title className="fs-4">Welcome, Admin!</Card.Title>
              <Card.Text className="welcome-admin-text">
                You can manage users, monitor activities, and ensure everything is running smoothly.
              </Card.Text>
              <p className="text-muted">Ensure a seamless experience for all users.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Second row: Total Users card */}
      <Row className="mt-4">
        <Col md={4} className="mx-auto">
          <Card className="text-center shadow-lg total-users-card animated-card">
            <Card.Body className="p-4">
              <FaUsers size={60} className="mb-3 text-white icon-background" />
              <Card.Title className="fs-4">Total Users</Card.Title>
              <Card.Text className="display-4">{users.length}</Card.Text>
              <p className="text-muted">Number of registered users</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Third row: User list */}
      <Row>
        <Col className="mb-4">
          <h2 className="my-4">User List</h2>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Academic Level</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{`${user.emri} ${user.mbiemri}`}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.numriTelefonit || 'Not any'}</td>
                  <td>{user.niveliAkademik || 'N/A'}</td>
                  <td>
                    {user.isActive ? (
                      <FaCheckCircle className="text-success" />
                    ) : (
                      <FaTimesCircle className="text-danger" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
