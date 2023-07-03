import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
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
            directorDeath: "-",
            image:
                "https://www.imdb.com/title/tt0073195/mediaviewer/rm1449540864/?ref_=tt_ov_i",
        },
        {
            id: 2,
            title: "Gladiator",
            description: "Gladiator is a 2000 epic historical drama film.",
            genre: "Drama",
            director: "Ridley Scott",
            image:
                "https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592/?ref_=tt_ov_i",
        },
        {
            id: 3,
            title: "The godfather",
            description: "This movie is about the Corleone family under patriarch Vito Corleone from 1945 to 1955. It focuses on the transformation of his youngest son, Michael Corleone, from reluctant family outsider to ruthless mafia boss.",
            genre: "Crime",
            director: "Francis Ford Coppola",
            image:
                "https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i",
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list of movies is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
