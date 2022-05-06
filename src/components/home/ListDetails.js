import "./ListDetails.css"
import { deleteGame } from "../../modules/baconManager"

export const ListDetails = ({ game, setShowDetails }) => {
    const breadArray = game.breadcrumb.split(";")
    breadArray.push("Kevin Bacon")

    const handleDelete = game => {
        deleteGame(game)
        setShowDetails(false)
    }
    return (
        <>
            <h2>Game Details</h2>
            <p>You connected {breadArray[0]} to Kevin Bacon in {game.score} steps.</p>
            <p>It took you {(game.timeElapsed / 1000).toFixed(2)}s</p>
            <h3>Path:</h3>
            <p>{breadArray.map((element, index) => {
                let conjunction = ""
                if (index < breadArray.length - 1) {
                    conjunction = index % 2 === 0 ? " WAS IN " : " WITH "
                }
                return `${element} ${conjunction}`
            })}
            </p>

            <button className="btn btn-delete"
                onClick={() => handleDelete(game)}>DELETE GAME</button>

            <button className="btn btn-delete"
                onClick={() => setShowDetails(false)}>CLOSE DETAILS</button>            

        </>
    )
}