import "./MovieCard.css";
import React from "react";



export const MovieCard = ({ movie, handleClick }) => {
    return (
        <>
            <div className="movie-card" id={movie.id} onClick={(event) => handleClick(event)}>
                    <h2><span className="movie-name">
                        {movie.title}
                        </span></h2>
                    <div className="details-div">
                        <img src="/images/magnifying_glass.png" alt="magnifying glass"
                        className="mag-icon" />
                    </div>
            </div>
        </>
    )
}