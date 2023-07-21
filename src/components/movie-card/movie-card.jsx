//***Import different React built-in function.
import { React } from "react";
import { PropTypes } from "prop-types";

//***Import different React Bootstrap components.
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//***Import the movie-card.scss to allow modification to the React Bootstrap UI design.
import './movie-card.scss'; // Import the SCSS file

//***''const MoveCard'' is functional component, ''MovieCard'' being it's name. It is defined as an arrow function with one parameter, indicating it receives { movie } props.
export const MovieCard = ({ movie }) => {

  //***''return'' includes all the elements that will be returned as the output on the UI of the main view page (MainView component). 
  //***These elements are designed using React Bootstrap.
  return (
    //***The Card component in React Bootstrap is a customizable UI component that provides a container for displaying related information in a structured format.
    <Card className="TopMargin">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card.Img variant="top" src={movie.image} />
      </Link>
      <Card.Body className="card-body-wrapper"> {/* Use the CSS class */}
        <Card.Title>{movie.title}</Card.Title> {/* Use the CSS class */}
        <Card.Text>{movie.genre}</Card.Text> {/* Use the CSS class */}
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">See details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//***Definition of all the props constraints for the MovieCard. The following block of code set the static PropTypes property on MovieCard to an object that contains special values provided as utilities by prop-types. These values help specify what the MovieCard props should look like.
MovieCard.propTypes = {
  //***The props object must include a movie object ( shape({...}) means that it’s an object).
  movie: PropTypes.shape({
    //***Movie prop (object) must contain a title and an image (because of the .isRequiered at the end of each field).
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};