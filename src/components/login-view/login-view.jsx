//***Import different React built-in function.
import React from "react";
import { useState } from "react";

//***Import the different React Bootstrap components.
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

//***Import the login-view.scss the allow modiication to the React Bootstrap UI design.
import './login-view.scss';

//***''const LoginView'' (and the following codes) creates the LoginView component. This component is a functional component that receives props as its argument (onLoggedIn). This component will then be displayed in the UI when users are not logged in. 
export const LoginView = ({ onLoggedIn }) => {
    //***This line declares a state variable username and a corresponding function setUsername to update its value. The initial value of username is an empty string (""). The purpose of this state variable is to keep track of the value entered in the username field and provide a way to update it.
    const [username, setUsername] = useState("");
    //***This line declares a state variable password and a corresponding function setPassword to update its value. The initial value of password is an empty string (""). The purpose of this state variable is to keep track of the value entered in the password field and provide a way to update it.
    const [password, setPassword] = useState("");

    //***const used for React Bootstrap modals popping up after a user signup, depending on the output of the signup operation. This code is related to ''const handleCloseModal = () => {'' and the modals block of codes below.
    const [showLoginFailedModal, setShowLoginFailedModal] = useState(false);

    const handleCloseModal = () => {
        setShowLoginFailedModal(false);
    };


    //***''const handleSubmit'' is declared and assigned an arrow function. This function takes an event parameter, which represents the form submission event.
    const handleSubmit = (event) => {
        //***''event.preventDefault'' prevents the default behavior of the form when submitted, which is to reload the entire page (when a form is submitted in a web app, it typically triggers a page refresh. However, in many cases, especially in single-page applications built with React, its better to handle form submissions without refreshing the page or navigating away to another URL).
        event.preventDefault();

        //***''const data'' is declared and assigned an object value with two properties: Username and Password. The purpose of this block of code is to create a data object that will be sent in the request to log in when making a POST request to the specified fetched URL.
        const data = {
            Username: username,
            Password: password
        };

        //***A fetch request is made to the URL below with a POST method and the request body being the (data) object from above with the two properties.
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/login", {
            method: "POST",
            //***headers property is an object that sets the request headers (here its sets the ''Content-Type'' header to ''application/json'', indicating that the data being sent in the request body is in JSON format).
            headers: {
                "Content-Type": "application/json"
            },
            //***The body property contains the (data) that will be sent with the request. It uses the JSON.stringify() to convert the data object to a JSON string before sending it in the request body.
            body: JSON.stringify(data)
        })
            //***.then() is a promise chained to the fetch request. It takes the response object returned by the server and calls the .json() method on it to transform the response content into a JSON object that can be used to extract the JWT (JSON Web Token) sent by the movie API.
            .then((response) => response.json())
            //***.then () is a promise that is chained to the previous .then(). It takes the received parsed JSON data as an argument (data) and performs the actions below on it.
            .then((data) => {
                //***Logs the ''Login response'' message along with the data received from the server request.
                console.log("Login response: ", data);
                //***''if (data.user)'' checks if the data object received from the API response (now in JSON format) has a truthy user property or not, and then performed actions accordingly.
                if (data.user) {
                    //***If data.user exists, it means the user object exists, so it is stored in the browser's localStorage. The localStorage is a web API that allows data to be stored in the browser's local storage area. Here, the user object is transformed to a JSON string using JSON.stringify() and then stored with the key ''user'' in the localStorage.
                    localStorage.setItem("user", JSON.stringify(data.user));
                    //***Idem to line above.
                    localStorage.setItem("token", data.token);
                    //***If data.user exists, onLoggedIn() function is called with the data.user and data.token as arguments. ''user'' and ''token'' can then be passed back to the ''MainView'' component so they can be used in all the subsequent API requests. This line is used to notify the ''MainView'' component that the user has successfully logged in (see ''if (!user)'' function in MainView component, and the logic related to it for a view of the commands it triggered).
                    onLoggedIn(data.user, data.token);
                } else {
                    //If (data.user) doesnt exist, the message ''No such user'' is displayed on the UI.
                    setShowLoginFailedModal(true);
                }
            })
            //***.catch() function is used to handle any errors that occur during the fetch request or any of the previous promises.
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    //***''return'' indicates the elements that will be returned as the output of the LoginView component. 
    //***These returned elements are designed using React Bootstrap.
    return (
        //***When the form is submitted, the ''handleSubmit'' function is call from the ''onSubmit'' form event. When a form is submitted, the handleSubmit function is executed, which performs the necessary logic (as definied in the ''const handleSubmit = (event) => {'' block of code above) for handling the form submission, such as preparing the data and making the POST request to the server.
        <Form onSubmit={handleSubmit} style={{ border: "1px solid red" }}>
            <div className="TitleDisplay">
                <h3>Welcome back!</h3>
                <h6>Ready for your next marathon?</h6>
            </div>
            <Form.Group controlId="formUsername" className="formGroupWithMargin">
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
            </Form.Group>

            <Form.Group controlId="formPassword" className="formGroupWithMargin">
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
            </Form.Group>
            <div className="LoginButtonContainer">
                <Button variant="primary" type="submit" className="LoginButton">
                    Log in
                </Button>
                {/* Modal popping up after failed signup because of en error */}
                <Modal show={showLoginFailedModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please check your username and/or password and try again. <br /> <br />
                        Not a user yet? <Link to="/signup">Sign up now.</Link>
                    </Modal.Body>
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