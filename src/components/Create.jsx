import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// axios, useNavigate, useState, Link

const Create = () => {
    // Artist variable
    const [artist, setArtist] = useState("");
    // Title variable
    const [title, setTitle] = useState("");
    // Rating variable
    const [rating, setRating] = useState(0);
    // Top 100 variable
    const [top100, setTop100] = useState(false);
    // Image variable
    const [img, setImg] = useState("");

    // Variable to store errors
    const [errors, setErrors] = useState([]);

    // Variable to navigate
    const navigate = useNavigate();

    // Submit handler function
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/songs/new", { artist, title, rating, top100, img })
            .then((res) => {
                // Log data
                console.log("This is our create page post success: ", res)
                // Navigate back to home
                navigate("/")
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr)
            })
    }

    return (
        <div>
            <h1>Add a Song - Create Page</h1>
            <hr />
            {/* Errors */}
                {errors.map((err, idx) => <p key={idx}>{err}</p>)}
            {/* Add a Song Form */}
            <form className='form form-group' onSubmit={handleSubmit}>
                {/* Artist */}
                <div>
                    <label>Artist</label>
                    <input type="text"
                        className='form-control'
                        name='artist'
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </div>

                {/* Title */}
                <div>
                    <label>Title</label>
                    <input type="text"
                        className='form-control'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Rating */}
                <div>
                    <label>Rating</label>
                    <input type="number"
                        className='form-control'
                        name='rating'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>

                {/* Top 100 */}
                <div>
                    <label>Top 100</label>
                    <input type="checkbox"
                        className='form-check-input'
                        name='top100'
                        checked={top100}
                        onChange={(e) => setTop100(e.target.checked)}
                    />
                </div>

                {/* Album Cover */}
                <div>
                    <label>Album Cover</label>
                    <input type="text"
                        className='form-control'
                        name='img'
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button type='submit' className='btn btn-outline-success'>Add Song</button>
                <button className='btn btn-outline-warning'><Link to={'/'}>Nevermind</Link></button>
            </form>
        </div>
    )
}

export default Create