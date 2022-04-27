import React, { useState, useEffect, useRef } from 'react';
import { ActorCard } from './ActorCard';
import { MovieCard } from './MovieCard';
import "./CardList.css"

export const CardList = ({handleClick, handleDetailClick, movie, actor, actorMovie, filteredArray, setFilteredArray, searchInputValue, setSearchInputValue}) => {
    

    return actorMovie === "actor" ?
        <>
            <h2 className='headline'>Movies Starring {actor.name}</h2>
            <div className="movie-container">
                {filteredArray?.map(movie =>
                    (movie.role === "Actress" || movie.role === "Actor") && movie.year !== "" ?
                        <MovieCard
                            handleClick={handleClick}
                            handleDetailClick={handleDetailClick}
                            key={movie.id}
                            movie={movie}
                        />
                        :
                        ""
                )}
            </div>
        </>
        :
        <>
            <h2 className='headline'>Actors in {movie.title}</h2>
            <div className="actor-container">
                {filteredArray?.map(actor =>
                    <ActorCard
                        handleClick={handleClick}
                        key={actor.id}
                        actor={actor}
                    />)}
            </div>
        </>
};