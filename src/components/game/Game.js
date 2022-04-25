import { useState, useEffect } from "react"
import { CardList } from "./cardlist/CardList"
import { getCastByMovieId, getMoviesByActorId } from "../../modules/imdb-api.js"
import { BreadCrumb } from "./breadcrumb/BreadCrumb"


export const Game = () => {
    const [actor, setActor] = useState({})
    const [initialActor, setInitialActor] = useState({}) //initial actor, this is used to fix a bug in the breadcrumbtrail
    const [movie, setMovie] = useState({})
    const [actorMovie, setActorMovie] = useState("actor") //this state toggles back and forth between actor and movie
    const [linkCount, setLinkCount] = useState(0) //count of actor links used
    const [filteredArray, setFilteredArray] = useState([]) //
    const [searchInputValue, setSearchInputValue] = useState("")
    const [trail, setTrail] = useState([])

    //these are used for testing, remove later
    let startmovieId = "tt0110413"
    let startactorId = "nm0000204"

    //functions to get a movie's actors or an actor's movies, and set state
    const getMovie = (movieId) => getCastByMovieId(movieId).then(setMovie)
    const getActor = (actorId) => getMoviesByActorId(actorId).then(setActor)

    const handleCardClick = (event) => {
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
            //add one to link count
            const newCount = linkCount + 1
            setLinkCount(newCount)

            //check to see if the clicked actor is kevin bacon otherwise, keep looping through movie/actor steps
            if (event.currentTarget.id === "nm0000102") {
                //trigger end of game steps
                console.log("CONGRATS YOU LED KEVIN BACON HOME")
                console.log("ENDGAME STEPS HAPPEN NOW")
            } else {
                getActor(event.currentTarget.id)
                    .then(() => setActorMovie("actor"))
            }
        }
    }

    const handleBreadClick = (event, crumb, index) => {

        //when user clicks a link in the breadcrumb trail, we will reset the count, movie/actor, and 
        //breadcrumb trail to where it was at that point in the game
        
        //set the link count
        const newCount = Math.floor(index / 2)
        setLinkCount(newCount)
    
        //slice breacrumbtrail and set new trail
        const newTrail = trail.slice(0, index + 1)
        console.log("NewTrail: ", newTrail)
        setTrail(newTrail)

        //set movie or actor and actormovie 
        if (index % 2 === 0) {
            const newActor = newTrail[index]
            setActor(newActor)
            setActorMovie("actor")  
        } else {
            const newMovie = newTrail[index]
            setMovie(newMovie)
            setActorMovie("movie") 
        }
            
    }

    //at start of page get actor then set actor
    useEffect(() => {
        getActor(startactorId).then(setInitialActor)
    }, []);

    //after actor is set, update the filtered array to the full set of movies
    useEffect(() => {
        setFilteredArray(actor.castMovies)
    }, [actor])

    //after movie is set, set the filtered array to the list of 
    useEffect(() => {
        setFilteredArray(movie.actors)
    }, [movie])


    return (
        <>
            <h1>GAME VIEW</h1>
            <BreadCrumb actor={actor}
                initialActor={initialActor}
                movie={movie}
                actorMovie={actorMovie}
                setTrail={setTrail}
                trail={trail}
                handleClick={handleBreadClick} />
            <h3>Links Used: {linkCount}</h3>
            <CardList actor={actor}
                movie={movie}
                actorMovie={actorMovie}
                filteredArray={filteredArray}
                setFilteredArray={setFilteredArray}
                searchInputValue={searchInputValue}
                setSearchInputValue={setSearchInputValue} 
                handleClick={handleCardClick} />
        </>
    )
}