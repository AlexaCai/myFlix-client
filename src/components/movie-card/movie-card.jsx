import { React } from "react";
import { PropTypes } from "prop-types";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';


export const MovieCard = ({ movie }) => {

  
  return (
    <Card className="TopMargin">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card.Img variant="top" src={movie.image} />
      </Link>
      <Card.Body className="card-body-wrapper"> 
        <Card.Title>{movie.title}</Card.Title> 
        <Card.Text>{movie.genre}</Card.Text> 
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">See details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};