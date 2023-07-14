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

//***Import the Row Bootstrap component for Bootstrap grid UI design.
import Row from "react-bootstrap/Row";

//***Import the Col Bootstrap component for Bootstrap grid UI design.
import Col from 'react-bootstrap/Col';

//***Import specific components and utilities from the react-router-dom library in React applications.
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//***''export'' keyword exposes the ''MainView'' component making it available for use by other components, modules, and files (possible to import in other files).
//***''const MainView'' (and the following codes) creates the ''MainView'' component. The lines after ''const MainView'' is the function assigned to ''MainView'' that returns the visual representation of the component (the function renders what is displayed on the screen).
export const MainView = () => {

    //***Used to retrieve the user values from the browser's ''localStorage''. localStorage is a web API that allows to store data in the browser. In this case, it's used to store the user object received from the server during the login process. With this, its possible to maintain the user's login state even if the page is refreshed or reopened.
    const storedUser = JSON.parse(localStorage.getItem("user"));

    //***Idem to the code definition above.
    const storedToken = localStorage.getItem("token");

    //***Way to identify whether a user has logged in or not. The ''useState(null);'' tells the app that user is not logged in at first. However, if a user were to log in (as written in the block of codes following if (!user) below), the ''setUser'' would be called and update the ''user'' value based on the user input during loggin in. The ''user'' value not being be equal to ''null'' anymore, the app would thus renders the normal view with all the movie info (''MainView'' with ''MovieCard'' in it, and ''MovieView'' once a MovieCard is being clicked on), if the token has been passed along as well.
    const [user, setUser] = useState(null);

    //***The ''useState(null);'' tells the app that there is no token at first. However, if a user were to log in (as written in the block of codes following if (!user) below), the ''setToken'' would be called and update the ''token'' value with the token generated automatically during user log in. The ''token'' value not being be equal to ''null'' anymore, the app would thus renders the normal view with all the movie info (''MainView'' with ''MovieCard'' in it, and ''MovieView'' once a MovieCard is being clicked on).
    const [token, setToken] = useState(null);

    //***'Wihtin the ''useState([])'' array are the objects of the ''movies'' variable. This object (movies) come from the fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies"). The ''setMovies'' function updates the movies state with the fetched movie data whe called.
    const [movies, setMovies] = useState([]);

    //***This useEffect fetches movies from the API /movies endpoint when the token state changes (so when its not ''null'' anymore, meaning a request have been sent with an valid token by a user, authorizing the server to give back the response with the movies info).
    useEffect(() => {
        if (!token) {
            //***If the token is ''null'' (no token), the function does not execute the API call. This means that the fetch call will not be executed. This ensure that the API call is only made when a valid token is present.
            return;
        } else {
            //***If the token has another value than ''null'', the code makes a fetch request to the specified URL "https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies" and includes the Authorization header with the Bearer token to authenticate the request.
            fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies", {
                //***headers is an object that contains the request headers to be sent with the fetch request. Headers are used to provide additional information about the request or to include specific authorization credentials (such as here - as the headers object is being used to include an authorization token in the request header).
                headers: { Authorization: `Bearer ${token}` }
            })
                //***.then() is chained to the fetch call, and it takes the response object received from the fetch() request as its parameter. ''response.json())'' is used to transformed the response from the server to JSON format.
                .then((response) => response.json())
                //***.then() is chained to the previous one. It receives the parsed JSON data as (data). The data is processed here to extract relevant information from each movie.
                .then((data) => {
                    console.log(data);
                    //***.map() method transforms each element of the data array (so the ''movies'' array in const [movies, setMovies] = useState([])) into a new object with specific properties. The .map() method is used to iterate over each element (movie) in the data array received from the fetch request URL. For each movie in the data array, a new object is create with the costum properties defined below.
                    const moviesFromApi = data.map((movie) => {
                        //***Properties for each new object (movie) created by .map(). Once the movie data have been transformed using the properties within the .map() method, its possible to pass those properties as attributes to child components, such as MovieCard and MovieView, and use them to display the wanted for each component. 
                        return {
                            //***The name of each key (ex: directorBio) here is used to access the information the value contains in other components (MovieCard and MovieView). To display the director's bio information of a movie for exemple, {movie.directorBio} has been added in the MovieView component.
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
                    console.log(moviesFromApi); // Check the moviesFromApi array
                    //***setMovies(moviesFromApi) is used to update the movies variable state in ''const [movies, setMovies] = useState([]);'', which in turn updates the movies array (useState([])), adding into it the movies that have been fetched by fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies").
                    setMovies(moviesFromApi);
                })
                .catch((error) => {
                    console.error("Error fetching movies:", error);
                  });
        };
        //***[token] is a dependency array passed as the second argument to the useEffect, so the useEffect will be re-executed whenever the value of token changes.
    }, [token]);

    return (
        <BrowserRouter>
          <Row className="justify-content-md-center">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
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
                      <Col md={5}>
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
                      <Col md={8}>
                        <MovieView movies={movies} />
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
                          <Col className="mb-4" key={movie._id} md={3}>
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