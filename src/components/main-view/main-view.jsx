//***''useState'' is a React built-in function that allows to add state to a functional component.
import { useState } from "react";

//***''useEffect'' is a React built-in function that allows to perform side effects in functional components (such as fetching data).
import { useEffect } from "react";

//***Import the ''MovieCard'' child component into the current file/component ''MainView'' so that it can use it here.
import { MovieCard } from "../movie-card/movie-card";

//***Import the ''MovieView'' child component into the current file/component ''MainView'' so that it can use it here.
import { MovieView } from "../movie-view/movie-view";

//***Import the ''LoginView'' child component into the current file/component ''MainView'' so that it can use it here.
import { LoginView } from "../login-view/login-view";

//***Import the ''SignupView'' child component into the current file/component ''MainView'' so that it can use it here.
import { SignupView } from "../signup-view/signup-view";

//***''export'' keyword exposes the ''MainView'' component making it available for use by other components, modules, and files - possible to import in other files.
//***''const MainView'' (and the following codes) creates the MainView component. The lines after ''const MainView'' is the function assigned to MainView that returns the visual representation of the component (the function renders what is displayed on the screen). Inside this function is JSX.
export const MainView = () => {

    //***
    const storedUser = JSON.parse(localStorage.getItem("user"));

    //***
    const storedToken = localStorage.getItem("token");

    //***Way to identify whether a user has logged in or not. The ''useState(null);'' tells the app that user is not logged in at first. However, if a user were to log in, the app would renders the normal view with all the movie info (MainView with MovieCard in it, and MovieView once a MovieCard is being clicked on).
    const [user, setUser] = useState(null);

    //***This line declares a state variable token using the useState hook (it initializes the token with a value of null). The setToken function allows you to update the value of the token state variable.
    const [token, setToken] = useState(null);

    //***'Wihtin the ''useState([])'' array are the objects of the ''movies'' variable (the ''movies'' variable being the first element in ''const [movies, setMovies] = useState([]);''). 
    const [movies, setMovies] = useState([]);

    //***Way to identify whether there was a user click on a MovieCard or not. The ''useState(null);'' tells the app that no movie cards were clicked. However, if a user were to click on a movie card, the app would need to update the selectedMovie state to refer to the movie object that was clicked, thus inducing the app to render that movie’s details.
    const [selectedMovie, setSelectedMovie] = useState(null);

    //***Used to fetch the list of movies from the ''movie_api'' and processes the response to extract relevant information. It runs only once, because of the empty dependency array [], indicating that there are no dependencies for this effect.
    useEffect(() => {
        //***Fetch() used to make a GET request to the URL (this API endpoint retrieves JSON data containing information about movies).
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies")
            //***.then() is chained to the fetch() call and handles the response received from the fetch() by calling response.json() to parse the response body as JSON data.
            .then((response) => response.json())
            //***.then() is chained to the previous one. It receives the parsed JSON data as (data). The data is processed here to extract relevant information from each movie.
            .then((data) => {
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        image: movie.ImagePath,
                        title: movie.Title,
                        description: movie.Description,
                        genre: movie.Genre.Name,
                        genreDescription: movie.Genre.Description,
                        director: movie.Director.Name,
                        directorBio: movie.Director.Bio,
                        directorBirth: movie.Director.Birth
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    //***This useEffect fetches movies from the API /movies endpoint when the token state changes (so when its not null anymore, meaning a request have been sent with an valid token, authorizing the server to give back the response).
    useEffect(() => {

        if (!token)
            //***If the token is ''null'' (no token), the function does not execute the API call. This ensure that the API call is only made when a valid token is present
            return;

        //***If the token other than ''null'', the code makes a fetch request to the specified URL "https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies" and includes the Authorization header with the Bearer token to authenticate the request.
        fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            //***Once the response is received, the code parses the response body as JSON using the response.json() method.
            .then((response) => response.json())
            //***Response receive is transformed to (data), which is then console logged.
            .then((data) => {
                console.log(data);
            });
    }, [token]);

    //***If the user is not logged in (!user) (so if the user state is still at ''null'' like defined as his initial value in the ''const [user, setUser] = useState(null);'' upper), the component ''LoginView'' showning the form to log in (username and password) is shown on the UI, allowing the user to log in. If the user is logged in, this component ''LoginView'' won't show up on the UI (because ''user'' still won't be null), so this component will be ignored and the rest of the movie information will be shown instead (MainView, MovieCard, MovieView).
    if (!user) {
        //***By passing the ''onLoggedIn'' prop with the callback function ''(user, token) => => {setUser (user); setToken(token); }}'' to the ''LoginView'' component, ''MainView'' component establishes a communication channel to receive the logged-in user data from LoginView component (by calling the setUser and setToken function , the const [user, setUser] = useState(null) and const [token, setToken] = useState(null) state variables in the MainView component are updated with the logged-in user data). This enables the login process within the ''LoginView'' component to update the user and token state variables in the MainView component (current file), providing access to all the logged-in user's movie data.
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        );
    }

    if (movies.length === 0) {
        return <div>The list of movies is empty!</div>;
    }

    //***To determine whether to render a specific part of the UI (MovieView), a new state (selectedMovie) as a flag is added.
    if (selectedMovie) {
        return (
            //***Addition of a ''logout'' button with an ''onClick'' handler, which resets the user state variable to null (and so brings the UI back to the login page).
            //***When a movie is clicked on, ''MovieView movie={selectedMovie}'' is activated and the movie details are shown from movie-view.jsx.
            //***The code ''onBackClick={() => setSelectedMovie(null)}'' adds the ''onBackClick'' logic (from movie-view.jsx) in main-view.jsx (current file) that sets selectedBook back to its initial state value (null) when the button ''back'' is clicked. This make the movie-view window with more details closes and bring the interface back to the main view with the movie cards.
            <>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null); 
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
            </>
        );
    }

    return (
        //***Addition of a ''logout'' button with an ''onClick'' handler, which resets the user state variable to null (and so brings the UI back to the login page).
        //***The .map() method in the code below maps each element in the movies array to a piece of UI. So, after its execution, there will be one <MovieCard /> for each movie. 
        <>
            <div>
                {movies.map((movie) => {
                    //***''return <MovieCard ... />'' uses right here the ''MovieCard'' child component imported upper in this file.
                    //***The ''movie'' object from each iteration of the map() function (so each movie object in the useState array in this file) is passed inside the child component <MovieCard />. This is done by adding a custom attribute before /> and setting its value to ''movie'' (movie={movie}). This kind of attribute is special (it’s how data are passed to a child component - in React, this type of attribute is referred to as props). However, it is still required to extract that data WITHIN the MovieCard component in movie-card.jsx (via accessing the props argument) so these data can used there. Both operations (in this file and in movie-card.jsx) are required to make it works.
                    return <MovieCard
                        key={movie._id}
                        movie={movie}
                        //***Listening for click events in React can be done by using a special attribute ''onClick''. This attribute accepts a function, and this function will be the callback once the element is clicked (the function contains the logic to be executed whenever a click is registered).
                        //***Here a function as a prop called ''onMovieClick'' is presents. It has one parameter that represents the movie to be set to selectedMovie state. To make this work, its also important to make sure that the ''onMovieClick'' prop is extracted in the movie-card.jsx, using object destructuring.
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                })}
            </div>
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null); 
                    localStorage.clear();
                }}
            >
                Logout
            </button>
        </>
    );
}