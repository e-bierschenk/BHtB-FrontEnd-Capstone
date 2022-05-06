import "./ActorCard.css";
import React from "react";



export const ActorCard = ({ actor, handleClick, nextStep }) => {
    return (
        <>
            <div className={nextStep === actor.name || actor.name === "Kevin Bacon" ? "actor-card-next actor-card" : "actor-card"} id={actor.id} onClick={(event) => handleClick(event)}>
                <div className="card-content">
                    <div className="actor-div">
                        <img className="actor-image"
                            src={actor.image}
                            alt={actor.name} />
                    </div>
                    <div className="text-div">
                        <h2><span className="card-name">
                            {actor.name}
                        </span></h2>
                        <h3>As: <span className="card-rolename">
                            {actor.asCharacter}
                        </span></h3>
                    </div>
                </div>
            </div>
        </>
    )
}