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
import { Col } from "react-bootstrap";

//***Import the navigation-bar.scss to allow modiication to the React Bootstrap UI design.
import './navigation-bar.scss';

//***''const NavigationBar'' is functional component, ''NavigationBar'' being it's name. It is defined as an arrow function without two parameters, indicating it receives { user, onLoggedOut } props.
export const NavigationBar = ({ user, onLoggedOut, selectedGenres, setSelectedGenres, selectedDirectors, setSelectedDirectors, selectedTitle, setSelectedTitle, handleSearchSubmit, resetFilters }) => {

  //***BOOTSTRAP filter modal popping up after clicking on the ''search movies'' button in the navigation bar.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //***This code sets up a state variable currentPage to keep track of the current page value. This is used in this code to make sure the ''filter movies'' button and the search bar only appear when on the main-view (otherwise, its not shown).
  const [currentPage, setCurrentPage] = useState("");
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  //***This code ensures that the currentPage state is kept in sync with the current URL path by using the useLocation hook to get the current location information and the useEffect hook to update the state whenever the pathname changes. Also used in this code to make sure the ''filter movies'' button and the search bar only appear when on the main-view (otherwise, its not shown).
  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  //***This const [inputValue, setInputValue] holds the value written by the user in the search bar. At first its empty, and then when the user type a movie title, the inputValue state is getting updated.
  const [inputValue, setInputValue] = useState('');
  //***This code is used to receive the text entered in the search bar by the user, and updated the inputValue accordingly. 
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //***This code is activated when the user click on the submit button from the search bar. It passes the necessary information to main-view.jsx to perform the research in the movie lists in the main view UI.
  const handleSearchSubmitNav = (e) => {
    e.preventDefault();
    setSelectedTitle(inputValue);
    handleSearchSubmit(e)
    setInputValue("");
  };


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
                    onLoggedOut();
                    resetFilters();
                  }}>
                    Log out
                  </Nav.Link>
                </>
              )}
            </Nav>
            {/* Condition to make sure ''filter movies'' button and the search bar only show up in the navigation bar when the user is on home page ''/'' */}
            {user && currentPage === "/" && (
              <div>
                <div className="SearchBarAndFilterWrapper">
                  <div className="SearchBarWrapper">
                    <Form inline onSubmit={handleSearchSubmitNav} className="NavBarButtonAndSearch">
                      <Form.Control
                        type="text"
                        placeholder="Search movie"
                        className="mr-sm-2 NavBarInput"
                        value={inputValue}
                        onChange={handleInputChange}
                      />
                      <Button type="submit" variant="success" className="searchButton">
                        Search
                      </Button>
                    </Form>
                  </div>
                  <div className="FilterButtonWrapper">
                    <Button variant="success" className="NavBarButtonAndSearch FilterMoviesButton" onClick={() => setShow(true)}>
                      Filter movies
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal popping up when user click on ''filter movies'' and containing the filtering options */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form className="center-content">
            {/* Render checkboxes for genres */}
            <Row>
              <Col xs={12} sm={5} md={5} lg={5} xl={5} xxl={4} >
                <h5 className="filterTitle">Genres</h5>
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
              </Col>

              {/* Render checkboxes for directors */}
              <Col xs={12} sm={7} md={7} lg={7} xl={7} xxl={8} >
                <h5 className="filterTitle">Directors</h5>
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
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          {/* Button at the bottom of the modal */}
          <Button variant="danger" onClick={resetFilters}>
            Clear filter(s)
          </Button>

          {/* Button at the bottom of the modal */}
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};