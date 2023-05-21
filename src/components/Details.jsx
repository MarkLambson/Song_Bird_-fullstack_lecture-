import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

// useState, useEffect, axios, Link, useParams

const Details = () => {
    const [song, setSong] = useState([]);
    const { id } = useParams();

    // Get song data
    useEffect(() => {
        axios.get(`http://localhost:8000/api/songs/${id}`)
            .then((res) => {
                console.log("Details page: ", res.data.results)
                setSong(res.data.results)
            })
            .catch((err) => {
                console.log("ERROR => details page: ", err)
            })
    }, [id])

    return (
        <div>
            <h1>Details Page</h1>

            <div className='card'>
                {/* Card Header */}
                <div className='card-header'>
                    <img src={song.img} alt="Album Cover" height="150px" />
                </div>

                {/* Card Body */}
                <div className='card-body'>
                    <p><h1>{song.artist}</h1></p>
                    <p><h2>{song.title}</h2></p>
                    <p><h3>{song.rating}</h3></p>
                    <p><h4>Top 100: {song.top100 ? "Yes" : "No"}</h4></p>
                </div>

                {/* Card Footer */}
                <div className='card-footer'>
                    <button
                        className='btn btn-outline-dark'>
                        <Link to={'/'}>Home</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Details