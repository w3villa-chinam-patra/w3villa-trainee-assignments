import React from 'react'

function Card({ content }) {
    return (
        <div className='transition-all duration-200 flex flex-col rounded-2xl cursor-pointer hover:scale-105 p-3'>
            <div className="image-container relative w-full h-72 rounded-2xl overflow-hidden border border-neutral-700">
                <img src={content.poster} alt="movie-poster" className='w-full h-full object-cover' />
                <div className="overlay absolute inset-0 bg-linear-to-b from-transparent to-black/50"></div>
            </div>
            <div className="movie-info-container flex my-4 items-center justify-between">
                <div className="review flex items-center gap-2 px-3 py-1 bg-white/30 rounded-full backdrop-blur-3xl">
                    <div className="star-container w-5">
                        <img src="/assets/star.png" alt="star" className='w-full' />
                    </div>
                    <div className="rating text-sm mt-1">{content.review.toFixed(1)}</div>
                </div>
                <div className="movie-title-and-year me-1 text-end flex flex-col items-end gap-1 ps-2">
                    <div className="movie-title text-sm font-semibold">{content.title}</div>
                    <div className="movie-year text-xs text-neutral-400">{content.year.split("-")[0]}</div>
                </div>
            </div>
        </div>
    )
}

export default Card