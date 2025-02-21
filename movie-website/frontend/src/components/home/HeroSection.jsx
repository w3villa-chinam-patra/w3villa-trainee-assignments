import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "./HeroSectionStyle.css";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import PosterSlide from './PosterSlide';
import { useEffect, useState } from 'react';
import { useGetMoviesQuery } from '../../app/features/movies/moviesApi';

function HeroSection() {
    const { data, isLoading, isError } = useGetMoviesQuery("popular");
    return (
        <div className='hero-section-carousel-container absolute inset-0 rounded-2xl overflow-hidden border border-neutral-700'>
            <Swiper
                loop={data?.results?.length > 1}
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
                    data?.results.map((movieInfo) => {
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