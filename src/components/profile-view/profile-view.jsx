//***Import different React built-in function.
import React from "react";
import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

//***Import the different React Bootstrap components.
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import './profile-view.scss';

import axios from 'axios';

export function ProfileView({ movies, user, token, updateFavoriteMovies }) {
    //***Use to initiate all the field of the update form to empty as first.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    //***Bootstrap const for UPDATE user modal (after a user click the update button).
    const [responseMessage, setResponseMessage] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isUpdateConfirmed, setIsUpdateConfirmed] = useState(false);
    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setIsUpdateConfirmed(false);
        +        localStorage.removeItem("userToken");
        window.location.href = "/login";
    };
    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setResponseMessage("");
    };

    //***Bootstrap const for DELETE user modal (after a user click the delete button).
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //***Use to display movie added in the favorite movie list.
    let favoriteMovies = user.FavoriteMovies.map((favoriteMovieId) =>
        movies.find((movie) => movie.id === favoriteMovieId));

    //***Bootstrap const for REMOVE MOVIE from favorite modal (after a user click the update button).
    const [showDeleteFavoriteModal, setShowDeleteFavoriteModal] = useState(false);
    const handleCloseDeleteFavoriteModal = () => setShowDeleteFavoriteModal(false);
    const handleShowDeleteFavoriteModal = () => setShowDeleteFavoriteModal(true);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    //***Logic to allow user update his information.
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
                    setShowConfirmationModal(true);
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

    //***Logic to allow user delete his information.
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

    //***Logic to allow user update remove movie from his favorite list of movies.
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
                    updateFavoriteMovies(movieId, false);
                } else {
                    alert("Error - Movie has not been deleted from favorite");
                }
            });
    };

    return (
        <Container>
            <Row className="justify-content-md-center styling-position">
                {/* USER info display*/}
                <Col md={12} lg={4} style={{ border: "1px solid blue" }}>
                    <br />
                    <h4>User info</h4>
                    <p>User: {user.Username}</p>
                    <p>Email: {user.Email}</p>
                    <p>If you wish to update your information, please fill in the update form. All fields must be completed.
                        <br />
                        <br />
                        If you only want to change some information, enter your current information you want to keep in the corresponding field (e.g. username) along with the information you want to change in the other field(s).</p>
                </Col>

                {/* FORM to UPDATE user information */}
                <Col md={12} lg={4} style={{ border: "1px solid blue" }}>
                    <Form className='profile-form' onSubmit={handleUpdate}>
                        <br />
                        <h4>Update info</h4>
                        <label className="label">Username </label>
                        <input className="inputField"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="5"
                            pattern="[a-zA-Z0-9]+"
                            title="Username must consist of alphanumeric characters" />
                        <label className="label">Password </label>
                        <input className="inputField"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label className="label">Email </label>
                        <input className="inputField"
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
                        <label className="label">Birthday </label>
                        <input className="inputField"
                            type='date'
                            name='birthday'
                            defaultValue=''
                            onChange={(e) => setBirthday(e.target.value)} />
<div>
                        {/* BUTTON to UPDATE user information */}
                        <Button variant="primary" type="submit" className="update-button">
                            Update
                        </Button>
                        </div>
                    </Form>
                </Col>

                {/* MODAL to CONFIRM user UPDATE sucess */}
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

                {/* MODAL to display user UPDATE ERROR message */}
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


                {/* BUTTON for user to DELETE account */}
                <Col md={12} lg={4} style={{ border: "1px solid blue" }}>
                    <br />
                    <h4>Delete account</h4>
                    <p>Want to leave us?
                        <br />
                        <br />
                        By deleting your account, your data will be permanently deleted, and you will have to create a new account if you wish to return.</p>
                    <Button variant="primary" className="delete-button" onClick={handleShow}>
                        Delete
                    </Button>
                </Col>


                {/* MODAL to CONFIRM DELETE operation */}
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
            </Row>



            {/* LOGIC to display each FAVORITE MOVIES being in the user's favorite movie list */}
            <>
                <Row>
                    <Col style={{ border: "1px solid blue" }} className="d-flex justify-content-center align-items-center">
                        <h4>Favorite Movies</h4>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    {favoriteMovies.length > 0 ? (
                        favoriteMovies.map((movie, index) => (
                            <Col xs={12} md={6} lg="3" key={movie.id} className="removeFavorite-button"
                            >
                                <MovieCard movie={movie} />
                                <div className="button-container">
                                    <Button
                                        onClick={(event) => {
                                            setSelectedMovieId(movie.id);
                                            handleShowDeleteFavoriteModal();
                                        }}
                                    >
                                        Remove from favorite
                                    </Button>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <p>No favorite movies yet.</p>
                    )}
                </Row>
            </>



            {/* MODAL to ask user for CONFIRMATION when REMOVING movie from list of favorite */}
            <Modal show={showDeleteFavoriteModal} onHide={handleCloseDeleteFavoriteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Movie from favorites</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this movie from your favorites?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteFavoriteModal}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={(event) => {
                            deleteFavoriteMovie(event, selectedMovieId);
                            handleCloseDeleteFavoriteModal();
                        }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
}