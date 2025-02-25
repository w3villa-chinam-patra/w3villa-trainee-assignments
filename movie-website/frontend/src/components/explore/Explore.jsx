import React, { useEffect, useRef, useState } from 'react'
import { useDiscoverMoviesQuery, useGetSearchResultsQuery } from '../../app/features/movies/moviesApi'
import Card from '../card/Card';
import { useDispatch, useSelector } from 'react-redux';
import ShimmerCard from '../card/ShimmerCard';

function Explore() {
    const [page, setPage] = useState(1)
    const genreFilter = useSelector(store => store.filter)
    const { data, isLoading, isError } = useDiscoverMoviesQuery({ page, genreId: genreFilter.id })
    const [exploreData, setExploreData] = useState([]);
    const searchInput = useSelector((state) => state.search);
    const { data: searchResults, isFetching } = useGetSearchResultsQuery(searchInput);
    const dispatch = useDispatch();
    const exploreSectionRef = useRef()

    // infinite scrolling login starts here
    useEffect(() => {
        const scrollEventHandler = () => {
            const clientHeight = exploreSectionRef.current?.parentElement.clientHeight
            const scrollTop = exploreSectionRef.current?.parentElement.scrollTop
            const scrollHeight = exploreSectionRef.current?.parentElement.scrollHeight
            if (scrollTop >= scrollHeight - (2 * clientHeight + 50)) {
                if (searchInput.length === 0)
                    setPage(prev => prev + 1)
            }
        }
        exploreSectionRef.current?.parentElement.addEventListener('scroll', scrollEventHandler)
        return () => {
            exploreSectionRef.current?.parentElement.removeEventListener('scroll', scrollEventHandler)
        }
    }, [])
    // infinite scrolling login ends here

    useEffect(() => {
        setExploreData([]);
        setPage(1);
    }, [genreFilter])

    useEffect(() => {
        if (data) {
            setExploreData((prev) => prev.concat(data.results));
        }
    }, [data])


    return (
        <section ref={exploreSectionRef} className='card-container grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]'>
            {
                searchInput !== ""
                    ?
                    isFetching
                        ?
                        Array.from({ length: 5 }, () => <ShimmerCard key={crypto.randomUUID()} />)
                        :
                        searchResults?.results.length
                            ?
                            searchResults?.results?.map((searchResult) =>
                                <Card key={crypto.randomUUID()} content={{
                                    id: searchResult.id,
                                    poster: `https://image.tmdb.org/t/p/w342${searchResult.poster_path}`,
                                    title: searchResult.title,
                                    review: searchResult.vote_average,
                                    year: searchResult.release_date
                                }} />
                            )
                            :
                            <div className='w-full flex justify-center items-center text-neutral-600'>No result found</div>
                    :
                    (() => {
                        const exploreDisplayData = exploreData?.map((cardDetail) => <Card key={crypto.randomUUID()} content={{
                            id: cardDetail.id,
                            poster: `https://image.tmdb.org/t/p/w342${cardDetail.poster_path}`,
                            title: cardDetail.title,
                            review: cardDetail.vote_average,
                            year: cardDetail.release_date
                        }} />)
                        return [...exploreDisplayData, ...Array.from({ length: window.innerWidth <= 768 ? 1 : 5 }, () => <ShimmerCard key={crypto.randomUUID()} />)]
                    })()


            }
        </section>
    )
}

export default Explore