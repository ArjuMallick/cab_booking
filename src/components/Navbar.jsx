import { Link } from "react-router-dom";

import { Navbar as BNavbar, Nav, Container, Button } from "react-bootstrap";
import { CarFront } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <BNavbar expand="lg" sticky="top" className="glass-panel mt-3 mx-3 rounded-4 navbar-dark">
      <Container>
        {/* Logo */}
        <BNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center text-white"
        >
          <CarFront className="me-2 text-success" size={22} />
          QuickCab
        </BNavbar.Brand>

        <BNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/book">Book Ride</Nav.Link>

            {!currentUser ? (
              <>
                <Nav.Link as={Link} to="/login" className="ms-lg-3">
                  <Button variant="outline-light" size="sm">
                    Login
                  </Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-lg-3"
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}

export default Navbar;
