import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import './SliderStyle.css';

import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

function Slider({ movieList }) {
    const [slideDetails, setSlideDetails] = useState(null);
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
            .then(res => setSlideDetails(res.results))
            .catch(err => console.error(err));
    }, [])
    return (
        <div className="slider-container">
            <Swiper
                loop={slideDetails?.length > 1} // Enables infinite looping
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
                    slideDetails?.map((slideDetail) => <SwiperSlide key={slideDetail.id}>
                        <img className='rounded-2xl' src={`https://image.tmdb.org/t/p/w342${slideDetail.poster_path}`} />
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    )
}

export default Slider