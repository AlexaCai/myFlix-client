//***Import different React built-in function.
import React from "react";
import PropTypes from "prop-types";

//***Import the different React Bootstrap components.
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import './movie-card.scss'; // Import the SCSS file

export const MovieCard = ({ movie }) => {
  return (
    <Card className="TopMargin">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card.Img variant="top" src={movie.image} />
      </Link>
      <Card.Body className="card-body-wrapper"> {/* Use the CSS class */}
      <Card.Title>{movie.title}</Card.Title> {/* Use the CSS class */}
      <Card.Text>{movie.genre}</Card.Text> {/* Use the CSS class */}
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">See detail</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//***Definition of all the props constraints for the MovieCard. The following block of code set the static PropTypes property on MovieCard to an object that contains special values provided as utilities by prop-types. These values help specify what the MovieCard props should look like.
MovieCard.propTypes = {
  //***The props object must include a movie object (shape({...}) means that it’s an object).
  movie: PropTypes.shape({
    //***Movie prop (object) must contain a title and an image (because of the .isRequiered at the end of each field). When a field is present but doesnt have ''isRequiered'' at the end, it MAY be passed in the prop (or not).
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};