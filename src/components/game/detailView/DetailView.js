import { useEffect, useState } from "react"
import "./DetailView.css"

export const DetailView = ({ actor, detailMovie, setDetailMovie }) => {
    

    return (
        <>
            {detailMovie.title ? 
            <button className=".btn"
                onClick={() => setDetailMovie({})}>CLOSE DETAILS</button>
            : 
            <div className="detail-container">
                <h2>Details</h2>
                <div className="detail-div">
                    <img className="detail-img"
                    src={actor?.image} 
                    alt={actor?.name}></img>
                </div>
                <p>{actor?.summary}</p>
            </div>
            }
        </>
    )
}