//***Import different React built-in functions.
import { React } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

//***Import different React Bootstrap components.
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

//***Import the signup-view.scss to allow modification to the React Bootstrap UI design.
import './signup-view.scss';

//***''const SignupView'' is a functional component, ''SignupView'' being it's name. It is defined as an arrow function without any parameters, indicating it does not receive any props.
export const SignupView = () => {

    //***Initiate the first value for each sign up field as ''null''. A function allowing the update of this first null value for each field is added inside each const (ex: setUsername, setPassword...).
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    //***Logic to allow the Sign up page to be redirected to Log in page after successful Sign up.
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

    //***''const handleSubmit = (event) =>'' handles the form submission when a user clicks on the ''Sign up'' button.
    const handleSubmit = (event) => {
        //***''event.preventDefault'' prevents the default behavior of the form when submitted, which is to reload the entire page (when a form is submitted in a web app, it typically triggers a page refresh).
        event.preventDefault();
        //***Creation of (data) object that contains the user's input values from the Sign up form fields (Username, Password, Email, and Birthday).
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        //***A fetch request is made to the specified URL below with a POST method. The request body is the (data) object from above with the four properties.
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users", {
            //***The POST request includes the user data in the request body, which is converted to JSON format using JSON.stringify(data).
            method: "POST",
            body: JSON.stringify(data),
            //***Specifies that the request body is in JSON format ("Content-Type": "application/json").
            headers: {
                "Content-Type": "application/json"
            }
        })
        //***Logic depending on the result of the request : successful, username or email already exsit, or error. When the answer is successful or when the username or the email is already used, a modal pops up to inform the user. If any error, a default alert pops up letting the user know there was a problem with his Sign up.
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


    //***''return'' includes all the elements that will be returned as the output on the UI of the Sign up page (SignupView component). 
    //***These elements are designed using React Bootstrap.
    return (
        //***This line defines a form using the <Form> component from React Bootstrap. 
        //***When the form is submitted (so when a user click on the ''Sign up'' button being a type="Submit" below), the ''handleSubmit'' function is call from the ''onSubmit'' form event. The handleSubmit function is therefore executed, which performs the necessary logic (it prepares the data and makes the POST request to the server to register the new user in the database).
        <Form onSubmit={handleSubmit}>

            {/* Form title */}
            <div className="TitleDisplay">
                <h3>First time here?</h3>
                <h6>Sign up now.</h6>
                <br />
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

            {/* Button to confirm and send the Sign up form */}
            <div className="SignupButtonContainer">
                {/*The type="submit" attribute in the <Button> element is crucial for the onSubmit={handleSubmit} to work properly. Without it, clicking the button won't trigger the form submission, and the handleSubmit function won't be called.*/}
                <Button variant="success" type="submit">
                    Sign up
                </Button>

                {/* Modal displaying response message after the request as been sent upon clicking on Sign Up button */}
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