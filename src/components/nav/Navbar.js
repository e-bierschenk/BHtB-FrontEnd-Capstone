import { Link } from "react-router-dom"
import "./Navbar.css"


export const Navbar = ({ clearUser }) => {

    return (
        <nav className="navbar">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">HOME</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/game">START GAME</Link>
                </li>
            </ul>
            <h1 className="logo">BRINGING HOME THE BACON</h1>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link logout" onClick={() => clearUser()} to="/">logout</Link>
                </li>
            </ul>
        </nav>
    )
}