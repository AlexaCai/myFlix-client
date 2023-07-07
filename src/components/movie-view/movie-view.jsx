//***Import the PropTypes.
import PropTypes from "prop-types";

//***''export'' keyword exposes the ''MovieView'' component making it available for use by other components, modules, and files - possible to import in other files.
//***''const MovieView'' (and the following codes) creates the MovieView component. The function assigned to MovieView returns the visual representation of the component (the function renders what is displayed on the screen). Each information displayed in this file are taken from/linked to the main-view.jsx. For exemple, to display the title of a movie, the code <span>{movie.title}</span> is used, and this code refers to each movie object (and their title more precisely) inside the ''movies'' array present in the main-view.jsx.
//***''onBackClick'' in ({ movie, onBackClick }) is exported here to be used in main-view.jsx, and to add there the logic allowing to go back after clicking on a movie for more details (return to main-view and movie-cards). The code below ''<button onClick={onBackClick}>Back</button>'' calls the function prop ''onBackClick'' when the button click occurs.
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

//***Definition of all the props constraints for the MovieCard. The following block of code set the static PropTypes property on MovieCard to an object that contains special values provided as utilities by prop-types. These values help specify what the MovieCard props should look like.
MovieView.propTypes = {
  //***The props object must include a movie object (shape({...}) means that it’s an object).
  movie: PropTypes.shape({
    //***Movie prop (object) must contain a title and an image (because of the .isRequiered at the end of each field). When a field is present but doesnt have ''isRequiered'' at the end, it MAY be passed in the prop (or not).
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    genreDescription: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    directorBio: PropTypes.string.isRequired,
    directorBirth: PropTypes.string.isRequired
  }).isRequired,
  //***The props object must contain onMovieClick and it must be a function (this onMovieClick function is present in the main-view.jsx where the MovieCard is return).
  onBackClick: PropTypes.func.isRequired
};