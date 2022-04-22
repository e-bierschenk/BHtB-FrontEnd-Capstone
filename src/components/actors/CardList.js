import React, { useState, useEffect } from 'react';
import { ActorCard } from './ActorCard';
import { MovieCard } from './MovieCard';
import { getCastByMovieId, getMoviesByActorId } from '../../modules/IMDB-API';



export const CardList = () => {
    const [actor, setActor] = useState({});
    const [movie, setMovie] = useState({})
    const [actorMovie, setActorMovie] = useState("actor") //this state toggles back and forth between actor and movie
    const [linkCount, setLinkCount] = useState(0)
    //these are used for testing, remove later
    let startmovieId = "tt0110413"
    let startactorId = "nm0000204"

    const getMovie = (movieId) => getCastByMovieId(movieId).then(setMovie)
    const getActor = (actorId) => getMoviesByActorId(actorId).then(setActor)


    const handleClick = (event) => {
        console.log("clicked ", event.currentTarget.id)
        //check whether we are on an actor or movie step
        if (actorMovie === "actor") {
            getMovie(event.currentTarget.id)
                .then(() => setActorMovie("movie"))
        } else {
            const newCount = linkCount + 1
            setLinkCount(newCount)
            //check to see if the clicked actor is kevin bacon otherwise, keep looping through movie/actor steps
            if (event.currentTarget.id === "nm0000102") {
                //trigger end of game steps
                console.log("CONGRATS YOU LED KEVIN BACON HOME")
            } else {
                getActor(event.currentTarget.id)
                    .then(() => setActorMovie("actor"))
            }
        }
    }

    useEffect(() => {
        getActor(startactorId);
        // getMovie(startmovieId)
    }, []);


    if (actorMovie === "movie") {
        return (
            <>
                <h2>Actors in {movie.title}</h2>
                <h3>Links used: {linkCount}</h3>
                <div className="container-cards">
                    {movie.actors?.map(actor =>
                        <ActorCard
                            handleClick={handleClick}
                            key={actor.id}
                            actor={actor}
                        />)}
                </div>
            </>
        );
    } else if (actorMovie === "actor") {
        return (
            <>
                <h2>Movies Starring {actor.name}</h2>
                <h3>Links used: {linkCount}</h3>
                <div className="container-cards">
                    {actor.castMovies?.map(movie =>
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
        );
    }
};