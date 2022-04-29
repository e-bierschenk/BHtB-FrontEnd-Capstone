import React, { useState, useEffect, useRef } from 'react';
import { ActorCard } from './ActorCard';
import { MovieCard } from './MovieCard';
import "./CardList.css"
import { DetailView } from '../detailView/DetailView';

export const CardList = ({ handleClick, handleDetailClick, movie, actor, actorMovie, filteredArray, detailMovie, setDetailMovie }) => {


    return actorMovie === "actor" ?
        <>
            <div className="movie-view">
                <div className="left">
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
                </div>
                <DetailView actor={actor}
                detailMovie={detailMovie}
                setDetailMovie={setDetailMovie} />
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