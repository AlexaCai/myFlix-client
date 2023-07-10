//***Import React module and allows to use React's functionalities and components.
import { useState } from "react";

//***''const SignupView'' (and the following codes) creates the SignupView component. The function assigned to SignupView returns the visual representation of the component (the function renders what is displayed on the screen).
export const SignupView = () => {
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
                    alert("Signup successful");
                    window.location.reload();
                }
                else if (response.status === 409) {
                    alert("Username already exists");
                    //***If the response is negative, indicating a failed registration, an alert message is displayed saying "Signup failed".
                } else {
                    alert("Signup failed");
                }
            });
    };

    return (
        //***Form shown on the UI with the different field to complete when signing up.
        //***onSubmit={handleSubmit} is used to associate the handleSubmit function upper with the form submission event. When a form is submitted, the handleSubmit function is executed, which performs the necessary logic (as definied in the ''const handleSubmit = (event) => {'' block of code above) for handling the form submission, such as preparing the data and making the POST request to the server.
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
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
            </label>
            <label>
                Password:
                <input
                    //***Same logic as or Username field above.
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
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
            </label>
            <label>
                Birthday:
                <input
                    //***Same logic as or Username field above.
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </label>
            <button type="submit">Sign up</button>
        </form>
    );
};