import React from 'react'

function CastCard({ castDetail }) {
    return (
        <div className='cast-card'>
            <div className="image-container h-30 w-28">
                <img className='rounded-2xl overflow-hidden object-cover h-full w-full' src={`https://image.tmdb.org/t/p/w300${castDetail.profile_path}`} alt="cast-image" />
            </div>
            <div className="cast-info my-4">
                <div className="name">{castDetail.name}</div>
                <div className="department text-sm text-neutral-400 my-2">{castDetail.known_for_department}</div>
            </div>
        </div>
    )
}

export default CastCard