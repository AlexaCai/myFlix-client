import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import './movie-view.scss';


export const MovieView = ({ movies, user, updateFavoriteMovies }) => {


  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const token = localStorage.getItem("token");


  //***BOOTSTRAP elements for ADD MOVIE to favorite modal.
  const [showAddFavoriteModal, setShowAddFavoriteModal] = useState(false);
  const handleCloseAddFavoriteModal = () => setShowAddFavoriteModal(false);


  //***BOOTSTRAP elements for REMOVE MOVIE from favorite modal.
  const [showDeleteFavoriteModal, setShowDeleteFavoriteModal] = useState(false);
  const handleCloseDeleteFavoriteModal = () => setShowDeleteFavoriteModal(false);
  const handleShowDeleteFavoriteModal = () => setShowDeleteFavoriteModal(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);


  const isMovieInFavorites = user.FavoriteMovies.includes(movieId);


  const navigate = useNavigate();


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

      {/* Block of code to display all movie info */}
      <Row>
        <Col md={12} lg={6}>
          <div>
            <img src={movie.image} className="image-position" />
          </div>
        </Col>
        <Col md={12} lg={6} className="text-container">
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