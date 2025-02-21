import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import './SliderStyle.css';

import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useGetMoviesQuery } from '../../app/features/movies/moviesApi';

function Slider({ movieList }) {
    const { data, isLoading, isError } = useGetMoviesQuery(movieList)
    return (
        <div className="slider-container mx-auto">
            <Swiper
                loop={data?.results?.length > 1} // Enables infinite looping
                autoplay={{
                    delay: 1000, // Auto-slide every 3 seconds
                    disableOnInteraction: false, // Keeps autoplay active after user interaction
                }}
                effect={'coverflow'}
                // grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                speed={1000}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Autoplay]}
            >
                {
                    data?.results?.map((slideDetail) => <SwiperSlide key={slideDetail.id}>
                        <img loading='lazy' className='rounded-2xl object-cover' src={`https://image.tmdb.org/t/p/w300${slideDetail.poster_path}`} />
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    )
}

export default Slider