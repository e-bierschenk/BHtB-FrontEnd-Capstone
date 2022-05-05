import "./MovieCard.css";
import React from "react";



export const MovieCard = ({ movie, handleClick, handleDetailClick, nextStep }) => {
    return (
        <>
            <div className="movie-card">
                <h2 className={nextStep === movie.title ? "movie-name movie-card-next" : "movie-name"}
                    onClick={(event) => handleClick(event)} id={movie.id}><span>
                        {movie.title}
                    </span></h2>
                <div className={nextStep === movie.title ? "details-div movie-card-next" : "details-div"}
                    onClick={() => handleDetailClick(movie)}>
                    <img src="/images/magnifying_glass.png" alt="magnifying glass"
                        className="mag-icon" />
                </div>
            </div>
        </>
    )
}