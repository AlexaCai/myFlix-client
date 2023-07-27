//***Import different React built-in functions.
import { React } from "react";
import { useState } from "react";

//***Import different React Bootstrap components.
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

//***Import the login-view.scss to allow modiication to the React Bootstrap UI design.
import './login-view.scss';

//***''const LoginView'' is functional component, ''LoginView'' being it's name. It is defined as an arrow function without one parameter, indicating it receives { onLoggedIn } prop.
export const LoginView = ({ onLoggedIn }) => {

    //***Initiate the first value for each Log in field as empty. A function allowing the update of this first value for each field is present inside each const (ex: setUsername, setPassword...).
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //***BOOTSTRAP elements for the modal popping up after a user click the ''Log in'' button (only if the log in failed, otherwise the user is directly sent to the main view inside the app).
    const [showLoginFailedModal, setShowLoginFailedModal] = useState(false);
    const handleCloseModal = () => {
        setShowLoginFailedModal(false);
    };

    //***''const handleSubmit'' is declared and assigned an arrow function. This function takes an event parameter (event), which represents the form submission event.
    const handleSubmit = (event) => {
        //***''event.preventDefault'' prevents the default behavior of the form when submitted, which is to reload the entire page (when a form is submitted in a web app, it typically triggers a page refresh).
        event.preventDefault();
        //***''const data'' is declared and assigned an object value with two properties: Username and Password. The purpose of this block of code is to create a data object that will be sent in the log in POST request to the specified fetched URL.
        const data = {
            Username: username,
            Password: password
        };
        //***A fetch request is made to the specified URL below with a POST method. The request body is the (data) object from above with the two properties.
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/login", {
            method: "POST",
            //***headers property is an object that sets the request headers (here its sets the ''Content-Type'' header to ''application/json'', indicating that the data being sent in the request body is in JSON format).
            headers: {
                "Content-Type": "application/json"
            },
            //***The body property contains the (data) that will be sent with the request. It uses the JSON.stringify() to convert the data object to a JSON string before sending it in the request body.
            body: JSON.stringify(data)
        })
            //***.then() is a promise chained to the fetch request. It takes the response object returned by the server and calls the .json() method on it to transform the response content into a JSON object that can be used to extract the JWT (JSON Web Token) sent by the API.
            .then((response) => response.json())
            //***.then () is a promise that is chained to the previous .then(). It takes the received parsed JSON data as an argument (data) and performs the actions below on it.
            .then((data) => {
                //***''if (data.user)'' checks if the data object received from the API response (now in JSON format) has a truthy user property or not, and then performed actions accordingly.
                if (data.user) {
                    //***If data.user exists, it means the user object exists, so it is stored in the browser's localStorage. The localStorage is a web API that allows data to be stored in the browser's local storage area. There, the user object is transformed to a JSON string using JSON.stringify() and then stored with the key ''user'' in the localStorage.
                    localStorage.setItem("user", JSON.stringify(data.user));
                    //***Idem to line above.
                    localStorage.setItem("token", data.token);
                    //***If data.user exists, onLoggedIn() function is called with the data.user and data.token as arguments. ''user'' and ''token'' can then be passed back to the ''MainView'' component so they can be used in all the subsequent API requests. This line is used to notify the ''MainView'' component that the user has successfully logged in (see ''if (!user)'' function in MainView component, and the logic related to it for a view of the commands it triggered).
                    onLoggedIn(data.user, data.token);
                } else {
                    //***If (data.user) doesnt exist, the message ''No such user'' is displayed on the UI.
                    setShowLoginFailedModal(true);
                }
            })
            //***.catch() function is used to handle any errors that occur during the fetch request.
            .catch((e) => {
                alert("Something went wrong");
            });
    };


    //***''return'' includes all the elements that will be returned as the output on the UI of the Log in page (LoginView component). 
    //***These elements are designed using React Bootstrap.
    return (
        //***This line defines a form using the <Form> component from React Bootstrap. 
        //***When the form is submitted (so when a user click on the ''Sign up'' button being a type="Submit" below), the ''handleSubmit'' function is call from the ''onSubmit'' form event. The handleSubmit function is therefore executed, which performs the necessary logic (it prepares the data and makes the POST request to the server to login the new user).       
        <Form onSubmit={handleSubmit} className="form-container">

            {/* Form title */}
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
                    //***{username} come from useState() upper.
                    //***value attribute is set to the first value of the username state variable {username}, which is an empty string at the beginning (const [username, setUsername] = useState("");).
                    value={username}
                    //***setUsername come from useState() upper.
                    //***The onChange event handler updates the username state variable with the new value (username) entered in the input field by the user (with ''e.target.value''). So, initially, the username input field is empty because the value attribute is set to an empty string. As the user types in the input field, the onChange event handler will update the username state variable.
                    onChange={(e) => setUsername(e.target.value)}
                    //***Make sure a value in the username field of the log in form is required as an input from the user, otherwise UI will throws a ''Please fill out this field'' message.
                    required
                />
                <Form.Text id="usernameCreation" muted>
                    Username must be at least 5 characters long and contain only alphanumerical characters.
                </Form.Text>
            </Form.Group>

            {/* Same logic as the username input field */}
            <Form.Group controlId="formPassword" className="formGroupStyling">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    //***{password} come from useState() upper.
                    //***value attribute is set to the first value of the password state variable {password}, which is an empty string at the beginning (const [password, setPassword] = useState("");).
                    value={password}
                    //***setPassword come from useState() upper.
                    //***The onChange event handler updates the password state variable with the new value (password) entered in the input field by the user (with ''e.target.value''). So, initially, the password input field is empty because the value attribute is set to an empty string. As the user types in the input field, the onChange event handler will update the password state variable.
                    onChange={(e) => setPassword(e.target.value)}
                    //***Make sure a value in the password field of the log in form is required as an input from the user, otherwise will UI throws a ''Please fill out this field'' message.
                    required
                />
                <Form.Text id="passwordCreation" muted>
                    Password can contain alphanumeric and non-alphanumeric characters.
                </Form.Text>
            </Form.Group>

            {/* Button to confirm and send the Log in form */}
            <div className="LoginButtonContainer">
                <Button variant="success" type="submit" className="LoginButton">
                    Log in
                </Button>

                {/* Modal popping up after failed log in */}
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