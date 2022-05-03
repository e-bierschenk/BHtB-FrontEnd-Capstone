import "./DetailView.css"

export const DetailView = ({ actor, detailMovie, setDetailMovie }) => {


    return (
        <>
            {detailMovie.title ?
                <div className="detail-container">
                    <h2>Details</h2>
                    <div className="detail-div">
                        <img className="detail-img"
                            src={detailMovie?.image}
                            alt={detailMovie?.title}></img>
                    </div>
                    <h3>{detailMovie?.title} - {detailMovie?.year}</h3>
                    <p>{detailMovie?.plot}</p>
                    <button className=".btn btn-close-detail"
                        onClick={() => setDetailMovie({})}>CLOSE DETAILS</button>
                </div>
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