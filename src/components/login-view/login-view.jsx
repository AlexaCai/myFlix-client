import { React } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import './login-view.scss';


export const LoginView = ({ onLoggedIn }) => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //***BOOTSTRAP elements for the modal popping up after a user click the ''Log in'' button (only if the log in failed, otherwise the user is directly sent to the main view inside the app).
    const [showLoginFailedModal, setShowLoginFailedModal] = useState(false);
    const handleCloseModal = () => {
        setShowLoginFailedModal(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password
        };
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    setShowLoginFailedModal(true);
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };


    return (

        <Form onSubmit={handleSubmit} className="form-container">

            <div className="TitleDisplay">
                <h3>Welcome back!</h3>
                <h6>Ready for your next marathon?</h6>
                <br />
            </div>
            

            {/* Block of code for the username input field */}
            <Form.Group controlId="formUsername" className="formGroupStyling">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Form.Text id="usernameCreation" muted>
                    Username must be at least 5 characters long and contain only alphanumerical characters.
                </Form.Text>
            </Form.Group>


            {/* Block of code for the password input field */}
            <Form.Group controlId="formPassword" className="formGroupStyling">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Form.Text id="passwordCreation" muted>
                    Password can contain alphanumeric and non-alphanumeric characters.
                </Form.Text>
            </Form.Group>
            

            <div className="LoginButtonContainer">
                <Button variant="success" type="submit" className="LoginButton">
                    Log in
                </Button>


                {/* Modal popping up if failed log in */}
                <Modal show={showLoginFailedModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Log in failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please check your username and/or password and try again. <br /> <br />
                        Not a user yet? <Link to="/signup">Sign up now.</Link>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        </Form>
    );
};