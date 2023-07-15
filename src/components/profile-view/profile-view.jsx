import React from "react";

import { useState } from "react";

import { useEffect } from "react";

import Form from "react-bootstrap/Form";

import { Button } from "react-bootstrap";

import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import './profile-view.scss';

import axios from 'axios';

export function ProfileView({ movies, user, token }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const favoriteMovieList = movies.filter((movies) => { })

    const handleUpdate = (event) => {
        event.preventDefault();
        const userData = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        fetch(`https://my-weekend-movie-app-53a46e3377d7.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(userData),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                alert("Update successful");
                window.location.reload();
            } else {
                alert("Update failed");
            }
        });
    };    

    return (
        <div>
            <h4>Your info</h4>
            <p>User: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <Form className='profile-form' onSubmit={handleUpdate}>
                <h4>Update info</h4>
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                    pattern="[a-zA-Z0-9]+"
                    title="Username must consist of alphanumeric characters" />
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <label>Email: </label>
                <input
                    type='email'
                    name='email'
                    defaultValue=''
                    onChange={(e) => setEmail(e.target.value)} />
                <label>Birthday: </label>
                <input
                    type='birthday'
                    name='birthday'
                    defaultValue=''
                    onChange={(e) => setBirthday(e.target.value)} />
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
