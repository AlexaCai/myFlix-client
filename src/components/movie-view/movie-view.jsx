//***Import the PropTypes.
import PropTypes from "prop-types";

//***Import the UseParams Bootstrap component for log in form UI design.
import { useParams } from "react-router";

//***Import the Link Bootstrap component for log in form UI design.
import { Link } from "react-router-dom";

//***Import the Button Bootstrap component for log in form UI design.
import { Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <div>
    <div>
      <img className="w-100" src={movie.image} />
    </div>
    <div>
      <span>Title: </span>
      <span>{movie.title}</span>
    </div>
    <div>
      <span>Description: </span>
      <span>{movie.description}</span>
    </div>
    <div>
      <span>Genre: </span>
      <span>{movie.genre}</span>
    </div>
    <div>
      <span>Genre description: </span>
      <span>{movie.genreDescription}</span>
    </div>
    <div>
      <span>Director: </span>
      <span>{movie.director}</span>
    </div>
    <div>
      <span>Director bio: </span>
      <span>{movie.directorBio}</span>
    </div>
    <div>
      <span>Director birth: </span>
      <span>{movie.directorBirth}</span>
    </div>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
    </div>
  );
};