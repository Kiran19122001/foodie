import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GiFoodTruck } from "react-icons/gi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "./index.css";

const NavbarSection = () => {
  const isUser = localStorage.getItem("token");
  // using useNavigate hook  for navigation
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  // handling the logout functionality
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  // handling the nav close functionality
  const handleNavClose = () => {
    setExpanded(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary nav-main-cont">
      <Container className="container-parent">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          onClick={handleNavClose}
        >
          <GiFoodTruck className="mr-2 logo" size={70} color="orange" />
          <span className="logo-name"> Foodie</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="navigation-items"
          in={expanded}
        >
          <Nav className="me-auto mobile-view-menu">
            <Nav.Link
              as={Link}
              to="/"
              className="bars"
              onClick={handleNavClose}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favorites"
              className="bars"
              onClick={handleNavClose}
            >
              My Favourites
            </Nav.Link>
            {/* if isUser true then he can show the logout and profile if not then he has to login or register */}
            {isUser ? (
              <button
                type="button"
                onClick={onLogout}
                className="btn btn-secondary"
              >
                Logout
                <RiLogoutCircleRLine size={32} />
              </button>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="bars"
                onClick={handleNavClose}
              >
                Login/Register
              </Nav.Link>
            )}

            {isUser && (
              <NavDropdown
                title="Profile"
                id="basic-nav-dropdown"
                className="bars profile"
                onClick={handleNavClose}
              >
                <NavDropdown.Item href="#account">Account</NavDropdown.Item>
                <NavDropdown.Item href="" onClick={onLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSection;
