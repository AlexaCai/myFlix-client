//***Import React module and allows to use React's functionalities and components.
import React from "react";

//***''useState'' is a React built-in function that allows to add state to a functional component.
import { useState } from "react";

//***''const LoginView'' (and the following codes) creates the LoginView component. This component is a functional component that receives props as its argument (onLoggedIn). This component will then be displayed in the UI when users are not logged in. 
export const LoginView = ({ onLoggedIn }) => {
    //***The two following const needs to go just after the ''export const LoginView'' line.
    //***This line declares a state variable username and a corresponding function setUsername to update its value. The initial value of username is an empty string (""). The purpose of this state variable is to keep track of the value entered in the username field and provide a way to update it.
    const [username, setUsername] = useState("");
    //*** This line declares a state variable password and a corresponding function setPassword to update its value. The initial value of password is an empty string (""). The purpose of this state variable is to keep track of the value entered in the password field and provide a way to update it.
    const [password, setPassword] = useState("");


    //***''const handleSubmit'' is declared and assigned an arrow function. This function takes an event parameter, which represents the form submission event.
    const handleSubmit = (event) => {
        //***''event.preventDefault'' prevents the default behavior of the form when submitted, which is to reload the entire page (when a form is submitted in a web app, it typically triggers a page refresh. However, in many cases, especially in single-page applications built with React, its better to handle form submissions without refreshing the page or navigating away to another URL).
        event.preventDefault();

        //***''const data'' is declared and assigned an object value with two properties: access and secret. The purpose of this block of code is to create a data object that will be sent in the request to log in when making a POST request to the specified fetched URL.
        const data = {
            access: username,
            secret: password
        };

        //***A fetch request is made to the URL below with a POST method and the request body being the (data) object.
        fetch("https://openlibrary.org/account/login.json", {
            method: "POST",
            body: JSON.stringify(data)
          }).then((response) => {
            //***The response from the request is checked using the ''ok'' property.
            if (response.ok) {
            //***If the response is successful, the ''onLoggedIn'' callback function is called with the username as an argument (and this callback is responsible for updating the user state variable in the MainView component, allowing to, accordingly, display all movies information).
              onLoggedIn(username);
            } else {
            //***If the response is not successful, an alert is displayed with the message ''Login failed''.
              alert("Login failed");
            }
          });
        };

    //***''return'' indicates the start of the code that will be returned as the output of the LoginView component. 
    return (
        //***Callback (handleSubmit) for the ''onSubmit'' form event. When the form is submitted, the ''handleSubmit'' function is be call, and this callback tells the Login API to validate username and password sent on the POST request.
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    //***Both username and setUsername come from useState() upper.
                    //***value attribute is set to the current value of the username state variable {username}, which is an empty string at the beginning (const [username, setUsername] = useState("");).
                    value={username}
                    //***The onChange event handler updates the username state variable with the new value (username) entered in the input field by the user (with ''e.target.value''). So, initially, the username input field is empty because the value attribute is set to an empty string. As the user types in the input field, the onChange event handler will update the username state variable, and consequently, the username state variable will no longer be an empty string, but will hold the current username value entered in the input field.
                    onChange={(e) => setUsername(e.target.value)}
                    //***Make sure a value in the username field of the form is required as an input from the user, otherwise UI will throws a ''Please fill out this field'' message.
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    //***Both password and setPassword come from useState() upper.
                    //***value attribute is set to the current value of the password state variable {password}, which is an empty string at the beginning (const [password, setPassword] = useState("");).
                    value={password}
                    //***The onChange event handler updates the password state variable with the new value (password) entered in the input field by the user (with ''e.target.value''). So, initially, the password input field is empty because the value attribute is set to an empty string. As the user types in the input field, the onChange event handler will update the password state variable, and consequently, the password state variable will no longer be an empty string, but will hold the current password value entered in the input field.
                    onChange={(e) => setPassword(e.target.value)}
                    //***Make sure a value in the password field of the form is required as an input from the user, otherwise will UI throws a ''Please fill out this field'' message.
                    required
                />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    );
};