import { useState } from "react"
import { ApplicationViews } from "./ApplicationViews"
import { Navbar } from "../nav/Navbar"


export const BHtB = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("bacon_user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("bacon_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("bacon_user") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("bacon_user") !== null)
    }


    return (
        <>
            <Navbar clearUser={clearUser} />
            <ApplicationViews 
                setAuthUser={setAuthUser}
                isAuthenticated={isAuthenticated}/>
        </>
    )
}