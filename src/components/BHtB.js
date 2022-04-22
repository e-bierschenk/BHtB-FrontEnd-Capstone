import { useState } from "react"
import { ApplicationViews } from "./ApplicationViews"
import { Navbar } from "../nav/Navbar"


export const BHtB = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("nutshell_user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("nutshell_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("nutshell_user") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("nutshell_user") !== null)
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