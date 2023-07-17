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

//***''const SignupView'' (and the following codes) creates the SignupView component. The function assigned to SignupView returns the visual representation of the component (the function renders what is displayed on the screen).
export const SignupView = () => {
    //***Initiate the first value for each sign up field as ''null''. A function allowing the update of this first null value for each field is added inside each const (ex: setUsername, setPassword...).
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const navigate = useNavigate();

    //***For Bootstrap design
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showUserExistsModal, setShowUserExistsModal] = useState(false);
    const [showSignupFailedModal, setShowSignupFailedModal] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    // Modal close handlers
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setShowUserExistsModal(false);
        setShowSignupFailedModal(false);
        if (signupSuccess) {
            navigate('/login');
        }
    };

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
        //***The function performs a POST request to the specified URL, to registered the new user.
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users", {
            //***POST request includes the user data in the request body, which is converted to JSON format using JSON.stringify(data).
            method: "POST",
            body: JSON.stringify(data),
            //***Specifies that the request body is in JSON format ("Content-Type": "application/json").
            headers: {
                "Content-Type": "application/json"
            }
        })
            //.then() method is chained to the fetch request to handle the response.
            .then((response) => {
                //***If the response is positive, indicating a successful registration, an alert message is displayed saying "Signup successful" and the page is reloaded.
                if (response.ok) {
                    setShowSuccessModal(true);
                    setSignupSuccess(true); // Set signupSuccess to true if signup was successful
                }
                else if (response.status === 409) {
                    setShowUserExistsModal(true);
                    //***If the response is negative, indicating a failed registration, an alert message is displayed saying "Signup failed".
                } else {
                    setShowSignupFailedModal(true);
                }
            });
    };

    //***''return'' indicates the elements that will be returned as the output of the SignupView component. 
    //***These returned elements are designed using React Bootstrap.
    return (
        //***When the form is submitted, the ''handleSubmit'' function is call from the ''onSubmit'' form event. When a form is submitted, the handleSubmit function is executed, which performs the necessary logic (as definied in the ''const handleSubmit = (event) => {'' block of code above) for handling the form submission, such as preparing the data and making the POST request to the server.
        <Form onSubmit={handleSubmit} style={{ border: "1px solid blue" }}>
            <div className="TitleDisplay">
                <h3>First time here?</h3>
                <h6>Sign up now.</h6>
            </div>
            <Form.Group controlId="formUsername" className="formGroupWithMargin">
                <Form.Label>Username</Form.Label>
                <Form.Control
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
                <Form.Text id="usernameCreation" muted>
                    Username must be at least 5 characters long and contain only alphanumerical characters.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPassword" className="formGroupWithMargin">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    //***Same logic as or Username field above.
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
                    //***Same logic as or Username field above.
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
                    //***Same logic as or Username field above.
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <Form.Text id="birthdayCreation" muted>
                    Birthday is optional.
                </Form.Text>
            </Form.Group>

            <div className="SignupButtonContainer">
                <Button variant="primary" type="submit">
                    Sign up
                </Button>

                {/* Success Modal */}
                <Modal show={showSuccessModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup successful!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You will be redirected to the login page.</Modal.Body>
                    <Modal.Footer>
                        {/* Move the navigation inside the onClick event handler */}
                        <Button variant="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* User Exists Modal */}
                <Modal show={showUserExistsModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>User already exists</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>The provided username already exists. Please choose a different username.</Modal.Body>
                    <Modal.Footer>
                        {/* Move the navigation inside the onClick event handler */}
                        <Button variant="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Signup Failed Modal */}
                <Modal show={showSignupFailedModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Something went wrong during signup. Please try again.</Modal.Body>
                    <Modal.Footer>
                        {/* Move the navigation inside the onClick event handler */}
                        <Button variant="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Form>
    );
};