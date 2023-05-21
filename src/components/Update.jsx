import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Update = () => {
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [top100, setTop100] = useState(false);
    const [img, setImg] = useState("");

    const { id } = useParams();

    const navigate = useNavigate();

    // useEffect to get song data
    useEffect(() => {
        axios.get(`http://localhost:8000/api/songs/${id}`)
            .then((res) => {
                console.log("Update page: ", res.data.results)
                // Set song data into variables
                const song = res.data.results
                setArtist(song.artist)
                setTitle(song.title)
                setRating(song.rating)
                setTop100(song.top100)
                setImg(song.img)
            })
            .catch((err) => {
                console.log("ERROR => update page: ", err)
            })
    }, [])

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        let updateData = { artist, title, rating, top100, img };
        axios.put(`http://localhost:8000/api/songs/update/${id}`, updateData, { new: true })
            .then((res) => {
                console.log("This is our handleSubmit for update page ", res)
                navigate('/')
            })
            .catch((err) => {
                console.log("ERROR => handle submit: ", err)
            })
    }

    return (
        <div>
            <h1>Update Page</h1>

            {/* Update a Song Form */}
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
                <button type='submit' className='btn btn-outline-dark'>Update Song</button>
                <button className='btn btn-outline-warning'><Link to={'/'}>Nevermind</Link></button>
            </form>
        </div>
    )
}

export default Update