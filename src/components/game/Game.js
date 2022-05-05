import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CardList } from "./cardlist/CardList"
import { CardSearch } from "./cardsearch/CardSearch"
import { getCastByMovieId, getMovieByMovieId, getMoviesByActorId } from "../../modules/imdbManager.js"
import { BreadCrumb } from "./breadcrumb/BreadCrumb"
import { trailToDbFormat } from "../../helpers/helpers"
import { addGame, getCoinsByUserId, updateCoinsByUserId, getTopActors } from "../../modules/baconManager"
import { GameClock } from "./gameclock/GameClock"
import { bfs } from "../../helpers/bfs"
import "./Game.css"

export const Game = () => {
    const [actor, setActor] = useState({})
    const [initialActor, setInitialActor] = useState({}) //initial actor, this is used to fix a bug in the breadcrumbtrail
    const [movie, setMovie] = useState({})
    const [actorMovie, setActorMovie] = useState("actor") //this state toggles back and forth between actor and movie
    const [filteredArray, setFilteredArray] = useState([]) //the filtered actor or movie array
    const [searchInputValue, setSearchInputValue] = useState("")
    const [trail, setTrail] = useState([])
    const [linkCount, setLinkCount] = useState(0) //count of actor links used
    const [normalClick, setNormalClick] = useState(1)  //used to control when sideEffects happen
    const [coins, setCoins] = useState(0)
    const [detailMovie, setDetailMovie] = useState({}) //state for the movie detail
    const [nextStep, setNextStep] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const navigate = useNavigate()

    const startTime = new Date().getTime()



    //functions to get a movie's actors or an actor's movies, and set state, get coins as well
    const getMovie = (movieId) => getCastByMovieId(movieId).then(setMovie)
    const getActor = (actorId) => getMoviesByActorId(actorId).then(setActor)
    const getCoins = (userId) => getCoinsByUserId(userId).then(setCoins)

    //click function for when the user clicks a card in the cardlist
    const handleCardClick = (event) => {
        //reset states of search input and filtered array when user clicks
        setSearchInputValue("")
        setFilteredArray([])
        setDetailMovie({})
        setNextStep("")
        setButtonDisabled(false)
        //check whether we are on an actor or movie step
        if (actorMovie === "actor") {
            //grab the movie and cast the user clicked
            getMovie(event.currentTarget.id)
                .then(() => setActorMovie("movie"))
                .then(() => setNormalClick(normalClick + 1))
        } else {
            //add one to link count
            const newCount = linkCount + 1
            setLinkCount(newCount)

            //check to see if the clicked actor is kevin bacon otherwise, keep looping through movie/actor steps
            if (event.currentTarget.id === "nm0000102") {
                //trigger end of game steps
                console.log("CONGRATS YOU LED KEVIN BACON HOME")

                const gameObj = {
                    userId: JSON.parse(sessionStorage.getItem("bacon_user")).id,
                    isWin: true,
                    score: linkCount + 1,
                    timeElapsed: new Date() - startTime,
                    breadcrumb: trailToDbFormat(trail)
                }
                addGame(gameObj)
                navigate("/")

            } else {
                getActor(event.currentTarget.id)
                    .then(() => setActorMovie("actor"))
                    .then(() => setNormalClick(normalClick + 1))
            }
        }

    }

    const handleDetailClick = movie => {
        //when user clicks get movie detials, get poster and movie info and set state for details
        getMovieByMovieId(movie.id).then(setDetailMovie)
    }

    const handleBreadClick = (crumb, index) => {
        //when user clicks a link in the breadcrumb trail, we will reset the count, movie/actor, and 
        //breadcrumb trail to where it was at that point in the game

        setNextStep("")
        setButtonDisabled(false)

        //set the link count
        const newCount = Math.floor(index / 2)
        setLinkCount(newCount)

        //slice breacrumbtrail and set new trail
        const newTrail = trail.slice(0, index + 1)
        setTrail(newTrail)

        //set movie or actor and actormovie and filtered array
        if (index % 2 === 0) {
            setActor(crumb)
            setActorMovie("actor")
            setFilteredArray(crumb.castMovies)
        } else {
            setMovie(crumb)
            setActorMovie("movie")
            setFilteredArray(crumb.actors)
        }

    }

    const handleCoinClick = () => {
        setButtonDisabled(true)
        const coinObj = {
            id: JSON.parse(sessionStorage.getItem("bacon_user")).id,
            baconbits: coins - 1
        }

        updateCoinsByUserId(coinObj)
            .then(res => setCoins(res.baconbits))
        const start = actorMovie === 'actor' ? actor.name : movie
        console.log(start)
        bfs(start)
            .then(optimalPath => setNextStep(optimalPath[1].value.split(" (")[0]))
    }

    const handleInputChange = (event) => {
        let filtered = []
        if (actorMovie === "actor") {
            filtered = actor.castMovies.filter(movie => movie.title.toLowerCase().includes(event.target.value.toLowerCase()))
        } else {
            filtered = movie.actors.filter(actor => actor.name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
        setSearchInputValue(event.target.value)
        setFilteredArray(filtered)
    }

    //at start of page get actor then set actor, get coins and set them
    useEffect(() => {
        //gets the top actor array(1000 long), then rolls a random number from 0-999, and sets that actor as the s
        getTopActors().then((res) => {
            const rand = Math.floor(Math.random() * 999)
            return res[rand].id
        })
            .then(startactorId => getActor(startactorId))
            .then(setInitialActor)
        getCoins(JSON.parse(sessionStorage.getItem("bacon_user")).id)
        document.body.className = "";
        document.body.className = "gameTheme";
    }, []);

    //after actor is set, update the filtered array to the full set of movies
    useEffect(() => {
        if (actorMovie === "actor") {
            setFilteredArray(actor.castMovies)
        } else {
            setFilteredArray(movie.actors)
        }
    }, [normalClick])

    //after movie is set, set the filtered array to the list of 
    useEffect(() => {
        setFilteredArray(actor.castMovies)
    }, [initialActor])


    return (
        <>
            <div className="game">
                <div className="hud">
                    <div className="left-hud">
                        <div className="img-div">
                            <img src="/images/KB_green_head.png" alt="Kevin Bacon Green"
                                className="logo-img" />
                        </div>
                        <h1 className="logo logo-title">BRINGING HOME THE BACON</h1>
                    </div>
                    <button className="btn btn-quit" onClick={() => navigate("/")}>ABANDON GAME</button>
                </div>

                <BreadCrumb actor={actor}
                    initialActor={initialActor}
                    movie={movie}
                    actorMovie={actorMovie}
                    setTrail={setTrail}
                    trail={trail}
                    handleClick={handleBreadClick}
                    normalClick={normalClick} />

                <div className="controls">
                    <div className="controls-left">
                        {!buttonDisabled ? <button className="btn btn-bacon"
                            onClick={handleCoinClick}>USE BACONBIT: {coins}</button> : <button className="btn btn-bacon"
                            onClick={handleCoinClick} disabled>HINT USED</button>}
                        
                        <CardSearch searchInputValue={searchInputValue} handleInputChange={handleInputChange} autoFocus />
                    </div>
                    <div className="controls-right">
                        <GameClock startTime={startTime} />
                        <h3>Connections: {linkCount}</h3>
                    </div>
                </div>
                    <CardList actor={actor}
                        movie={movie}
                        actorMovie={actorMovie}
                        filteredArray={filteredArray}
                        setFilteredArray={setFilteredArray}
                        searchInputValue={searchInputValue}
                        setSearchInputValue={setSearchInputValue}
                        handleClick={handleCardClick}
                        handleDetailClick={handleDetailClick}
                        detailMovie={detailMovie}
                        setDetailMovie={setDetailMovie}
                        nextStep={nextStep} />
            </div>
        </>
    )
}