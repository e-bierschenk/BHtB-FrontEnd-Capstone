import React, { useState, useEffect, useRef } from 'react';
import { ActorCard } from './ActorCard';
import { MovieCard } from './MovieCard';
import { getCastByMovieId, getMoviesByActorId } from '../../modules/imdb-api';



export const CardList = () => {
    const [actor, setActor] = useState({})
    const [movie, setMovie] = useState({})
    const [actorMovie, setActorMovie] = useState("actor") //this state toggles back and forth between actor and movie
    const [linkCount, setLinkCount] = useState(0)
    const [filteredArray, setFilteredArray] = useState([])
    const [searchInputValue, setSearchInputValue] = useState("")
    //these are used for testing, remove later
    let startmovieId = "tt0110413"
    let startactorId = "nm0000204"

    //functions to get a movie's actors or an actor's movies, and set state
    const getMovie = (movieId) => getCastByMovieId(movieId).then(setMovie)
    const getActor = (actorId) => getMoviesByActorId(actorId).then(setActor)

    const handleClick = (event) => {
        console.log("clicked ", event.currentTarget.id)
        //reset states of search input and filtered array when user clicks
        setSearchInputValue("")
        setFilteredArray([])
        //check whether we are on an actor or movie step
        if (actorMovie === "actor") {
            //grab the movie and cast the user clicked
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

    //at start of page get actor then set actor
    useEffect(() => {
        getActor(startactorId)
    }, []);

    //after actor is set, update the filtered array to the full set of movies
    useEffect(() => {
        setFilteredArray(actor.castMovies)
    }, [actor])

    //after movie is set, set the filtered array to the list of 
    useEffect(() => {
        setFilteredArray(movie.actors)
    }, [movie])



    return actorMovie === "actor" ?
        <>
            <h2>Movies Starring {actor.name}</h2>
            <h3>Links used: {linkCount}</h3>
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
            <h3>Links used: {linkCount}</h3>
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