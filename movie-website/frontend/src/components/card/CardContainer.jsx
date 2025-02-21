import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useGetMoviesQuery } from '../../app/features/movies/moviesApi';
import ShimmerCard from './ShimmerCard';

function CardContainer({ movieList }) {
    const { data, isLoading, isError } = useGetMoviesQuery(movieList);
    return (
        <div className='card-container grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]'>
            {
                isLoading
                    ?
                    Array.from({ length: 10 }, () => <ShimmerCard key={crypto.randomUUID()} />)
                    :
                    data?.results?.map((cardDetail) => <Card key={cardDetail.id} content={{
                        id: cardDetail.id,
                        poster: `https://image.tmdb.org/t/p/w342${cardDetail.poster_path}`,
                        title: cardDetail.title,
                        review: cardDetail.vote_average,
                        year: cardDetail.release_date
                    }} />)
            }
        </div>
    )
}

export default CardContainer