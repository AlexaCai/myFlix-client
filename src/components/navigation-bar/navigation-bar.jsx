import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import './navigation-bar.scss';


export const NavigationBar = ({ user, onLoggedOut, selectedGenres, setSelectedGenres, selectedDirectors, setSelectedDirectors, selectedTitle, setSelectedTitle, handleSearchSubmit, resetFilters }) => {


  //***BOOTSTRAP filter modal popping up after clicking on the ''search movies'' button in the navigation bar.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  const [currentPage, setCurrentPage] = useState("");
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };


  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);


  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  

  const handleSearchSubmitNav = (e) => {
    e.preventDefault();
    setSelectedTitle(inputValue);
    handleSearchSubmit(e)
    setInputValue("");
  };


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
            {/* Condition to make sure the ''filter movies'' button and the search bar only show up in the navigation bar when the user is on home page ''/'' */}
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


      {/* Modal popping up when user click on ''filter movies'' button - it contains the filtering options */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <Form className="center-content">
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


          <Button variant="danger" onClick={resetFilters}>
            Clear filter(s)
          </Button>


          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
          

        </Modal.Footer>
      </Modal>
    </>
  );
};