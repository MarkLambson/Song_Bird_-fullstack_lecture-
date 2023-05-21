import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// useEffect, axios, useState, Link

const Dash = () => {
    const [songList, setSongList] = useState([]);
    const [refresh, setRefresh] = useState(false);//for the deleted songs on dashboard

    useEffect(() => {
        // http://127.0.0.1:8000  can be used if localhost is not working
        axios.get("http://localhost:8000/api/songs")
            .then((res) => {
                console.log("Dashboard get request: ", res.data.results)
                setSongList(res.data.results)
            })
            .catch((err) => {
                console.log("ERROR => dashboard: ", err)
            })
    }, [refresh]);

    // Handle delete function
    const handleDelete = (e, id) => {
        console.log("This is our delete function", id)
        axios.delete(`http://localhost:8000/api/songs/delete/${id}`)
            .then((res) => {
                console.log("Success, song deleted")
                setRefresh(!refresh)
            })
            .catch((err) => {
                console.log("ERROR => handle delete: ", err)
            })
    }

    return (
        <div>
            <h1>Song Bird Dashboard</h1>
            <button className='btn btn-dark'><Link to={'/create'}>
                Add a Song
            </Link></button>
            <hr />
            {/* Song Table */}
            <table className='table'>
                {/* Table Header */}
                <thead>
                    <th>Artist</th>
                    <th>Song Title</th>
                    <th>Rating</th>
                    <th>Top 100</th>
                    <th>Album Cover</th>
                    <th>Action</th>
                </thead>
                {/* Table Body */}
                <tbody>
                    {
                        songList.map((song, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{song.artist}</td>
                                    <td>{song.title}</td>
                                    <td>{song.rating}</td>
                                    <td>{song.top100 ? "Yes" : "No"}</td>{/* boolean, checkbox on form */}
                                    <td><img src={song.img} alt="Album Cover" height="70px" /></td>
                                    <td>
                                        {/* View Button (details) */}
                                        <button
                                            className='btn btn-outline-warning'>
                                            <Link to={`/details/${song._id}`}>Details</Link>
                                        </button>
                                        {/* Edit Button (update) */}
                                        <button
                                            className='btn btn-outline-success'>
                                            <Link to={`/update/${song._id}`}>Update</Link>
                                        </button>
                                        {/* Delete Button (delete) */}
                                        <button
                                            className='btn btn-outline-danger'
                                            onClick={(e) => { handleDelete(e, song._id) }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Dash