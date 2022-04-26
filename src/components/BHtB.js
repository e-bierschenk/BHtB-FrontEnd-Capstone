import { useState } from "react"
import { ApplicationViews } from "./ApplicationViews"

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
            <ApplicationViews 
                setAuthUser={setAuthUser}
                isAuthenticated={isAuthenticated}
                clearUser={clearUser} />
        </>
    )
}