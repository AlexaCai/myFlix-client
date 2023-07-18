import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './profile-view.scss';
import axios from 'axios';

export function ProfileView({ movies, user, token }) {

    //For React Bootstrap Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("All Movies:", movies);
    let favoriteMovies = user.FavoriteMovies.map((favoriteMovieId) =>
        movies.find((movie) => movie.id === favoriteMovieId));

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

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
                    alert("Update successful");
                    window.location.reload();
                } else if (response.status === 409) {
                    response.text().then((text) => {
                        // Display the plain text response.
                        alert(text);
                    }).catch((error) => {
                        // If there is an error reading the response, show a generic "Signup failed" alert.
                        console.error("Error reading response data:", error);
                        alert("Update failed");
                    });
                } else {
                    // For other error codes, show a generic "Signup failed" alert.
                    alert("Update failed");
                }
            })
            .catch((error) => {
                console.error("Error updated user:", error);
                alert("Update failed");
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
                    type='email'
                    name='email'
                    defaultValue=''
                    onChange={(e) => setEmail(e.target.value)} />
                <label>Birthday: </label>
                <input
                    type='date'
                    name='birthday'
                    defaultValue=''
                    onChange={(e) => setBirthday(e.target.value)} />
                <Button variant='primary' type='submit'>
                    Update
                </Button>
            </Form>

            <div>
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
            </div>

            <div>
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

            {/* Other sections and closing tags */}
        </div>
    );
}