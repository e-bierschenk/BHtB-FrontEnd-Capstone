import React, { useState, useEffect } from 'react';
//import the components we will need
import { ActorCard } from './ActorCard';
import { MovieCard } from './MovieCard';
import { getCastByMovieId, getMoviesByActorId } from '../../modules/imdb-api';



export const CardList = () => {
    // The initial state is an empty array
    const [actor, setActor] = useState({});
    const [movie, setMovie] = useState({})
    const [actorMovie, setActorMovie] = useState("actor")

    let startmovieId = "tt0110413"
    let startactorId = "nm0000204"

    const getMovie = (movieId) => {
        // After the data comes back from the API, we
        // use the setActors function to update state
        return getCastByMovieId(movieId).then(setMovie);
    };

    const getActor = (actorId) => {
        return getMoviesByActorId(actorId).then(setActor)
    }

    const handleClick = (event) => {
        console.log("clicked ", event.currentTarget.id)
        if (actorMovie === "actor") {
            getMovie(event.currentTarget.id)
                .then(() => setActorMovie("movie"))
        } else {
            getActor(event.currentTarget.id)
                .then(() => setActorMovie("actor"))
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
                <div className="container-cards">
                    {actor.castMovies?.map(movie =>
                        (movie.role === "Actress" || movie.role === "Actor") && movie.year !== ""?
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