General presentation

The application presented in the user interface is made up of a main view (corresponding to the main-view component). This is the base of the interface.

Within this main view is a movie list (corresponding to the movie-card component). When a user clicks on a movie title (so on a movie-card component), a new window with more information on the movie clicked opens (corresponding to the movie-view component). The user can then read more information and return to the main page by clicking on the "back" button when finished.

****

Technical aspects

Parcel is the build tool used to build the front-end side of the server-side movie-api.

index.html is the entry point of the app (parcel src/index.html). Parcel therefore begin gathering dependencies from index.html and bundling them.