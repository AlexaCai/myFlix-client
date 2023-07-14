import React from "react";

import { useState } from "react";

import { useEffect } from "react";

import Form from "react-bootstrap/Form";

import { Button } from "react-bootstrap";

import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import './profile-view.scss';

import axios from 'axios';

export function ProfileView({ movies }) {

    //***Way to identify whether a user has logged in or not.The ''useState(null); '' tells the app that user is not logged in at first.However, if a user were to log in (as written in the block of codes following if (!user) below), the ''setUser'' would be called and update the ''user'' value based on the user input during loggin in.The ''user'' value not being be equal to ''null'' anymore, the app would thus renders the normal view with all the movie info(''MainView'' with ''MovieCard'' in it, and ''MovieView'' once a MovieCard is being clicked on), if the token has been passed along as well.
    const [user, setUser] = useState({})

    const favoriteMovieList = movies.filter((movies) => {})

    // const getUser = () => { }

    // const handleSubmit = (e) => { }

    // const removeFav = (id) => { }

    // const handleUpdate = (e) => { };

    // useEffect(() => { }, [])

    // const [favoriteMovies, setFavoriteMovies] = useState([]);


    return (
        <div>
            <h4>Your info</h4>
            <p>User: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <Form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
                <h4>Update info</h4>
                <label>Username: </label>
                <input
                    type='text'
                    name='Username'
                    defaultValue={user.Username}
                    onChange={e => handleUpdate(e)} />
                <label>Password: </label>
                <input
                    type='password'
                    name='password'
                    defaultValue={user.Password}
                    onChange={e => handleUpdate(e)} />
                <label>Email: </label>
                <input
                    type='email'
                    name='email'
                    defaultValue={user.Email}
                    onChange={e => handleUpdate(e)} />
                <label>Birthday: </label>
                <input
                    type='birthday'
                    name='birthday'
                    defaultValue={user.Birthday}
                    onChange={e => handleUpdate(e)} />
                    <Button variant='primary' type='submit'>
                        Update
                    </Button>
            </Form>
            <div>
                <h4>Favorites Movies</h4>
                {favoriteMovieList.map((movies) => {
                    return (
                        <div key={movies._id} >
                            < img src={movies.ImagePath} />
                            <Link to={`/movies/${movies._id}`}>
                                <h4>{movies.Title}</h4>
                            </Link>
                            <Button variant='secondary' onClick={() => removeFav(movies._id)}>Remove from list</Button>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
