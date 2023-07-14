//***Import React module and allows to use React's functionalities and components.
import React from "react";

//***Import the PropTypes.
import PropTypes from "prop-types";

//***Import the Card Bootstrap component for log in form UI design.
import { Card } from "react-bootstrap";

//***Import the Button Bootstrap component for log in form UI design.
import { Button } from "react-bootstrap";

//***Import the Link Bootstrap component for log in form UI design.
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
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