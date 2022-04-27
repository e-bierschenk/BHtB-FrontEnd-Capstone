import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Navbar } from "./nav/Navbar"
import { Game } from "./game/Game"
import { Home } from "./home/Home"

export const ApplicationViews = ({ isAuthenticated, setAuthUser, clearUser }) => {
    const PrivateOutlet = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    }

    const WithNav = () => {
        return (
        <>
            <Navbar clearUser={clearUser} />
            <Outlet />
        </>
        )
    }

    const WithoutNav = () => {
        return <Outlet />
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateOutlet />} >
                    <Route path="/" element={<WithNav />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route element={<WithoutNav />}>
                        <Route path="/game" element={<Game />} />
                    </Route>
                </Route>

                <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
                <Route path="/register" element={<Register setAuthUser={setAuthUser} />} />
            </Routes>
        </>
    )
}