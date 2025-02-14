import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "./HeroSectionStyle.css";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import PosterSlide from './PosterSlide';
import { useEffect, useState } from 'react';

function HeroSection() {
    const [popularMovies, setPopularMovies] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDkwODQwNWU1YmE0ZDkxZWY4ZDVmMGJhNjdlYzBlYiIsIm5iZiI6MTczOTUxNDU5OS45NjcsInN1YiI6IjY3YWVlMmU3ODBmNzZkNjFlYjhlNjExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qAwS8WFJ95sg0-v6S_WUkqlqx0l5czPqEX2No6rc6oM'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => { setPopularMovies(res.results) })
            .catch(err => console.error(err));
    }, [])
    return (
        <div className='hero-section-carousel-container absolute inset-4 rounded-2xl overflow-hidden border border-neutral-700'>
            <Swiper
                loop={popularMovies?.length > 1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Navigation, Autoplay, Pagination]}
                slidesPerView={1}
                onMouseEnter={(swiper) => swiper.autoplay.stop()}
                onMouseLeave={(swiper) => swiper.autoplay.start()}
            >
                {
                    popularMovies.map((movieInfo) => {
                        return <SwiperSlide key={movieInfo.id}>
                            <PosterSlide content={{
                                id: movieInfo.id,
                                poster: `https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`,
                                title: movieInfo.title,
                                overview: movieInfo.overview,
                            }} />
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div >
    )
}

export default HeroSection