//***Import different React built-in function.
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

//***Import the different React Bootstrap components.
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';

//***Import the signup-view.scss the allow modiication to the React Bootstrap UI design.
import './signup-view.scss';

//*** ''const SignupView'' is functional component, ''SignupView'' being it's name. It is defined as an arrow function without any parameters, indicating it does not receive any props.
export const SignupView = () => {

    //***Bootstrap const for modal popping up after a user click the sign up button.
    const [showModal, setShowModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const handleCloseModal = () => {
        setShowModal(false);
        setResponseMessage("");
        if (isSignupSuccessful) {
            navigate('/login');
          } 
    };

    //***
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
    const navigate = useNavigate();


    //***Initiate the first value for each sign up field as ''null''. A function allowing the update of this first null value for each field is added inside each const (ex: setUsername, setPassword...).
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    //***''const handleSubmit = (event) =>'' handles the form submission when a user signs up.
    const handleSubmit = (event) => {
        //***This prevents the default behavior of the form which is to reload the entire page. Calling preventDefault() stops the form from performing its default action.
        event.preventDefault();
        //***The function creates a (data) object that contains the user's input values from the form fields (Username, Password, Email, and Birthday).
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        //***The fetch then performs a POST request to the specified URL, to registered the new user.
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users", {
            //***The POST request includes the user data in the request body, which is converted to JSON format using JSON.stringify(data).
            method: "POST",
            body: JSON.stringify(data),
            //***Specifies that the request body is in JSON format ("Content-Type": "application/json").
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    setResponseMessage("You're on board! Your registration was successful, you will be redirected to the login page");
                    setIsSignupSuccessful(true);
                } else if (response.status === 409) {
                    response.text().then((text) => {
                        // Display the plain text response.
                        setResponseMessage(text);
                    }).catch((error) => {
                        // If there is an error reading the response, show a generic "Signup failed" alert.
                        console.error("Error reading response data:", error);
                        setResponseMessage("Signup failed");
                    });
                } else {
                    // For other error codes, show a generic "Signup failed" alert.
                    setResponseMessage("Signup failed");
                }
                setShowModal(true);
            })
            .catch((error) => {
                console.error("Error signing up user:", error);
                setResponseMessage("Signup failed");
                setShowModal(true); // Show the modal with the generic "Signup failed" message
            });
    };


    //***''return'' indicates all the elements that will be returned as the output on the UI of the SignupView component. 
    //***These returned elements are designed using React Bootstrap.
    return (
        //***This line defines a form using the <Form> component from React Bootstrap. 
        //***When the form is submitted (so when a user click on the ''Sign up'' button being a type="Submit"), the ''handleSubmit'' function is call from the ''onSubmit'' form event. The handleSubmit function is therefore executed, which performs the necessary logic (as definied in the ''const handleSubmit = (event) => {'' block of code above) for handling the form submission. It prepares the data and makes the POST request to the server to register the new user in the database.
        <Form onSubmit={handleSubmit} style={{ border: "1px solid blue" }}>
            {/* Form title */}
            <div className="TitleDisplay">
                <h3>First time here?</h3>
                <h6>Sign up now.</h6>
            </div>
            {/* Block of code for the username input field */}
            <Form.Group controlId="formUsername" className="formGroupWithMargin">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    //***Specifies the input as text.
                    type="text"
                    //***''value={username}'' binds the first value of the input field to the username state variable (which is empty at first as defined in const [username, setUsername] = useState("");).
                    value={username}
                    //***When the user types/modifies the username input value, this event handler is triggered. ''e.target.value'' represents the new value of the input field written by the user. By calling setUsername(e.target.value), the username state is updated with the new value entered by the user.
                    onChange={(e) => setUsername(e.target.value)}
                    //***Indicate that the field username must have a value when user is signing up.
                    required
                    //***Indicate that the username must have at least 5 characters.
                    minLength="5"
                    //***By using [a-zA-Z0-9]+ as the pattern, it enforces that the username input must consist of one or more alphanumeric characters. It will reject usernames that contain spaces, special characters, or other non-alphanumeric characters.
                    pattern="[a-zA-Z0-9]+"
                    //***Descriptive error message when the pattern on alphanumerical character is not matched.
                    title="Username must consist of alphanumeric characters"
                />
                {/* Indications below the input field to make sure the user write valide input */}
                <Form.Text id="usernameCreation" muted>
                    Username must be at least 5 characters long and contain only alphanumerical characters.
                </Form.Text>
            </Form.Group>

            {/* Same logic as the username input field */}
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

            {/* Same logic as the username input field */}
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

            {/* Same logic as the username input field */}
            <Form.Group controlId="formBirthday" className="formGroupWithMargin">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <Form.Text id="birthdayCreation" muted>
                    Birthday is optional.
                </Form.Text>
            </Form.Group>

            <div className="SignupButtonContainer">
                {/*The type="submit" attribute in the <Button> element is crucial for the onSubmit={handleSubmit} to work properly. Without it, clicking the button won't trigger the form submission, and the handleSubmit function won't be called.*/}
                <Button variant="primary" type="submit">
                    Sign up
                </Button>
                {/* Modal to display the API response message */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{responseMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Form>
    );
};