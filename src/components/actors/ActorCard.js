import "./Card.css";
import React from "react";



export const ActorCard = ({ actor, handleClick }) => {
    return (
        <>
            <div className="card" id={actor.id} onClick={(event) => handleClick(event)}>
                <div className="card-content">
                    <h2><span className="card-name">
                        {actor.name}
                        </span></h2>
                    <picture>
                        <img src={actor.image} alt={actor.name} />
                    </picture>
                    <h3>As: <span className="card-rolename">
                        {actor.asCharacter}
                    </span></h3>
                </div>
            </div>
        </>
    )
}