import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import RiimsLogo from '../photos/riims-logo.png';
import '../css/CustomNavbar.css';

function LoggedInNavbar({ handleLogout }) {
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
                            <NavDropdown.Item as={Link} to="/cv">CV</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/edit-profile">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/eksperienca">Eksperienca</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/aftesite">Aftesite</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/specializimet">Specializimet</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/gjuhet">Gjuhet</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/licensat">Licensat</NavDropdown.Item> {/* Add Licensat link */}
                            <NavDropdown.Item as={Link} to="/projekti">Projekti</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/person-details">Details</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/home" className="text-light">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLogout} className="text-light">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default LoggedInNavbar;
