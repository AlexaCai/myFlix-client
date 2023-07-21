//***Import different React built-in function.
import { useParams } from "react-router";
import { useState } from "react";

//***Import different React Bootstrap components.
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

//***Import the movie-view.scss to allow modiication to the React Bootstrap UI design.
import './movie-view.scss';

//***''const MoveView'' is functional component, ''MovieView'' being it's name. It is defined as an arrow function with three parameter, indicating it receives three props.
export const MovieView = ({ movies, user, updateFavoriteMovies }) => {

  //***This line uses the useParams hook from React Router. The useParams hook allows the component to access the parameters present in the URL. In this case, it is extracting the movieId parameter from the URL, which is a unique identifier for the specific movie being viewed.
  const { movieId } = useParams();
  //***This line uses the find method on the movies array received as prop to search for a movie in the array with an id that matches the extracted movieId from useParams. The find method returns the first element in the array that satisfies movieId in the URL. 
  const movie = movies.find((m) => m.id === movieId);
  //***This line retrieves the token from the browser's localStorage.
  const token = localStorage.getItem("token");

  //***BOOTSTRAP elements for ADD MOVIE to favorite modal (after a user click the ''add to favorite'' button).
  const [showAddFavoriteModal, setShowAddFavoriteModal] = useState(false);
  const handleCloseAddFavoriteModal = () => setShowAddFavoriteModal(false);

  //***BOOTSTRAP elements for REMOVE MOVIE from favorite modal (after a user click the ''remove from favorite'' button).
  const [showDeleteFavoriteModal, setShowDeleteFavoriteModal] = useState(false);
  const handleCloseDeleteFavoriteModal = () => setShowDeleteFavoriteModal(false);
  const handleShowDeleteFavoriteModal = () => setShowDeleteFavoriteModal(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  //***Used to check if the movie the user wants to add/remove to/from his favorite is already in his list of favorite or not (necessary to display the right ''add to favorite'' or ''remove from favorite'' button under the movie).
  const isMovieInFavorites = user.FavoriteMovies.includes(movieId);

  //***Used to navigate back to the previous page (used in the profile view, so when a user click on one of his favorite movie to see detail and then click back, user is brought back to profile view, and not to home).
  const navigate = useNavigate();

  //***Logic used to add a movie to the list of favorite movies.
  const addFavoriteMovie = (event, movieId) => {
    event.preventDefault();
    fetch(`https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          setShowAddFavoriteModal(true);
          updateFavoriteMovies(movieId, true);
        } else {
          alert("Error - Movie has not been added to favorite");
        }
      });
  };

  //***Logic used to remove a movie from the list of favorite movies.
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


  //***''return'' includes all the elements that will be returned as the output on the UI of the Log in page (MovieView component). 
  //***These elements are designed using React Bootstrap.
  return (
    <Container>

      {/* Block of code to display all movie info */}
      <Row>
        <Col md={12} lg={6} style={{ border: "1px solid green" }}>
          <div>
            <img src={movie.image} className="image-position" />
          </div>
        </Col>
        <Col md={12} lg={6} className="text-container" style={{ border: "1px solid blue" }}>
          <div className="text-position">
            <div className="titles">
              <span className="text-position">Title</span>
            </div>
            <div>
              <span>{movie.title}</span>
            </div>
            <div className="titles">
              <span>Description </span>
            </div>
            <div>
              <span>{movie.description}</span>
            </div>
            <div className="titles">
              <span>Genre </span>
            </div>
            <div>
              <span>{movie.genre}</span>
            </div>
            <div className="titles">
              <span>Genre description </span>
            </div>
            <div>
              <span>{movie.genreDescription}</span>
            </div>
            <div className="titles">
              <span>Director </span>
            </div>
            <div>
              <span>{movie.director}</span>
            </div>
            <div className="titles">
              <span>Director bio </span>
            </div>
            <div>
              <span>{movie.directorBio}</span>
            </div>
            <div className="titles">
              <span>Director birth </span>
            </div>
            <div>
              <span>{movie.directorBirth}</span>
            </div>
          </div>

          {/* Block of code for the ''add to favorite'', the ''remove from favorite'' and the ''back'' button. The ''add to favorite'' and ''remove from favorite'' buttons have a conditional logic (!isMovieInFavorites && and isMovieInFavorites &&) that allow the ''add to favorite'' button to be shown only when the movie is not in the favorite list, and the ''remove from favorite'' button to be shown only when the movie is in the favorite list.) */}
          {!isMovieInFavorites && (
            <Button variant="success" className="addFavorite-button custom-button" onClick={(event) => addFavoriteMovie(event, movie.id)}>
              Add to favorite
            </Button>
          )}
          {isMovieInFavorites && (
            <Button variant="success" className="deleteFavorite-button custom-button" onClick={(event) => {
              setSelectedMovieId(movie.id);
              handleShowDeleteFavoriteModal();
            }}>
              Remove from favorite
            </Button>
          )}
          <div className="back-button custom-button">
            <Link to={`/`} className="back-button custom-button">
              <Button variant="success" onClick={() => navigate(-1)}>Back</Button>
            </Link>
          </div>

        </Col>
      </Row>

      {/* MODAL for CONFIRMATION when a user added sucessfully a movie to his list of favorite */}
      <Modal show={showAddFavoriteModal} onHide={handleCloseAddFavoriteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Movie has been added successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You can view your list of favorite movies in your profile page.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseAddFavoriteModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL to ask for a confirmation when a user click on ''remove from favorite'' button to remove a movie from his list of favorite */}
      <Modal show={showDeleteFavoriteModal} onHide={handleCloseDeleteFavoriteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove movie from favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this movie from your favorites?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleCloseDeleteFavoriteModal}>
            Cancel
          </Button>
          <Button variant="success"
            onClick={(event) => {
              deleteFavoriteMovie(event, selectedMovieId);
              handleCloseDeleteFavoriteModal();
            }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};