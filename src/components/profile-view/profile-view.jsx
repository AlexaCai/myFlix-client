import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './profile-view.scss';
import axios from 'axios';

export function ProfileView({ movies, user, token }) {

    //***Use to initiate all the field of the update form to empty as first.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    //***Bootstrap const for update modal (after a user click the sign up button).
    const [responseMessage, setResponseMessage] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isUpdateConfirmed, setIsUpdateConfirmed] = useState(false);

    //***Bootstrap const for update modal (after a user click the sign up button).
    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setIsUpdateConfirmed(false); // Reset the update confirmation status
        +        localStorage.removeItem("userToken");
        window.location.href = "/login";
    };

    //***Bootstrap const for update modal (after a user click the sign up button).
    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setResponseMessage("");
    };

    //***Bootstrap const for delete modal (after a user click the delete button).
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //***Use to display movie added in the favorite movie list.
    let favoriteMovies = user.FavoriteMovies.map((favoriteMovieId) =>
        movies.find((movie) => movie.id === favoriteMovieId));

    const handleUpdate = (event) => {
        event.preventDefault();
        const userData = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        fetch(`https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(userData),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    setResponseMessage("Update successful");
                    setShowConfirmationModal(true); // Show the confirmation modal on successful update
                } else if (response.status === 409) {
                    response.text().then((text) => {
                        setResponseMessage(text);
                        setShowErrorModal(true);
                    }).catch((error) => {
                        console.error("Error reading response data:", error);
                        setResponseMessage("Update failed");
                        setShowErrorModal(true);
                    });
                } else {
                    setResponseMessage("Update failed");
                    setShowErrorModal(true);
                }
            })
            .catch((error) => {
                console.error("Error updated user:", error);
                setResponseMessage("Update failed");
                setShowErrorModal(true);
            });
    };

    const handleDelete = () => {
        fetch(`https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    alert("Error - account not deleted");
                }
            })
            .catch((error) => {
                console.error("Error deleting account:", error);
                alert("An error occurred while deleting the account");
            });
    };

    const deleteFavoriteMovie = (event, movieId) => {
        event.preventDefault();
        fetch(`https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    alert("Movie has been deleted from favorite");
                    window.location.reload();
                } else {
                    alert("Error - Movie has not been deleted from favorite");
                }
            });
    };

    return (
        <div>
            <h4>Info</h4>
            <p>User: {user.Username}</p>
            <p>Email: {user.Email}</p>

            <Form className='profile-form' onSubmit={handleUpdate}>
                <h4>Update info</h4>
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                    pattern="[a-zA-Z0-9]+"
                    title="Username must consist of alphanumeric characters" />
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <label>Email: </label>
                <input
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
                    title="Please enter a valid email address" />
                <label>Birthday: </label>
                <input
                    type='date'
                    name='birthday'
                    defaultValue=''
                    onChange={(e) => setBirthday(e.target.value)} />

                <Button variant="primary" type="submit">
                    Update
                </Button>

                {/* Modal to confirm update */}
                <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update succesful!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You will be redirected to the login page</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseConfirmationModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal to display the error message */}
                <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{responseMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseErrorModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>


            <h4>Delete account</h4>
            <Button variant="primary" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>You are about to delete your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action is irreversible, are you sure you want to continue?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

                <h4>Favorite Movies</h4>
                {favoriteMovies.length > 0 ? (
                    favoriteMovies.map((movie) => (
                        <div key={movie._id}>
                            <img src={movie.image} />
                            <h4>{movie.title}</h4>
                            <Button
                                className="deleteFavorite-button"
                                onClick={(event) => deleteFavoriteMovie(event, movie.id)}
                            >
                                Delete from favorite
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No favorite movies yet.</p>
                )}
        </div>
    );
}