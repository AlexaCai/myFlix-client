# myFlix web app documentation

**Content**

- Projet description
- User interface
 - API and React
 - App dependencies

 
## Projet description

*myFlix* app was created to serve as a reference in the domain of visual entertainment. Users can create an account and then log into *myFlix* app to have access to different information about different movies. They can search for movies based on different criteria and create a list of favorite movies.

## User interface

More concretely, when a user is not logged in, he has access to two views: log in or sign up. Once connected in the app, the user has access to two main views: home and profile.

In the home view, the user can see all the movies within the app. He can click on any movie to have a more detailed view with more complete information, and add the movie to his list of favorite if desired (he can also remove it from his list of favorite if the movie is already present in his favorites). Still from the home view, the user can also filter movies according to different criteria or perform a search for a specific movie

In the profile view, the user can view and update his account information, as well as delete his account. He can also see all the movies he has added to his favorites lists, and remove movies from his list if desired.

All views have been coded to be responsive, using a combination of React Bootstrap and SCSS.

## API and React

The application is powered by an API built with the Express framework. This API is hosted on the Heroku platform  and allows different types of requests from *myFlix* app (get movies and users data, allows user to update info, allows user to delete account, etc...). For more information on the API used, please consult the API document [documentation.html](https://github.com/AlexaCai/movie-api/tree/main/public).

The frontend of *myFlix* app uses React. The different React components have been created following industry standards for project folders and files structure. All the app components are in the *src* > *components* folder.

## App dependencies

The following dependencies are required for the *myFlix* app to work:

For codes
 - React
 - React-dom
 - React-router
 - React-router-dom
 - Prop-types
 
 For styling
 
 - Bootstrap
 - React-bootstrap
 
 For devDependencies
 
 - Parcel
 - @parcel/transformer-sass