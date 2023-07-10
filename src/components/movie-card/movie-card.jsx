//***Import the PropTypes.
import PropTypes from "prop-types";

//***''export'' keyword exposes the ''MovieCard'' component making it available for use by other components, modules, and files - possible to import in other files.
//***''const MovieCard'' (and the following codes) creates the MovieCard component. The function assigned to MovieCard returns the visual representation of the component (the function renders what is displayed on the screen). Inside this function is JSX.
//***The ''onMovieClick'' inside ({ movie, onMovieClick }) is a prop from main-view.jsx being extracted here using object destructuring.
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      //***A callback function is passed to onClick, then the logic (onMovieClick(movie);) that needed to execute once a click event is registered is added.
      //***<img src={movie.image} and {movie.title} specify what will be rendered on the UI for the MovieCard component (in this case, the image of eacch movie as well as their title).
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img src={movie.image}/>
      {movie.title}</div>
  );
};

//***Definition of all the props constraints for the MovieCard. The following block of code set the static PropTypes property on MovieCard to an object that contains special values provided as utilities by prop-types. These values help specify what the MovieCard props should look like.
MovieCard.propTypes = {
  //***The props object must include a movie object (shape({...}) means that it’s an object).
  movie: PropTypes.shape({
    //***Movie prop (object) must contain a title and an image (because of the .isRequiered at the end of each field). When a field is present but doesnt have ''isRequiered'' at the end, it MAY be passed in the prop (or not).
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  //***The props object must contain onMovieClick and it must be a function (this onMovieClick function is present in the main-view.jsx where the MovieCard is return).
  onMovieClick: PropTypes.func.isRequired
};