import "./MovieCard.css";
import React from "react";



export const MovieCard = ({ movie, handleClick, handleDetailClick }) => {
    return (
        <>
            <div className="movie-card">
                <h2 className="movie-name"
                    onClick={(event) => handleClick(event)} id={movie.id}><span>
                        {movie.title}
                    </span></h2>
                <div className="details-div" 
                    onClick={() => handleDetailClick(movie)}>
                    <img src="/images/magnifying_glass.png" alt="magnifying glass"
                        className="mag-icon" />
                </div>
            </div>
        </>
    )
}