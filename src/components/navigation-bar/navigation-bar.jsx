//***Import different React built-in function.
import { useState } from "react";

//***Import the different React Bootstrap components.
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

//***Import the navigation-bar.scss to allow modiication to the React Bootstrap UI design.
import './navigation-bar.scss';

//***''const NavigationBar'' is functional component, ''NavigationBar'' being it's name. It is defined as an arrow function without two parameters, indicating it receives { user, onLoggedOut } props.
export const NavigationBar = ({ user, onLoggedOut, selectedGenres, setSelectedGenres, selectedDirectors, setSelectedDirectors, resetFilters }) => {

  //***Filter modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleFilter = () => {
    console.log("Selected Genres:", selectedGenres);
    console.log("Selected Directors:", selectedDirectors);
  };

  const handleClearClick = () => {
    // Get all checkbox inputs by name
    const genreCheckboxes = document.querySelectorAll('input[name="genres"]');
    const directorCheckboxes = document.querySelectorAll('input[name="directors"]');

    // Uncheck all genre checkboxes
    genreCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Uncheck all director checkboxes
    directorCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  //***''return'' includes all the elements that will be returned as the output on the UI when as user is logged in or not. 
  //***These elements are designed using React Bootstrap.
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Display in the navigation bar if the user is not logged in */}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
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
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.Username}`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Log out</Nav.Link>
                <Button variant="success" onClick={() => setShow(true)}>
                  Search movies
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Filter movies</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <Form>

                      {/* Render checkboxes for genres */}
                      <h4>Genres</h4>
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

                      {/* Render checkboxes for directors */}
                      <h4>Director</h4>
                      {['Brad Bird', 'Thomas Carter'].map((director) => (
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

                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline-success" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="outline-danger" onClick={resetFilters}>
                      Clear Filters
                    </Button>                    
                    <Button variant="success" onClick={handleFilter}>
                      Find
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};