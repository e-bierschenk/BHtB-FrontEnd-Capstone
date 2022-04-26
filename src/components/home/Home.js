import { useEffect, useState } from "react"
import { getGamesByUserId } from "../../modules/baconManager"


export const Home = () => {
    const [myGames, setMyGames] = useState([])

    useEffect(() => {
        getGamesByUserId(JSON.parse(sessionStorage.getItem("bacon_user")).id)
            .then(res => setMyGames(res))
            .then(() => console.log(myGames))
    }, [])

    return (
        <>
            <h1>Welcome to Bringing Home the Bacon</h1>
            <h3>How to play:</h3>
            <p>Bringing Home the Bacon is a <a href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon" target="_blank">six-degrees of Kevin Bacon</a> game, where you are tasked to connect a random starting actor by connecting them to another actor via a film that both actors have appeared in together.  Repeat the process until you reach Kevin Bacon.  Try to do it in the fewest links possible to get a high score!</p>

            <aside>
                <h2>My Games</h2>
                <ul>
                    {myGames.map(game => <>
                        <li>
                            <h3>{game.breadcrumb + ";Kevin Bacon"}</h3>
                            <p>Links: {game.score}</p>
                            <p>Time: {game.timeElapsed / 100}s</p>
                        </li>
                    </>
                    )}
            </ul>
        </aside>
        </>
    )
}