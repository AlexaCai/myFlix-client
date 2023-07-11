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

    //***Way to identify whether there was a user click on a ''MovieCard'' or not. The ''useState(null);'' tells the app that no movie cards is clicked at first. However, if a user were to click on a movie card, the app would need to update the selectedMovie state to refer to the movie object that was clicked, thus inducing the app to render that movie’s details using the ''MovieView'' component.
    const [selectedMovie, setSelectedMovie] = useState(null);

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
                    //***setMovies(moviesFromApi) is used to update the movies variable state in ''const [movies, setMovies] = useState([]);'', which in turn updates the movies array (useState([])), adding into it the movies that have been fetched by fetch("https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/movies").
                    setMovies(moviesFromApi);
                });
        };
        //***[token] is a dependency array passed as the second argument to the useEffect, so the useEffect will be re-executed whenever the value of token changes.
    }, [token]);

    //***These returned elements are designed using React Bootstrap. The MainView component only has one return statement that has a ''Row'' as the root element. The nested elements are conditionally rendered using the ternary operator ?:. 
    //***conditional (ternary) operator takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy. This operator is frequently used as an alternative to an if...else statement. Format = condition ? exprIfTrue : exprIfFalse.
    //***The following ''return'' is using conditional rendering to determine which content should be displayed on the user UI based on different conditions. 
    return (
        //***<Row> is being used as a container component to structure the layout of the content inside the return statement. It helps to align and position the child components (''LoginView'', ''SignupView'', etc.) within a React Bootstrap row-based grid system.
        //***{!user ? condition checks if the user variable is falsy (''null'' as its first state when no user is logged in). If user is falsy (''null''), it renders the content inside the first parentheses, which includes a LoginView component and a SignupView component. If user is truthy (a user is logged in), it moves to the next condition ) : selectedMovie ? (.
        <Row>
            {!user ? (
                <>
                    <LoginView
                        //***By passing the ''onLoggedIn'' prop with the callback function ''(user, token) => => {setUser (user); setToken(token); }}'' to the ''LoginView'' component, ''MainView'' component establishes a communication channel to receive the logged-in user data from ''LoginView'. This enables the login process within the ''LoginView'' component to update the user and token state variables in the MainView component (current file) (so making them not ''null'' anymore), thus providing access to all the logged-in user's movie data.
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </>
                //***) : selectedMovie ? ( condition checks if the selectedMovie variable is truthy (so if his state is not ''null'' anymore after a user clicked on a MovieCard and so updated the selectdMovie variable via setSelectMovie). If selectedMovie is truthy (not ''null''), it renders the content inside the second parentheses, which includes a MovieView component displaying the details of the selected movie, a div containing a logout button, and a logout button. If selectedMovie is falsy (''null''), it moves to the next condition ) : movies.length === 0 ? (.
            ) : selectedMovie ? (
                //***When a movie is clicked on, ''MovieView movie={selectedMovie}'' is activated and the movie details are shown in the UI.
                //***The code ''onBackClick={() => setSelectedMovie(null)}'' adds to the ''onBackClick'' (from the ''MovieView'' component file) the logic that sets the ''selectedMovie'' variable back to its initial state value (null) when the button ''back'' is clicked (the ''back'' button being defined in MovieView). This make the MovieView window with more details closes and bring the interface back to the MainView with the MovieCard.
                //***Addition of a ''logout'' button with an ''onClick'' handler, which resets the user state variable to null (and so brings the UI back to the login page).
                <>
                    <div>
                        <MovieView movie={selectedMovie}
                            onBackClick={() => setSelectedMovie(null)}
                        />
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </>
                //***) : movies.length === 0 ? ( condition checks if the movies array is empty. If the movies array is empty, it renders the message "The list is empty!". If the movies array is not empty, it moves to the final condition.
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
                //***This is the default condition when the previous conditions (selectedMovie ? and movies.length === 0 ?) werent met. It renders the content inside the final parentheses, which includes a div containing a list of MovieCard components rendered using movies.map(). Each MovieCard component represents a movie from the movies array. Additionally, it includes a logout button.
            ) : (
                //***The .map() method in the code below maps each element in the movies array to a piece of UI. So, after its execution, there will be one <MovieCard /> for each movie fetch() from the /movies API.
                //***Addition of a ''logout'' button with an ''onClick'' handler, which resets the user state variable to null (and so brings the UI back to the login page).
                <>
                    <div>
                        {movies.map((movie) => {
                            //***''return <MovieCard ... />'' uses the ''MovieCard'' child component imported upper in this file.
                            //***The ''movie'' object from each iteration of the map() function (so each movie object in the useState array in this file) is passed inside the child component <MovieCard />. This is done by adding a custom attribute before /> and setting its value to ''movie'' (movie={movie}) (movies data are passed to the MovieCard component as props).
                            return <MovieCard
                                //***The key serves as a unique identifier for each item in a list of components (here, each movie of the .map() array). When rendering a list of components dynamically using map, React uses the key prop to efficiently rendered and updated process for lists of components.
                                key={movie._id}
                                //***''movie'' is the name of the prop being passed to the MovieCard component, while {movie} is the data being passed to the MovieCard component. It's the movie object that is received from the .map() function. Each MovieCard component receive a different movie object, representing a specific movie from the movies array.
                                movie={movie}
                                //***Listening for click events by using a special attribute ''onClick''. This attribute accepts a function, and this function will be the callback once the element is clicked (the function contains the logic to be executed whenever a click is registered).
                                //***Here a function as a prop called ''onMovieClick'' is presents. It has one parameter that represents the movie to be set to selectedMovie state. When a movie card is clicked, the selectedMovie value is updated with the movie clicked on, using seSelectedMovie. To make this work, its also important to make sure that the ''onMovieClick'' prop is extracted in the movie-card.jsx.
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
            )}
        </Row>
    );
};