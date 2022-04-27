import { Link } from "react-router-dom"
import "./Navbar.css"


export const Navbar = ({ clearUser }) => {

    return (
        <nav className="navbar">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/game">Start Game</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={() => clearUser()} to="/">Logout</Link>
                </li>
            </ul>
        </nav>
    )
}