import { FaPlay } from "react-icons/fa";
import { RiDownloadLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
function PosterSlide({ content }) {
    const [movieDetails, setMovieDetails] = useState(null);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDkwODQwNWU1YmE0ZDkxZWY4ZDVmMGJhNjdlYzBlYiIsIm5iZiI6MTczOTUxNDU5OS45NjcsInN1YiI6IjY3YWVlMmU3ODBmNzZkNjFlYjhlNjExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qAwS8WFJ95sg0-v6S_WUkqlqx0l5czPqEX2No6rc6oM'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${content.id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setMovieDetails(res))
            .catch(err => console.error(err));
    }, [])
    return (
        <div className='poster-card relative w-full h-full text-white'>
            <img loading="lazy" src={content.poster} alt="movie-poster" />
            <div className="overlay absolute inset-0 bg-gradient-to-tr from-black/90 to-transparent flex flex-col gap-4 p-8 justify-between items-start">
                <div className="tag text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 backdrop-blur-3xl rounded-full">
                    🔥 Now Popular
                </div>
                <div className="movie-info text-start flex flex-col gap-4">
                    <div className="category flex gap-4">
                        {
                            movieDetails && movieDetails.genres.map((genres) => {
                                return <div key={genres.id} className='px-1 md:px-2 md:py-1 text-xs md:text-sm backdrop-blur-3xl rounded-full'>{genres.name}</div>
                            }
                            )
                        }
                    </div>
                    <h1 className='text-2xl md:text-4xl tracking-wider font-black'>{content.title}</h1>
                    <div className='max-w-lg md:max-w-xl text-xs md:text-sm'>
                        {content.overview}
                    </div>
                    <div className="buttons flex gap-2">
                        <button className="watch-now-button flex text-sm md:text-base items-center gap-2 bg-white hover:bg-white/80 cursor-pointer text-neutral-950 px-2 md:px-4 py-1 md:py-2 rounded-full">
                            <FaPlay />
                            <div>Watch Now</div>
                        </button>
                        <button className="download-button flex text-sm md:text-base  items-center gap-2 bg-neutral-950 border border-neutral-700 hover:bg-gray-800 cursor-pointer px-2 md:px-4 py-1 md:py-2 rounded-full">
                            <RiDownloadLine />
                            <div>Download</div>
                        </button>
                        <button className="download-button flex items-center gap-2 bg-neutral-950 border border-neutral-700 hover:bg-gray-800 cursor-pointer px-2 md:px-4 py-1 md:py-2 rounded-full">
                            <HiOutlineDotsHorizontal />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PosterSlide