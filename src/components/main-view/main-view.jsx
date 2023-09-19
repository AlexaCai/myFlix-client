import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './main-view.scss';


export const MainView = () => {


    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [movies, setMovies] = useState([]);


    //***Logic for the ''filter movies'' button.


    const [selectedGenres, setSelectedGenres] = useState([]);
    const handleGenreChange = (genre) => {
        setSelectedGenres((prevGenres) =>
            prevGenres.includes(genre)
                ? prevGenres.filter((g) => g !== genre)
                : [...prevGenres, genre]
        );
    };


    const [selectedDirectors, setSelectedDirectors] = useState([]);
    const handleDirectorChange = (director) => {
        setSelectedDirectors((prevDirectors) =>
            prevDirectors.includes(director)
                ? prevDirectors.filter((d) => d !== director)
                : [...prevDirectors, director]
        );
    };


    const [filteredMovies, setFilteredMovies] = useState([]);
    const [originalMovies, setOriginalMovies] = useState([]);


    useEffect(() => {
        const filtered = movies.filter((movie) => {
            const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
            const directorMatch = selectedDirectors.length === 0 || selectedDirectors.includes(movie.director);
            return genreMatch && directorMatch;
        });
        if (selectedGenres.length === 0 && selectedDirectors.length === 0) {
            setFilteredMovies([]);
        } else {
            setFilteredMovies(filtered);
        }
    }, [selectedGenres, selectedDirectors, movies]);


    const resetFilters = () => {
        setSelectedGenres([]);
        setSelectedDirectors([]);
        setFilteredMovies([]);
        setSelectedTitle("");
        setSearchResults([]);
    };


    //***Logic for the search bar.


    const [selectedTitle, setSelectedTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const lowerCaseSelectedTitle = selectedTitle.toLowerCase();
        const searchArray = selectedGenres.length > 0 || selectedDirectors.length > 0 ? filteredMovies : movies;
        const searchResult = searchArray.find((movie) => movie.title.toLowerCase() === lowerCaseSelectedTitle);
        if (searchResult) {
            setSearchResults([searchResult]);
        } else {
            setSearchResults([]);
        }
    };


    useEffect(() => {
        const lowerCaseSelectedTitle = selectedTitle.toLowerCase();
        const searchArray = selectedGenres.length > 0 || selectedDirectors.length > 0 ? filteredMovies : movies;
        const searchResult = searchArray.find((movie) => movie.title.toLowerCase() === lowerCaseSelectedTitle);
        if (searchResult) {
            setSearchResults([searchResult]);
        } else {
            setSearchResults([]);
        }
    }, [selectedTitle]);


    const handleClearSearch = () => {
        setSelectedGenres([]);
        setSelectedDirectors([]);
        setFilteredMovies([])
        setSelectedTitle("");
        setSearchResults([]);
    };


    const goBack = () => {
        setSelectedTitle("");
        setSearchResults([]);
    };


    //***Logic for the updating favorite movies.


    const updateFavoriteMovies = (movieId, isFavorite) => {
        if (isFavorite) {
            setUser((prevUser) => ({
                ...prevUser,
                FavoriteMovies: [...prevUser.FavoriteMovies, movieId],
            }));
        } else {
            setUser((prevUser) => ({
                ...prevUser,
                FavoriteMovies: prevUser.FavoriteMovies.filter((id) => id !== movieId),
            }));
        }
    };


    //***Logic to fetch necessary data (users and movies).


    useEffect(() => {
        if (!token) {
            return;
        } else {
            fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => response.json())
                .then((data) => {
                    setOriginalMovies(data);
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
                    setOriginalMovies(moviesFromApi);
                })
                .catch((error) => {
                    console.error("Error fetching movies:", error);
                });
        };
    }, [token]);


    useEffect(() => {
        if (!token) {
            return;
        } else {
            fetch(`https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users/${storedUser.Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((loggedInUser) => {
                    console.log("User Data:", loggedInUser);
                    setUser(loggedInUser);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        }
    }, [token, storedUser.Username]);



    //***Logic to return appropriate UI elements based on different conditions.


    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
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
                <Routes>
                    <Route
                        path="/signup"
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
                                                            <p>Make sure you have written the title of the movie completely and without errors.</p>
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
                                                            <p>It looks like there are no movies matching your search within your filtered movie list.</p>
                                                            <p>Make sure you have written the title of the movie completely and without errors.</p>
                                                            <p>If your movie still does not appear, try searching for your movie without applying filters as you'll search in a wider list of movies.</p>
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


