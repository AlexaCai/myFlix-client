//***Import different React built-in function.
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//***Import the different components of the app.
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

//***Import different React Bootstrap components.
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

//***Import the movie-card.scss to allow modification to the React Bootstrap UI design.
import './main-view.scss'; // Import the SCSS file

//***''const MainView'' is functional component, ''MainView'' being it's name. It is defined as an arrow function without any parameters, indicating it does not receive any props.
export const MainView = () => {

    //***''storedUser'' is declared to store the user data from the browser's localStorage (reminder: the user data have been stored previsouly in localStorage following a successful log in - see login-view.jsx). Since the data stored in localStorage is in string format, JSON.parse is used to convert it into a JavaScript object, then ''localStorage.getItem("user")'' is used to retrieve the value stored under the key "user" in the browser's localStorage. This allows to access the properties of the user object.
    const storedUser = JSON.parse(localStorage.getItem("user"));
    //***''storedToken'' is declared to store the token from the browser's localStorage (reminder: the token data have been stored previsouly in localStorage following a successful log in - see login-view.jsx). ''localStorage.getItem("token")'' is used to retrieve the value stored under the key "token" in the browser's localStorage.
    const storedToken = localStorage.getItem("token");
    //***This state holds the information about the currently logged-in user.
    const [user, setUser] = useState(null);
    //***This state stores the authentication token received from the server upon successful login.
    const [token, setToken] = useState(null);
    //***This state holds an array of movie objects fetched from the server.
    const [movies, setMovies] = useState([]);


    //***Logic for the ''filter movies'' button.


    //***Logic to filter movies based on genre.
    const [selectedGenres, setSelectedGenres] = useState([]);
    console.log(selectedGenres)
    const handleGenreChange = (genre) => {
        setSelectedGenres((prevGenres) =>
            prevGenres.includes(genre)
                ? prevGenres.filter((g) => g !== genre)
                : [...prevGenres, genre]
        );
    };

    //***Logic to filter movies based on directors.
    const [selectedDirectors, setSelectedDirectors] = useState([]);
    console.log(selectedDirectors)
    const handleDirectorChange = (director) => {
        setSelectedDirectors((prevDirectors) =>
            prevDirectors.includes(director)
                ? prevDirectors.filter((d) => d !== director)
                : [...prevDirectors, director]
        );
    };

    //***Used to display each filtered movie on the UI (when filter parameter(s) is/are activated).
    const [filteredMovies, setFilteredMovies] = useState([]);
    //***Used to save the first list of all movie fetched, so it can be re-used when user clear filters to show back again the whole list of movies (instead of fetching again the data from the API after for example).
    const [originalMovies, setOriginalMovies] = useState([]);

    //***This useEffect filter the array of fetched movies based on selected genres and directors, and it updates the filteredMovies state with the filtered results. If no filters are applied, it shows the entire list of movies.
    useEffect(() => {
        //***Filter movies based on selectedGenres and selectedDirectors.
        const filtered = movies.filter((movie) => {
            //***Check if a movie's genre is included in selectedGenres.
            const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);

            //***Check if a movie's director is included in selectedDirectors.
            const directorMatch = selectedDirectors.length === 0 || selectedDirectors.includes(movie.director);

            //***Return true if both genreMatch and directorMatch are true, meaning the movie matches the selected criteria.
            return genreMatch && directorMatch;
        });
        if (selectedGenres.length === 0 && selectedDirectors.length === 0) {
            //***If no filters are applied, show the whole list of movies.
            setFilteredMovies([]);
        } else {
            //***If filters are applied, set the filtered movies or an empty array if no movies match.
            setFilteredMovies(filtered);
        }
    }, [selectedGenres, selectedDirectors, movies]);

    //***Function the set everything back as their initial value (used for the ''clear filters'' button).
    const resetFilters = () => {
        setSelectedGenres([]);
        setSelectedDirectors([]);
        setFilteredMovies([]);
        setSelectedTitle("");
        setSearchResults([]);
        console.log('Original movies', originalMovies);
    };


    //***Logic for the search bar.


    //***const [selectedTitle, setSelectedTitle] holds the text (title) written by the user in the search bar.
    const [selectedTitle, setSelectedTitle] = useState('');
    console.log(selectedTitle)
    //***const [searchResults, setSearchResults] holds the movie matched with the title researched by the user if the search bar. If the user type an existing movie title, searchResult variable will take the value of this matching movie. If the user type an non-existing movie title, searchResult variable will stay as an empty array (no movie).
    const [searchResults, setSearchResults] = useState([]);
    console.log(JSON.stringify(searchResults, null, 2))

    //***Logic called when user click on the submit button beside the search bar in the navigation bar.
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        //***Convert the selectedTitle to lowercase for case-insensitive search.
        const lowerCaseSelectedTitle = selectedTitle.toLowerCase();
        // Determine which array to search in based on whether filters are applied or not
        const searchArray = selectedGenres.length > 0 || selectedDirectors.length > 0 ? filteredMovies : movies;
        // Perform the search logic based on the selectedTitle in the search bar (using lowercase comparison)
        const searchResult = searchArray.find((movie) => movie.title.toLowerCase() === lowerCaseSelectedTitle);
        if (searchResult) {
            setSearchResults([searchResult]);
        } else {
            setSearchResults([]);
        }
    };
    
    //***This useEffect is responsible for triggering the search logic whenever the user enters a new search query (updates selectedTitle). By doing this, it ensures that the search results are always up-to-date and displayed correctly in the UI, without requiring the user to click the "submit" button in the search bar twice.
    useEffect(() => {
        //***Convert the selectedTitle to lowercase for case-insensitive search.
        const lowerCaseSelectedTitle = selectedTitle.toLowerCase();
        //***Determine which array to search is to be based on whether filters are applied or not.
        const searchArray = selectedGenres.length > 0 || selectedDirectors.length > 0 ? filteredMovies : movies;
        //***Perform the search logic based on the selectedTitle in the search bar (using lowercase for none sensitive comparaison).
        const searchResult = searchArray.find((movie) => movie.title.toLowerCase() === lowerCaseSelectedTitle);
        if (searchResult) {
            setSearchResults([searchResult]);
        } else {
            setSearchResults([]);
        }
    }, [selectedTitle]);
    
    //***Function the set everything back as their initial value (used for the ''clear search'' button).
    const handleClearSearch = () => {
        setSelectedGenres([]);
        setSelectedDirectors([]);
        setFilteredMovies([])
        setSelectedTitle("");
        setSearchResults([]);
    };

    //***Function to allow user to set back the previous view when ''back'' button is clicked.
    const goBack = () => {
        setSelectedTitle("");
        setSearchResults([]);
        console.log('Original movies', originalMovies);
    };


    //***Logic for the updating favorite movies.


    //***This function is used to update the list of favorite movies for the currently logged-in user. It takes two parameters: movieId (the ID of the movie to add or remove from favorites) and isFavorite (a boolean logic indicating whether the movie is being added or removed from favorites). Depending on the ''isFavorite'', the function adds or removes the movieId to/from the user's list of favorite movies using the setUser function, which updates the user state containning an array of the favorite movies.
    const updateFavoriteMovies = (movieId, isFavorite) => {
        //***Checks if isFavorite is true. If the movie is being marked as a favorite, the code inside this block will be executed.
        if (isFavorite) {
            //***setUser is a function from the useState hook that allows updating the user state declared earlier. It is used here to update the list of favorite movies for the currently logged-in user. It takes a callback function as an argument (prevUser), and this callback function receives the previous state of the user as its argument. 
            setUser((prevUser) => ({
                //***The spread operator ... is used here to create a copy of the prevUser object. This copy means that it creates a new object with the same properties as prevUser.
                ...prevUser,
                //***This line updates the FavoriteMovies property of the new object created by the spread operator. The spread operator ...prevUser.FavoriteMovies is used to create a new array that contains all the elements from the previous FavoriteMovies array of prevUser. This is necessary to preserve any existing favorite movies before adding the new movieId. Then ''movieId'' appends the new movieId add to the favorite to the end of the newly created FavoriteMovies array, that still contains the previous movies inside the favorite list of movies.
                FavoriteMovies: [...prevUser.FavoriteMovies, movieId],
            }));
        } else {
            //***When isFavorite is false, it means the user want to remove a movie from his favorite list of movies. 
            setUser((prevUser) => ({
                ...prevUser,
                //***prevUser.FavoriteMovies represents the array of favorite movie IDs that the user currently has. The filter method is called on this array and creates a new array that only contains the elements for which the provided function (the arrow function (id) => id !== movieId) returns true. In this case, the arrow function checks each id in the FavoriteMovies array. If the id is not equal to movieId, it means it's not the movie we want to remove, so it returns true, and the id is kept in the new array. However, if the id is equal to movieId, it means it's the movie we want to remove, so it returns false, and the id is excluded from the new array. The result is a new array of favorite movies without the movie with movieId.
                FavoriteMovies: prevUser.FavoriteMovies.filter((id) => id !== movieId),
            }));
        }
    };


    //***Logic to fetch necessary data (users and movies).


    //***This useEffect is responsible for fetching movie data from the server when there is a valid token available (when the user is authenticated and logged in). After fetching the movie data, it transforms the API response into a format that the application can use and updates the movies state accordingly. The effect is triggered whenever the token state changes.
    useEffect(() => {
        //***Conditional logic that ensures that the useEffect is only executed if the token state is not null or undefined (when a user has logged in successfuly). If token is null or undefined (when a user has not logged in), the effect returns and nothing inside the useEffect is executed.
        if (!token) {
            return;
            //***If a token is present, the following ''else'' logic goes on.
        } else {
            //***Send a request to the specified URL to fetch movie data. It includes the Authorization header with the Bearer token value to authenticate the request, which is necessary, otherwise the server would send back ''unauthorized'' because of the backend configuration that requires a token to access movie data.
            fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies", {
                //***Send along the request to the URL the authorization token to access the movies data in the database.
                headers: { Authorization: `Bearer ${token}` }
            })
                //***Converts the response received back from the API to a JavaScript object using the json() method.
                .then((response) => response.json())
                //***After parsing to JSON the response data, the data received from the API is processed.
                .then((data) => {
                    console.log(data);
                    setOriginalMovies(data); // Save the original movie data
                    //***This maps over the data received from the API and transforms each movie object into a new object with selected properties (id, image, title, description, genre, genreDescription, director, directorBio, directorBirth).
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
                    console.log(moviesFromApi);
                    //***Updates the movies state from ''const [movies, setMovies] = useState([]);'' with the transformed movie data obtained from the API.
                    setMovies(moviesFromApi);
                    setOriginalMovies(moviesFromApi); // Update 'originalMovies' state with fetched data
                })
                //***Catches any errors that might occur during the fetch operation and log an error message to the console.
                .catch((error) => {
                    console.error("Error fetching movies:", error);
                });
        };
        //***[token] is a dependency array that controls when the useEffect should be executed. It specifies that the effect should be executed whenever the value of the token variable changes. If token remains the same between renders, the effect will not be executed repeatedly, preventing unnecessary network requests. By including [token] as a dependency, the useEffect is optimized to run only when token changes.
    }, [token]);


    //***This useEffect is responsible for fetching all user data from the server when there is a valid token available (when the user is authenticated). Then, it searches for the user object that corresponds to the currently logged-in user by comparing the ''storedUser'' object's ''Username'' with the ''Username'' properties of all user objects in received from the API. Once it identifies the logged-in user's data in the array from the API, it updates the user state with that specific user's data, allowing the app to have access to the logged-in user's data throughout the component and enables rendering specific views to the currently logged-in user. The useEffect is triggered whenever the token state changes.
    useEffect(() => {
        if (!token) {
            return;
        } else {
            fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    //***''const loggedInUser = ...'' uses the find method on the data array (the parsed API response) to search for a user whose Username property matches the Username property of the storedUser object. The storedUser object is obtained from the localStorage as defined earlier in this file.
                    const loggedInUser = data.find((user) => user.Username === storedUser.Username);
                    //***''setUser(loggedInUser);'' updates the User state from ''const [user, setUser] = useState(null);'' with the logged-in user data obtained from the API response. It uses the setUser function from the useState hook to update the User state.
                    //***By updating the User state, the component now has access to the data of the currently logged-in user, and it can display the user's information and control the rendering of different parts of the app accordingly.
                    setUser(loggedInUser);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        }
    }, [token]);


    //***Logic to return appropriate UI elements based on different conditions.


    //***''return'' includes all the elements that will be returned as the output on the UI of the main view page (MainView component). 
    //***These elements are designed using React Bootstrap.
    return (
        //***<BrowserRouter> is component from the react-router-dom library. It provides the routing functionality for the application, allowing different components to be rendered based on the current URL path.
        <BrowserRouter>
            <NavigationBar
                //***{user} is a prop called ''user'' and is passed to the NavigationBar component. The value of {user} is the current user value/state from ''const [user, setUser]'' , which at this point is an object containing the information about the logged-in user.
                user={user}
                //***{onLoggedOut} is another prop passed to the NavigationBar component. It is a function that is executed when the user clicks on a "Log out"  button (as defined on navigation-bar.jsx) to log out. In this case, the function sets the user state to null, which log out the user from the web app.
                onLoggedOut={() => {
                    setUser(null);
                }}
                selectedGenres={selectedGenres}
                setSelectedGenres={handleGenreChange}
                selectedDirectors={selectedDirectors}
                setSelectedDirectors={handleDirectorChange}
                selectedTitle={selectedTitle}
                setSelectedTitle={setSelectedTitle}
                handleSearchSubmit={handleSearchSubmit}
                resetFilters={resetFilters}
            />
            <Row className="justify-content-md-center">
                {/* <Routes> is used as a container for multiple <Route> components, and it defines the different routes that can be accessed in the application. */}
                <Routes>
                    {/* Route component has a path prop set to "/signup" so that this route will be active when the URL matches "/signup". */}
                    <Route
                        path="/signup"
                        /* Element prop of the Route is set to a JSX expression that will be rendered when the route is active (here are two other components passed to display views, instead of plain JSX content). Inside the element prop, there's a conditional statement. */
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col xs={9} sm={7} md={5} lg={4} xl={4} xxl={3} className="mx-auto">
                                        <SignupView />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col xs={10} sm={6} md={5} lg={4} xl={4} xxl={3} className="mx-auto">
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }} />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col>
                                        <MovieView user={user} movies={movies} updateFavoriteMovies={updateFavoriteMovies} referrer="/" />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users/:Username"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView user={user} movies={movies} token={token} updateFavoriteMovies={updateFavoriteMovies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {/* Redirect to login page if the user is not logged in */}
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <>
                                        {/* Logic to display revelant UI when a user make a search request without applying any filters on movies previoulsy */}
                                        {selectedGenres.length === 0 && selectedDirectors.length === 0 && selectedTitle && searchResults.length === 0 && (
                                            <div className="center-container">
                                                <Row>
                                                    <Col>
                                                        <div className="textMargin">
                                                            <h1>Oh.</h1>
                                                            <br />
                                                            <p>It seems like no movies match your search.</p>
                                                        </div>
                                                        <br />
                                                        <Button variant="danger" onClick={handleClearSearch}>
                                                            Clear search
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}

                                        {/* Logic to display revelant UI when a user make a search request while having applied filters on movies previoulsy - and the searched movie is not found in the filtered list of movies */}
                                        {(selectedGenres.length > 0 || selectedDirectors.length > 0) && selectedTitle && searchResults.length === 0 && (
                                            <div className="center-container">
                                                <Row>
                                                    <Col>
                                                        <div className="textMargin">
                                                            <h1>Oh.</h1>
                                                            <br />
                                                            <p>It looks like there are no movies matching your search within your filtered movie list.
                                                                <br />
                                                                <br />
                                                                Try searching for your movie without applying filters, as you'll search in a wider list of movies.</p>
                                                        </div>
                                                        <br />
                                                        <div className="buttonStylingContainerGroup1">
                                                            <Row>
                                                                <Button variant="danger" className="buttonStylingGroup1" onClick={handleClearSearch}>
                                                                    Clear filter(s)
                                                                </Button>
                                                            </Row>
                                                            <Row>
                                                                <Button variant="success" onClick={goBack} className="buttonStylingGroup1">
                                                                    Back
                                                                </Button>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}

                                        {/* Logic to display revelant UI when a user make a search request (while having applied filters on movies previoulsy or not) - and the searched movie is found */}
                                        {searchResults.map((movie) => (
                                            <Col xs={12} md={6} lg="3" key={movie.id}>
                                                 <MovieCard movie={movie} />
                                                <div className="buttonStylingContainerGroup2">
                                                    <Row>
                                                        <Button variant="danger" className="buttonStylingGroup2" onClick={handleClearSearch}>
                                                            Clear search
                                                        </Button>
                                                    </Row>
                                                    <Row>
                                                        <Button variant="success" className="buttonStylingGroup2" onClick={goBack}>
                                                            Back
                                                        </Button>
                                                    </Row>
                                                </div>
                                            </Col>
                                        ))}

                                        {/* Logic to display revelant UI when a user apply filters that doesnt match with any movies */}
                                        {!selectedTitle && filteredMovies.length === 0 && selectedGenres.length > 0 && selectedDirectors.length > 0 && (
                                            <>
                                                <div className="center-container">
                                                    <Row>
                                                        <Col>
                                                            <h1 className="textMargin">Oh.</h1>
                                                            <br />
                                                            <p>It seems like no movies match your filters.</p>
                                                            <p>Modify your filters to get more results, or delete them completely to return to the initial list of movies.</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </>
                                        )}

                                        {/* Show the "Clear Filters" button only when there's no value written in the search bar, and when there's at least one filter applied - Button used for different views */}
                                        {!selectedTitle && (selectedGenres.length > 0 || selectedDirectors.length > 0) ? (
                                            <div className="clear-filters-button-container">
                                                <Button variant="danger" onClick={resetFilters} className="clear-filters-button">
                                                    Clear filter(s)
                                                </Button>
                                            </div>
                                        ) : null}

                                        {/* Logic to display revelant UI when a user apply filters that doest match with some movies (matching movies are then shown) */}
                                        {!selectedTitle && filteredMovies.length > 0 && filteredMovies.map((movie) => (
                                            <Col xs={12} md={6} lg="3" key={movie.id}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}

                                        {/* Logic to show the original list of movies when there are no filters applied and no search element request from the search bar */}
                                        {!selectedTitle && selectedGenres.length === 0 && selectedDirectors.length === 0 && originalMovies.map((movie) => (
                                            <Col xs={12} md={6} lg="3" key={movie.id}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};


