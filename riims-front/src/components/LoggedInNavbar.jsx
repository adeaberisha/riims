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
          <img src={RiimsLogo} className='logo mr-5' alt="Riims Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown" className="text-light">
              <NavDropdown.Item as={Link} to="/thecv">CV</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/edit-profile">Edit Profile</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/eksperienca">Eksperienca</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/aftesite">Aftesite</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/specializimet">Specializimet</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gjuhet">Gjuhet</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/licensat">Licensat</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/projekti">Projekti</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/puna-vullnetare">Puna Vullnetare</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/edukimi">Edukimi</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/honorsandawards">Honors And Awards</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/EditLicensa">EditLicensa</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/EditEksperienca">EditEksperienca</NavDropdown.Item> */}
              <NavDropdown.Item as={Link} to="/personDetails">Person Details</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/Home" className="text-light">Home</Nav.Link>
            
            
          </Nav>
          {isAdmin() && (
            <Nav>
              <Nav.Link as={Link} to="/Dashboard" className="text-light">Dashboard</Nav.Link>
            </Nav>
          )}
          <Nav>
            <Nav.Link onClick={handleLogout} className="text-light">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default LoggedInNavbar;


