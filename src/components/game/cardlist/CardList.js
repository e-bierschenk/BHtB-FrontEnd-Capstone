import React, { useState, useEffect, useRef } from 'react';
import { ActorCard } from './ActorCard';
import { MovieCard } from './MovieCard';

export const CardList = ({handleClick, movie, actor, actorMovie, filteredArray, setFilteredArray, searchInputValue, setSearchInputValue}) => {
    const handleInputChange = (event) => {
        console.log(event.target.value)
        let filtered = []
        if (actorMovie === "actor") {
            filtered = actor.castMovies.filter(movie => movie.title.toLowerCase().includes(event.target.value.toLowerCase()))
        } else {
            filtered = movie.actors.filter(actor => actor.name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        console.log(filtered)
        setSearchInputValue(event.target.value)
        setFilteredArray(filtered)
    }

    return actorMovie === "actor" ?
        <>
            <h2>Movies Starring {actor.name}</h2>
            <CardSearch searchInputValue={searchInputValue} handleInputChange={handleInputChange} autoFocus/>
            <div className="container-cards">
                {filteredArray?.map(movie =>
                    (movie.role === "Actress" || movie.role === "Actor") && movie.year !== "" ?
                        <MovieCard
                            handleClick={handleClick}
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
            <h2>Actors in {movie.title}</h2>
            <CardSearch searchInputValue={searchInputValue} handleInputChange={handleInputChange} autoFocus/>
            <div className="container-cards">
                {filteredArray?.map(actor =>
                    <ActorCard
                        handleClick={handleClick}
                        key={actor.id}
                        actor={actor}
                    />)}
            </div>
        </>
};

const CardSearch = ({ handleInputChange, searchInputValue}) => {

    return (
        <input ref={input => input && input.focus()} type="text" onChange={handleInputChange} value={searchInputValue} placeholder="Search..." />
    )
}