//***Import different React built-in function.
import { useParams } from "react-router";

//***Import the different React Bootstrap components.
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import './movie-view.scss'; // Import the SCSS file

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

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
          alert("Movie has been added to favorite");
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
          alert("Movie has been deleted from favorite");
        } else {
          alert("Error - Movie has not been deleted from favorite");
        }
      });
  };

  return (
    <div className="image-position">
      <div>
        <img src={movie.image} />
      </div>
      <div className="text-position">
      <div className="titles">
        <span className="text-position">Title </span>
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
      <Button className="addFavorite-button" onClick={(event) => addFavoriteMovie(event, movie.id)}>Add to favorite</Button>
      <Button className="deleteFavorite-button" onClick={(event) => deleteFavoriteMovie(event, movie.id)}>Delete from favorite</Button>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
    </div >
  );
};