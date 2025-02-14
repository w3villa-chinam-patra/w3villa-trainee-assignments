import React, { useEffect, useState } from 'react'
import Card from './Card'

function CardContainer({ movieList }) {
    const [cardDetails, setCardDetails] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDkwODQwNWU1YmE0ZDkxZWY4ZDVmMGJhNjdlYzBlYiIsIm5iZiI6MTczOTUxNDU5OS45NjcsInN1YiI6IjY3YWVlMmU3ODBmNzZkNjFlYjhlNjExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qAwS8WFJ95sg0-v6S_WUkqlqx0l5czPqEX2No6rc6oM'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieList}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setCardDetails(res.results))
            .catch(err => console.error(err));
    }, [])
    return (
        <div className='card-container grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]'>
            {
                cardDetails?.map((cardDetail) => <Card key={cardDetail.id} content={{
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