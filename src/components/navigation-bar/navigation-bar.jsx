//***Import the different React Bootstrap components.
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

//***Import the navigation-bar.scss to allow modiication to the React Bootstrap UI design.
import './navigation-bar.scss';

//***''const NavigationBar'' is functional component, ''NavigationBar'' being it's name. It is defined as an arrow function without two parameters, indicating it receives { user, onLoggedOut } props.
export const NavigationBar = ({ user, onLoggedOut }) => {

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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};