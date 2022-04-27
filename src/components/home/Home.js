import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGamesByUserId } from "../../modules/baconManager"
import "./Home.css"

export const Home = () => {
    const [myGames, setMyGames] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getGamesByUserId(JSON.parse(sessionStorage.getItem("bacon_user")).id)
            .then(res => setMyGames(res))
            .then(() => console.log(myGames))
        document.body.className = "";
        document.body.className = "mainTheme";
    }, [])

    return (
        <>
            <div className="home">
                <div className="play">
                    <h2>How to play:</h2>
                    <p>Bringing Home the Bacon is a <a className="text-link" href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon" target="_blank">six-degrees of Kevin Bacon</a> game, where you are tasked to connect a random starting actor by connecting them to another actor via a film that both actors have appeared in together.  Repeat the process until you reach Kevin Bacon.  Try to do it in the fewest links possible to get a high score!</p>

                    <button onClick={() => navigate("/game")}>START GAME</button>
                </div>

                <aside className="myGames">
                    <h2 className="game-title">My Games</h2>
                    <hr></hr>
                    <ul className="games-list">
                        {myGames.map(game => <>
                            <li className="list-item">{game.breadcrumb.split(";")[0]} to Kevin Bacon: {game.score} Connections; {game.timeElapsed / 100}s
                            </li>
                        </>
                        )}
                    </ul>
                </aside>
            </div>
        </>
    )
}