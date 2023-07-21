//***Import different React built-in function.
import { useState } from "react";
import { useEffect } from "react";

//***Import the different components of the app.
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

//***Import the different React Bootstrap components.
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

//***Import specific components from the "react-router-dom" library. 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//*** ''const MainView'' is functional component, ''MainView'' being it's name. It is defined as an arrow function without any parameters, indicating it does not receive any props.
export const MainView = () => {

    //***''storedUser'' is declared to store the user data fetched from the browser's localStorage. Since the data stored in localStorage is in string format, JSON.parse is used to convert it into a JavaScript object, then ''localStorage.getItem("user")'' is used to retrieve the value stored under the key "user" in the browser's localStorage. This allows to access the properties of the user object.
    const storedUser = JSON.parse(localStorage.getItem("user"));
    //***''storedToken'' is declared to store the token fetched from the browser's localStorage. ''localStorage.getItem("token")'' is used to retrieve the value stored under the key "token" in the browser's localStorage.
    const storedToken = localStorage.getItem("token");
    //***Initiate the first variable for each log in field as empty. A function allowing the update of this first variable is added inside each const (ex: setUser, setToken...).
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [movies, setMovies] = useState([]);

    //***Function used to update the favorite movies list automatically without having to logout. The function is called in movie-view.jsx and profile-view.jsx.
    const updateFavoriteMovies = (movieId, isFavorite) => {
        if (isFavorite) {
          // Add the movieId to the list of favorite movies
          setUser((prevUser) => ({
            ...prevUser,
            FavoriteMovies: [...prevUser.FavoriteMovies, movieId],
          }));
        } else {
          // Remove the movieId from the list of favorite movies
          setUser((prevUser) => ({
            ...prevUser,
            FavoriteMovies: prevUser.FavoriteMovies.filter((id) => id !== movieId),
          }));
        }
      };

    //***This useEffect is responsible for fetching movie data from the server when there is a valid token available (when the user is authenticated). After fetching the movie data, it transforms the API response into a format that the application can use and updates the movies state accordingly. The effect is triggered whenever the token state changes.
    useEffect(() => {
        //***Conditional logic that ensures that the effect is only executed if the token state is not null or undefined (such as when a user has logged in successfuly). If token is null or undefined (such as when a user it NOT logged in), the effect returns and nothing inside the effect is executed.
        if (!token) {
            return;
            //***If a token is present, the following ''else'' logic goes on.
        } else {
            //***Send a network request to the specified URL. to fetch movie data. It includes the Authorization header with the Bearer token value to authenticate the request, which is necessary, otherwise the server would send back ''unautorized''.
            fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies", {
                //***Send along the request to the URL the authorization token to access the movies data in the database.
                headers: { Authorization: `Bearer ${token}` }
            })
            //***Converts the response received back from the API to a JavaScript object using the json() method.
                .then((response) => response.json())
                //***After parsing the response data, the data received from the API is processed.
                .then((data) => {
                    console.log(data);
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
                })
                //***Catches any errors that might occur during the fetch operation and logs an error message to the console.
                .catch((error) => {
                    console.error("Error fetching movies:", error);
                });
        };
        //***[token] is a dependency array that controls when the effect should be executed. It specifies that the effect should be executed whenever the value of the token variable changes. If token remains the same between renders, the effect will not be executed repeatedly, preventing unnecessary network requests. By including [token] as a dependency, the effect is optimized to run only when token changes.
    }, [token]);

    //***This useEffect is responsible for fetching all user data from the server when there is a valid token available (when the user is authenticated). Then, it searches for the user object that corresponds to the currently logged-in user by comparing the ''storedUser'' object's ''Username'' with the ''Username'' properties of all user objects in the data array. Once it identifies the logged-in user's data in the array, it updates the user state with that specific user's data, allowing the app to have access to the logged-in user's data throughout the component and enables rendering components and views specific to the currently logged-in user. The effect is triggered whenever the token state changes.
    useEffect(() => {
        if (!token) {
            return;
        } else {
            fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    //***''const loggedInUser = ...'' uses the find method on the data array (the parsed API response) to search for a user whose Username property matches the Username property of the storedUser object. The storedUser object is obtained from the localStorage earlier in the code.
                    const loggedInUser = data.find((user) => user.Username === storedUser.Username);
                    //***''setUser(loggedInUser);'' updates the user state from ''const [user, setUser] = useState(null);'' with the logged-in user data obtained from the API response. It uses the setUser function from the useState hook to update the state.
                    //***By updating the user state, the component now has access to the data of the currently logged-in user, and it can display the user's information and control the rendering of different parts of the app accordingly.
                    setUser(loggedInUser);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        }
    }, [token]);

    return (
        //***<BrowserRouter> is component from the react-router-dom library. It provides the routing functionality for the application, allowing different components to be rendered based on the current URL path.
        <BrowserRouter>
            <NavigationBar
            //***{user} is prop called user and is passed to the NavigationBar component. The value of {user} is the current user value/state from ''const [user, setUser] = useState(null);'' , which at this point is an object containing the information about the logged-in user (because of the action of the second useEffect in this file, who updated the user state initially set to ''null'' with the logged-in user information using ''setUser(loggedInUser);'').
                user={user}
                //***{onLoggedOut} is another prop passed to the NavigationBar component. It is a function that is executed when the user clicks on a "Logout"  button (as defined on navigation-bar.jsx) to log out. In this case, the function sets the user state to null, effectively logging the user out.
                onLoggedOut={() => {
                    setUser(null);
                }}
            />
            <Row className="justify-content-md-center">
            {/* <Routes> is used as a container for multiple <Route> components, and it defines the different routes that can be accessed in the application. */}
                <Routes>
                    {/* First Route component has a path prop set to "/signup" so that this route will be active when the URL matches "/signup". */}
                    <Route
                        path="/signup"
                        /* element prop of the Route is set to a JSX expression that will be rendered when the route is active. Inside the element prop, there's a conditional statement. */
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
                                        <MovieView user={user} movies={movies} updateFavoriteMovies={updateFavoriteMovies} />
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
                                        <ProfileView user={user} movies={movies} token={token} updateFavoriteMovies={updateFavoriteMovies}/>
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            // <Col className="mb-4" key={movie._id} md={3}>
                                            <Col xs={12} md={6} lg="3" style={{ border: "1px solid blue" }}>

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