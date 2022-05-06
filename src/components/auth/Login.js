import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom"
import { netlifyConfig } from "../../helpers/apiKeys";
import "./Login.css"

export const Login = ({ setAuthUser }) => {
    const email = useRef()
    const existDialog = useRef()
    const navigate = useNavigate()

    const existingUserCheck = () => {
        return fetch(`${netlifyConfig.baconUrl}/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    setAuthUser(exists)
                    navigate("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    useEffect(() => {
        document.body.className = "mainTheme"
    }, [])

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="btn" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Bringing Home the Bacon</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button className="btn btn-login" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

