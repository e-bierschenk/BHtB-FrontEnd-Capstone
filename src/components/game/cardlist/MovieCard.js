import "./Card.css";
import React from "react";



export const MovieCard = ({ movie, handleClick }) => {
    return (
        <>
            <div className="card" id={movie.id} onClick={(event) => handleClick(event)}>
                <div className="card-content">
                    <h2><span className="card-name">
                        {movie.title}
                        </span></h2>
                    <h3>Year: <span className="card-year">
                        {movie.year}
                    </span></h3>
                </div>
            </div>
        </>
    )
}