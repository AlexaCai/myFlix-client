//***''export'' exposes the ''MovieCard'' component making it available for use by other components, modules, and files - possible to import in other files.
//***''const MovieCard'' (and the following codes) creates the MovieCard component. The function assigned to MovieCard returns the visual representation of the component (the function renders what is displayed on the screen). Inside this function is JSX.
//***The ''onMovieClick'' inside ({ movie, onMovieClick }) is a prop from main-view.jsx being extracted here using object destructuring.
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
    //***A callback function is passed to onClick, then the logic (onMovieClick(movie);) that's needed to execute once a click event is registered is added.
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}</div>
  );
};