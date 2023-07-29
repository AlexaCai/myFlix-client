//***Import different React built-in function.
import { React } from "react";
import { useState } from "react";

//***Import another component of the app.
import { MovieCard } from "../movie-card/movie-card";

//***Import different React Bootstrap components.
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

//***Import the profile-view.scss to allow modiication to the React Bootstrap UI design.
import './profile-view.scss';

//***''const ProfileView'' is functional component, ''ProfileView'' being it's name. It is defined as an arrow function with four parameters, indicating it receives four props.
export function ProfileView({ movies, user, token, updateFavoriteMovies }) {


    //***Variables and secondary function for the UPDATE user command.


    //***For the USER UPDATE form - use to initiate all the fields of the form to empty at first.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    //***Logic to log out a user after updating his information, and bring the user back to the log in page.
    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        localStorage.removeItem("userToken");
        window.location.href = "/login";
    };

    //***BOOTSTRAP elements for the UPDATE user modals (after a user click the ''update'' button).
    const [responseMessage, setResponseMessage] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setResponseMessage("");
    };


    //***Variable and functions for the DELETE user command.


    //***BOOTSTRAP elements for DELETE user modal (after a user click the delete button).
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDeleteCloseModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);


    //***Variables and functions for the FAVORITE LIST command.


    //***Elements for favorite movies list.
    //***user.FavoriteMovies is an array that contains the IDs of the movies that the user has marked as favorites. Each element in this array represents a movie ID. The .map() method is used to iterate over each element (movie ID) in the user.FavoriteMovies array and create a new array.
    let favoriteMovies = user.FavoriteMovies.map((favoriteMovieId) =>
        //***For each favoriteMovieId, the .find() method is used to search the movies array for a movie that has an id matching the favoriteMovieId. The .find() method returns the first element that match (in this case, a movie whose ID matches favoriteMovieId). The resulting favoriteMovies array contains the movie objects that the user has marked as favorites, which can be used to display their favorite movies in the UI.
        movies.find((movie) => movie.id === favoriteMovieId));

    //***BOOTSTRAP elements for REMOVE movie from favorite modal (after a user click the update button).
    const [showRemoveFavoriteModal, setShowRemoveFavoriteModal] = useState(false);
    const handleCloseRemoveFavoriteModal = () => setShowRemoveFavoriteModal(false);
    const handleShowRemoveFavoriteModal = () => setShowRemoveFavoriteModal(true);
    const [selectedMovieId, setSelectedMovieId] = useState(null);


    //***Main logics for UPDATE user, DELETE user and FAVORITE MOVIE.


    //***Logic to allow the user to update his information.
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
                        setResponseMessage("Make sure you enter a username and email address that are not already used by another user, and that your email address is valid (such as exemple@abc.com).");
                        setShowErrorModal(true);
                    });
                } else {
                    setResponseMessage("Make sure you enter a username and email address that are not already used by another user, and that your email address is valid (such as exemple@abc.com).");
                    setShowErrorModal(true);
                }
            })
            .catch((error) => {
                console.error("Error updated user:", error);
                setResponseMessage("Make sure you enter a username and email address that are not already used by another user, and that your email address is valid (such as exemple@abc.com).");
                setShowErrorModal(true);
            });
    };

    //***Logic to allow the user to delete his information.
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

    //***Logic to allow the user to remove movies from his favorite list of movies.
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


    //***''return'' includes all the elements that will be returned as the output on the UI of the profile view page (ProfileView component). 
    //***These elements are designed using React Bootstrap.
    return (
        <Container>

            {/* USER INFO display*/}
            <Row className="justify-content-md-center styling-position">
                <Col md={12} lg={4} className="bordersUserInfo">
                    <br />
                    <h4>User info</h4>
                    <p>User: <strong>{user.Username}</strong></p>
                    <p>Email: <strong>{user.Email}</strong></p>
                    <p>If you wish to update your information, please fill in the update form. All fields must be completed.
                        <br />
                        <br />
                        If you only want to change some information, enter your current information you want to keep in the corresponding field (e.g. username) along with the information you want to change in the other field(s). <strong>Following successful update, you will be redirected to the log in page.</strong></p>
                </Col>

                {/* FORM to UPDATE user information */}
                <Col md={12} lg={4} className="bordersUserUpdate">
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
                            max={new Date().toLocaleDateString('en-CA')}
                            defaultValue=''
                            onChange={(e) => setBirthday(e.target.value)} />
                        <div>
                            {/* BUTTON to UPDATE user information */}
                            <Button variant="success" type="submit" className="update-button">
                                Update
                            </Button>
                        </div>
                    </Form>
                </Col>

                {/* MODAL to CONFIRM user UPDATE sucess */}
                <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update successful!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You will be redirected to the login page</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleCloseConfirmationModal}>
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
                        <Button variant="success" onClick={handleCloseErrorModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* BUTTON for user to DELETE account */}
                <Col md={12} lg={4} className="bordersUserDelete">
                    <br />
                    <h4>Delete account</h4>
                    <p>Want to leave us?
                        <br />
                        <br />
                        By deleting your account, your data will be permanently deleted, and you will have to create a new account if you wish to return.</p>
                    <Button variant="success" className="delete-button" onClick={handleShowDeleteModal}>
                        Delete
                    </Button>
                </Col>


                {/* MODAL to CONFIRM DELETE operation */}
                <Modal show={showDeleteModal} onHide={handleDeleteCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>You are about to delete your account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>This action is irreversible, are you sure you want to continue?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={handleDeleteCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>


            {/* LOGIC to display each FAVORITE MOVIES being in the user's favorite movie list */}
            <>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <h4>Favorite movies</h4>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    {favoriteMovies.length > 0 ? (
                        favoriteMovies.map((movie, index) => (
                            <Col xs={12} md={6} lg="3" key={movie.id} className="removeFavorite-button"
                            >
                                <MovieCard movie={movie} />
                                <div className="button-container">
                                    <Button variant="success"
                                        onClick={(event) => {
                                            setSelectedMovieId(movie.id);
                                            handleShowRemoveFavoriteModal();
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


            {/* MODAL to ask user for CONFIRMATION when clicking on ''remove from favorite'' button (to remove a movie from list of favorite) */}
            <Modal show={showRemoveFavoriteModal} onHide={handleCloseRemoveFavoriteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove from favorites</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this movie from your favorites?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handleCloseRemoveFavoriteModal}>
                        Cancel
                    </Button>
                    <Button variant="success"
                        onClick={(event) => {
                            deleteFavoriteMovie(event, selectedMovieId);
                            handleCloseRemoveFavoriteModal();
                        }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
}