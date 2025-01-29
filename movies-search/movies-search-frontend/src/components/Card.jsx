import { CiBookmark } from "react-icons/ci";

function Card() {
    const onMouseEnterHandler = (event) => {
        // setting the opacity of the movie-details div to 1
        const movieDetails = [...[...event.currentTarget.children].at(-1).children][0];
        movieDetails.style.opacity = "1";
    }
    const onMouseLeaveHandler = (event) => {
        // setting the opacity of the movie-details div to 0
        const movieDetails = [...[...event.currentTarget.children].at(-1).children][0];
        movieDetails.style.opacity = "0";
    }
    return (
        <div className='card-container' onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
            <div className="bookmark">
                <CiBookmark />
            </div>
            <div className="image-container">
                <img src="https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_.jpg" alt="movies" />
                <div className="gradient-overlay"></div>
            </div>
            <div className="movie-info">
                <div className="movie-details">
                    movie details
                </div>
                <div className="movie-name">
                    Spiderman into the SpiderVerse
                </div>
            </div>
        </div>
    )
}

export default Card