import React from 'react'
import { MdFavoriteBorder } from 'react-icons/md'

function ShimmerCard() {
    return (
        <div className="shimmer-card-container p-2 w-full">
            <div className='relative flex flex-col rounded-2xl cursor-pointer p-3 bg-neutral-900 animate-pulse max-w-[250px] mx-auto '>
                <div className="image-container relative w-full h-72 rounded-2xl overflow-hidden border bg-neutral-700 border-neutral-600">
                </div>
                <div className="favorite-icon absolute flex justify-center items-center bg-neutral-800/60 border border-neutral-500 text-white text-2xl rounded-full right-0 top-0 p-1.5">
                    {
                        <MdFavoriteBorder className="text-neutral-500" />
                    }
                </div>
                <div className="movie-info-container flex my-4 items-center justify-between">
                    <div className="review flex items-center gap-2 px-3 py-1 bg-white/30 rounded-full backdrop-blur-3xl">
                        <div className="star-container w-5">
                            <img src="/assets/star.png" alt="star" className='w-full' />
                        </div>
                        <div className="rating text-sm mt-1">{ }</div>
                    </div>
                    <div className="movie-title-and-year me-1 text-end flex flex-col items-end gap-1 ps-2">
                        <div className="movie-title bg-neutral-700 py-2 px-14 rounded-full"></div>
                        <div className="movie-year bg-neutral-700 py-2 px-6 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShimmerCard