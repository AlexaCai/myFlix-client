# *myFlix* web app documentation (frontend - React)

**Content**

- Projet description
- User interface
 - Technical aspects
 - App dependencies

 
## Projet description

*myFlix* web app has been created to serve as a reference in the domain of visual entertainment. Users can create an account and then log into *myFlix* to have access to information about different movies. They can search for movies, filter results based on different criteria and create lists of favorites. *myFlix* has been built in two parts: the frontend (here) and the backend ([see this repository for the backend part of *myFlix*](https://github.com/AlexaCai/movie-api)).

The objective of this part of the project (frontend) was to develop an easy-to-use and responsive web app using React for the best user-experience whenever they are accessing *myFlix* to read details about different movies or update their information.

*myFlix* frontend development can be breakdown in the five following points:

 - **Who** —  The users of *myFlix* web app, so movie enthusiasts who enjoy reading information about
different movies.
 - **What** — A single-page, responsive app with routing, rich interactions, several interface views,
and a polished user experience. This client-side developed in this project support
my previously built server-side API by facilitating user requests and rendering the
response from the backend via a number of different interface views.
 - **When** — *myFlix* users are able to use it whenever they want to read and save information
about different movies.
 - **Where** — *myFlix* frontend logic is hosted online (Netlify). *myFlix* itself is responsive and can therefore be used anywhere and on any device, giving all users the same experience.
 - **Why** — Movie enthusiasts like to be able to access information about different movies,
whenever they want to. Having the ability to save a list of their favorite movies ensure
users always have access to the films they want to watch or recommend to their peers.

## User interface

More concretely, when a user is not logged in, he has access to two views: log in or sign up. Once logged in in the app, the user has access to two main views: home and profile.

In the home view, the user can see all the movies within the app. He can click on any movie to have a more detailed view with more complete information, and add the movie to his list of favorite if desired (he can also remove it from his list of favorite if the movie is already present in his favorite). Still from the home view, the user can also filter movies according to different criteria or perform a search for a specific movie.

In the profile view, the user can view and update his account information, as well as delete his account. He can also see all the movies he has added to his list of favorite, and remove movies from his list if desired.

All views have been coded to be responsive, using a combination of React Bootstrap and SCSS.

## Technical aspects

The application is powered by an API built with Express framework. This API is hosted on Heroku and allows different types of requests from *myFlix* app (get movies and users' data, allows users to update info, allows users to delete account, etc.). For more information on the API used, [see the README in the following repository](https://github.com/AlexaCai/movie-api).

The frontend of *myFlix* app uses React. The different React components have been created following industry standards. Along with React - HTML, SCSS, JavaScript and React Bootstrap have also been used.

More precisely, *myFlix*:

-   Is a single-page application (SPA);
-   Uses state routing to navigate between views;
-   Gives users the option to filter movies using search and filter features;
-   Uses Parcel as its build tool;
-   Is written using the React library and in ES2015+;
-   Uses Bootstrap as a UI library for styling and responsiveness;
-   Contains function components;
-   Is deployed on Netlify.

## App dependencies

The following dependencies are required for the *myFlix* fronttend logic to work:

dependencies
 - React
 - React-dom
 - React-router
 - React-router-dom
 - Prop-types 
 - Bootstrap
 - React-bootstrap
 
 devDependencies
 - Parcel
 - @parcel/transformer-sass