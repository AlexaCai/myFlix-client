import { React } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import './signup-view.scss';


export const SignupView = () => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    

    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
    const navigate = useNavigate();


    //***BOOTSTRAP elements for the modal popping up after a user click on the ''Sign up'' button.
    const [showModal, setShowModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const handleCloseModal = () => {
        setShowModal(false);
        setResponseMessage("");
        if (isSignupSuccessful) {
            navigate('/login');
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    setResponseMessage("You're on board! Your registration was successful, you will be redirected to the log in page.");
                    setIsSignupSuccessful(true);
                } else if (response.status === 409) {
                    response.text().then((text) => {
                        setResponseMessage(text);
                    }).catch((error) => {
                        console.error("Error reading response data:", error);
                        setResponseMessage("Signup failed.");
                    });
                } else {
                    setResponseMessage("Signup failed. Please make sure your information meets the requirements for each field. Refer to the instructions under each input field.");
                }
                setShowModal(true);
            })
            .catch((error) => {
                console.error("Error signing up user:", error);
                setResponseMessage("Signup failed.");
                setShowModal(true);
            });
    };


    return (

        <Form onSubmit={handleSubmit}>

            <div className="TitleDisplay">
                <h3>First time here?</h3>
                <h6>Sign up now.</h6>
                <br />
            </div>


            <Form.Group controlId="formUsername" className="formGroupWithMargin">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                    //***By using [a-zA-Z0-9]+ as the pattern, it enforces that the username input must consist of one or more alphanumeric characters. It will reject usernames that contain spaces, special characters, or other non-alphanumeric characters.
                    pattern="[a-zA-Z0-9]+"
                    title="Username must consist of alphanumeric characters"
                />
                <Form.Text id="usernameCreation" muted>
                    Username must be at least 5 characters long and contain only alphanumerical characters.
                </Form.Text>
            </Form.Group>


            <Form.Group controlId="formPassword" className="formGroupWithMargin">
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


            <Form.Group controlId="formEmail" className="formGroupWithMargin">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    //***[a-zA-Z0-9._%+-]+ allows alphanumeric characters, dots, underscores, percent signs, plus signs, or hyphens before the @ symbol. Pattern used to match the local part of the email address, which is the part before the @ symbol.
                    //***@ makes sure there is a @ symbol in the email provide.
                    //***[a-zA-Z0-9.-]+ allows alphanumeric characters and dots after the @ symbol but before the domain extension. Pattern used to match the domain name part of the email address, which is the part after the @ symbol.
                    //***\. makes sure a dot is present for the email extension.
                    //***[a-zA-Z]{2,} allows two or more characters of uppercase or lowercase after the dot, representing the domain extension.
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address"
                />
                <Form.Text id="emailCreation" muted>
                    Email must be in the following format : abc@domain.abc.
                </Form.Text>
            </Form.Group>


            <Form.Group controlId="formBirthday" className="formGroupWithMargin">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                    type="date"
                    max={new Date().toLocaleDateString('en-CA')}
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <Form.Text id="birthdayCreation" muted>
                    Birthday is optional.
                </Form.Text>
            </Form.Group>


            <div className="SignupButtonContainer">
                <Button variant="success" type="submit">
                    Sign up
                </Button>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign up status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{responseMessage}</Modal.Body>
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