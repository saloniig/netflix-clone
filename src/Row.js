import React, { useState, useEffect } from 'react'
import axios from './axios';
import "./Row.css";
import YouTube from 'react-youtube'

const base_url = "https://image.tmdb.org/t/p/w500"

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
       // if [], run once when the row loads, and don't run it again
       async function fetchData() {
           const request = await axios.get(fetchUrl);
           setMovies(request.data.results);
           return request;
       }
       fetchData();
    },[fetchUrl]);

  function fetchVideoLink(videoId) {
    const url = `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=f40fbd9c588bef8f7d48ac7a01532821`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.results.length !== 0)
          console.log(res.data.results[0]?.key);
        setTrailerUrl(res.data.results[0]?.key);
      })
      .then((movieKey) => movieKey);
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      fetchVideoLink(movie.id);
    }
  };


  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };


    //console.table(movies);
    return (
        <div className="row">
           <h2>{title}</h2>
           <div className="row__posters">
            {movies.map(movie => (
                <img 
                key={movie.id}
                onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : (movie.backdrop_path ? movie.backdrop_path : movie.poster_path)}`} alt={movie.original_title}/>
            ))}
           </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
