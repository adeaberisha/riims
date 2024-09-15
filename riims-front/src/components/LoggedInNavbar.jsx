import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import RiimsLogo from '../photos/riims-logo.png';
import '../css/CustomNavbar.css';
function LoggedInNavbar({ handleLogout }) {
  const token = localStorage.getItem('jwtToken');
  function isAdmin() {
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token has expired");
        return false;
      }
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].toLowerCase() === 'admin';
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }

  return (
    <Navbar expand="lg" className="custom-navbar bg-light text-light shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={RiimsLogo} className="logo mr-5" alt="Riims Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/edit-profile">Edit Profile</Nav.Link>
            <Nav.Link as={Link} to="/personDetails">CV Details</Nav.Link>
            <Nav.Link as={Link} to="/Home">Home</Nav.Link>
          </Nav>
          {isAdmin() && (
            <Nav>
              <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
            </Nav>
          )}
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default LoggedInNavbar;


