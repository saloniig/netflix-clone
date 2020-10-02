import React, { useState, useEffect } from 'react'
import axios from './axios';
import "./Row.css";
import YouTube from 'react-youtube'

const base_url = "https://image.tmdb.org/t/p/w500"

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
       // if [], run once when the row loads, and don't run it again
       async function fetchData() {
           const request = await axios.get(fetchUrl);
           setMovies(request.data.results);
           return request;
       }
       fetchData();
    },[fetchUrl]);


    //console.table(movies);
    return (
        <div className="row">
           <h2>{title}</h2>
           <div className="row__posters">
            {movies.map(movie => (
                <img 
                key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : (movie.backdrop_path ? movie.backdrop_path : movie.poster_path)}`} alt={movie.original_title}/>
            ))}
           </div>
            <YouTube videoId={} opts={opts}/>
        </div>
    )
}

export default Row
