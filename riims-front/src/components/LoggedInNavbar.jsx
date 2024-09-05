import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import RiimsLogo from '../photos/riims-logo.png';
import './css/CustomNavbar.css'; 

function LoggedInNavbar() {
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        document.location = "/login";
    };

    return (
        <Navbar expand="lg" className="custom-navbar bg-light text-light shadow-sm">
            <Container>
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <img src={RiimsLogo} className='logo mr-5' alt="Riims Logo" />
                    {/* <span className="navbar-title">Riims Dashboard</span> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title="Menu" id="basic-nav-dropdown" className="text-light">
                            <NavDropdown.Item href="#action/3.1">CV</NavDropdown.Item>
                            <NavDropdown.Item href="/EditProfile">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/PersonDetails">Details</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/Home" className="text-light">Home</Nav.Link>
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
