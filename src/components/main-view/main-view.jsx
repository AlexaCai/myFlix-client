//***''useState'' is a special function provided by React, allowing to create and initialize a new state for a component.
import { useState } from "react";

//***Import the ''MovieCard'' child component into the current file/component ''MainView'' so that it can use it here.
import { MovieCard } from "../movie-card/movie-card";

//***Import the ''MovieView'' child component into the current file/component ''MainView'' so that it can use it here.
import { MovieView } from "../movie-view/movie-view";

//***''export'' exposes the ''MainView'' component making it available for use by other components, modules, and files - possible to import in other files.
//***''const MainView'' (and the following codes) creates the MainView component. The lines after ''const MainView'' is the function assigned to MainView that returns the visual representation of the component (the function renders what is displayed on the screen). Inside this function is JSX.
export const MainView = () => {
    //***''useState()'' function (imported from React) is called with an empty array ''useState([])'' at first. This assigns/initialized the current state value (empty array) to the ''movies'' variable (the ''movies'' variable being the first element in ''const [movies, setMovies] = useState([]);''). The current state value is what is initially given to useState() - here being an empty array. A method that updates the ''movies'' variable is assigned also to ''setMovies''.
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Jaws",
            description: "Jaws stars Roy Scheider as police chief Martin Brody, who, with the help of a marine biologist (Richard Dreyfuss) and a professional shark hunter (Robert Shaw), hunts a man-eating great white shark that attacks beachgoers at a summer resort town.",
            genre: "Thriller",
            genreDescription: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
            director: "Steven Spielberg",
            directorBio: "Steven Spielberg is an American filmmaker and a major figure of the New Hollywood era.",
            directorBirth: "1946-12-18",
            directorDeath: "NA",
            image:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lxM6kqilAdpdhqUl2biYp5frUxE.jpg",
        },
        {
            id: 2,
            title: "Gladiator",
            description: "Gladiator is a 2000 epic historical drama film.",
            genre: "Drama",
            genreDescription: "Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
            director: "Ridley Scott",
            directorBio: "Ridley Scott is an English film director and producer.",
            directorBirth: "1937-11-30",
            directorDeath: "NA",
            image:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
        },
        {
            id: 3,
            title: "The godfather",
            description: "This movie is about the Corleone family under patriarch Vito Corleone from 1945 to 1955. It focuses on the transformation of his youngest son, Michael Corleone, from reluctant family outsider to ruthless mafia boss.",
            genre: "Crime",
            genreDescription: "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre.",
            director: "Francis Ford Coppola",
            directorBio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s.",
            directorBirth: "1939-04-07",
            directorDeath: "NA",
            image:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        }
    ]);

    //***Way to identify whether there was a user click on a MovieCard or not. The ''useState(null);'' tells the app that no movie cards were clicked. However, if a user were to click on a movie card, the app would need to update the selectedMovie state to refer to the movie object that was clicked, thus inducing the app to render that movie’s details.
    const [selectedMovie, setSelectedMovie] = useState(null);

    //***To determine whether to render a specific part of the UI (MovieView) in the MainView component, a new state (selectedMovie) as a flag is added.
    if (selectedMovie) {
        return (
            //***When a movie is clicked on MovieView movie={selectedMovie} is activated and the movie details are shown from movie-view.jsx.
            //***The code onBackClick={() => setSelectedMovie(null)} adds the ''onBackClick'' logic (from movie-view.jsx) in main-view.jsx (current file) that sets selectedBook back to its initial state value (null) when the button ''back'' is clicked. This make the movie-view window with more details closes and go back to the main view with the movie cards.
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list of movies is empty!</div>;
    }

    return (
        //***The .map() method in the code below maps each element in the movies array to a piece of UI. So, after its execution, there will be one <MovieCard /> for each movie. 
        <div>
            {movies.map((movie) => {
                //***''return <MovieCard ... />'' uses right here the ''MovieCard'' child component imported upper in this file.
                //***The ''movie'' object from each iteration of the map() function (so each object in the useState array in this file) is passed inside the child component <MovieCard />. This is done by adding a custom attribute before /> and setting its value to ''movie'' (movie={movie}). This kind of attribute is special (it’s how to pass data to a child component - in React, this type of attribute is referred to as props). However, its still required to extract that data WITHIN the MovieCard component in movie-card.jsx (via accessing the props argument) so these data can used there. Both operations (in this file and in movie-card.jsx) are required to make it works.
                return <MovieCard
                    key={movie.id}
                    movie={movie}
                    //***Listening for click events in React can be done by using a special attribute ''onClick''. This attribute accepts a function, and this function will be the callback once the element is clicked (the function contains the logic to be executed whenever a click is registered).
                    //***Here a function as a prop called ''onMovieClick'' has been passed. It has a function with one parameter that represents the movie to be set to selectedMovie state. To make this work, its also important to make sure that the ''onMovieClick'' prop is extracted in the movie-card.jsx, using object destructuring.
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            })}
        </div>
    );
}