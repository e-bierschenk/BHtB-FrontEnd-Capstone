import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGamesByUserId } from "../../modules/baconManager"
import { ListDetails } from "./ListDetails"
import "./Home.css"

export const Home = () => {
    const [myGames, setMyGames] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [detailGame, setDetailGame] = useState({})

    const navigate = useNavigate()

    const handleGameClick = game => {
        //convert left side to game details
        setShowDetails(true)
        setDetailGame(game)
    }

    const getGames = () => {
        getGamesByUserId(JSON.parse(sessionStorage.getItem("bacon_user")).id)
            .then(res => setMyGames(res))
    }

    useEffect(() => {
        getGames()
        document.body.className = "";
        document.body.className = "mainTheme";
    }, [])

    useEffect(() => {
        getGames()
    }, [showDetails])

    return (
        <>
            <div className="home">
                <div className="play">
                    {!showDetails ?
                        <>
                            <h2>How to play:</h2>
                            <p>Bringing Home the Bacon is a <a className="text-link" href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon" target="_blank">six-degrees of Kevin Bacon</a> game, where you are tasked to connect a random starting actor by connecting them to another actor via a film that both actors have appeared in together.  Repeat the process until you reach Kevin Bacon.  Try to do it in the fewest links possible to get a high score!</p>

                            <button className="btn start-btn" onClick={() => navigate("/game")}>START GAME</button>
                        </>
                        :
                        <ListDetails game={detailGame}
                            setShowDetails={setShowDetails} />
                    }
                </div>

                <aside className="myGames">
                    <h2 className="game-title">My Games</h2>
                    <hr></hr>
                    <GamesList myGames={myGames}
                    handleGameClick={handleGameClick}/>
                </aside>
            </div>
        </>
    )
}

const GamesList = ({myGames, handleGameClick}) => {
    return (
        <ul className="games-list">
            {myGames.map(game => <>
                <li className="list-item"
                    key={game.id}
                    onClick={() => handleGameClick(game)}>{game.breadcrumb.split(";")[0]} to Kevin Bacon: {game.score} Connections; {(game.timeElapsed / 100)}s
                </li>
            </>
            )}
        </ul>
    )
}