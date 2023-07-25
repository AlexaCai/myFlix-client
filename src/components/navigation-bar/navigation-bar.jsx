//***Import different React built-in function.
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//***Import the different React Bootstrap components.
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";

//***Import the navigation-bar.scss to allow modiication to the React Bootstrap UI design.
import './navigation-bar.scss';

//***''const NavigationBar'' is functional component, ''NavigationBar'' being it's name. It is defined as an arrow function without two parameters, indicating it receives { user, onLoggedOut } props.
export const NavigationBar = ({ user, onLoggedOut, selectedGenres, setSelectedGenres, selectedDirectors, setSelectedDirectors, resetFilters }) => {

  const [currentPage, setCurrentPage] = useState("");
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  //***Filter modal popping up after clicking on the ''search movies'' button in the navigation bar.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //***''return'' includes all the elements that will be returned as the output on the UI when as user is logged in or not. 
  //***These elements are designed using React Bootstrap.
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={() => handleNavigation("/")}>
            myFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Display in the navigation bar if the user is not logged in */}
              {!user && (
                <>
                  <Nav.Link as={Link} to="/login" onClick={() => handleNavigation("/")}>
                    Log in
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign up
                  </Nav.Link>
                </>
              )}
              {/* Display in the navigation bar if the user is logged in */}
              {user && (
                <>
                  <Nav.Link as={Link} to="/" onClick={() => handleNavigation("/")}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={`/users/${user.Username}`} onClick={() => handleNavigation("/users/:Username")}>
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={() => {
                    onLoggedOut(); // Call the first function
                  }}>
                    Log out
                  </Nav.Link>
                </>
              )}
            </Nav>
            
            {/* Search movie button is separated from the navigation bar to put it on the very right of it */}
            {user && currentPage === "/" && (
              <div className="ml-auto"> {/* This div will push the button to the right */}
                <Button variant="success" onClick={() => setShow(true)}>
                  Search movies
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form className="center-content">
            {/* Render checkboxes for genres */}
            <Row>
              <h5>Genres</h5>
              {['Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Science fiction', 'Thriller'].map((genre) => (
                <div key={genre} className="mb-3">
                  <Form.Check
                    inline
                    label={genre}
                    name="genres"
                    type="checkbox"
                    id={`inline-${genre}`}
                    onChange={() => setSelectedGenres(genre)}
                    checked={selectedGenres.includes(genre)}
                  />
                </div>
              ))}
            </Row>
            <Row>
              {/* Render checkboxes for directors */}
              <h5>Director</h5>
              {['Brad Bird', 'Bryan Buckley', 'Edward Zwick', 'Francis Ford Coppola', 'Hayao Miyazaki', 'Jonathan Demme', 'Ridley Scott', 'Steven Spielberg', 'Thomas Carter'].map((director) => (
                <div key={director} className="mb-3">
                  <Form.Check
                    inline
                    label={director}
                    name="directors"
                    type="checkbox"
                    id={`inline-${director}`}
                    onChange={() => setSelectedDirectors(director)}
                    checked={selectedDirectors.includes(director)}
                  />
                </div>
              ))}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={resetFilters}>
            Clear Filters
          </Button>
          <Button variant="success" onClick={handleClose}>
            See results
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};