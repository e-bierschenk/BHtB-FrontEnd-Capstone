import { useEffect } from "react"
import "./BreadCrumb.css"

export const BreadCrumb = ({ actor, initialActor, movie, actorMovie, trail, setTrail, handleClick, normalClick }) => {

    useEffect(() => {
        const tempTrail = trail
        actorMovie === "actor" ? tempTrail.push(actor) : tempTrail.push(movie)
        setTrail(tempTrail)  
    }, [normalClick])

    useEffect(() => {
        setTrail([actor])
    }, [initialActor])

    return (
        <>
            <div className="breadcrumb">
            {trail.map((crumb, index) => {
                //the hell of ternary statements below formats the output such that we don't display 
                //so and so was in ___movie on the first time through
                return <>
                    {index === 0 ? "" : index % 2 === 0 ? <p><b>&nbsp;with&nbsp;</b></p> : <p><b>&nbsp;was in&nbsp;</b></p>}
                    <Crumb key={`bread--${index}`}
                        crumb={crumb}
                        index={index}
                        handleClick={handleClick} />
                </>

            })}
            </div>
        </>
    )
}

const Crumb = ({ crumb, index, handleClick }) => {

    return (
        <p className="crumb" onClick={() => handleClick(crumb, index)}>
            {index % 2 === 0 ? crumb.name : crumb.title}
        </p>
    )
}