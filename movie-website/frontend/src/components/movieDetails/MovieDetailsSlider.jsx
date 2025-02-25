import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './MovieDetailsSliderStyle.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { MOVIE_DETAILS_ROUTE } from '../../routes';

function MovieDetailsSlider({ slideData }) {
    return (
        <div className='recommendation-slider-container w-full'>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {
                    slideData?.results?.map(slideData =>
                        <SwiperSlide key={slideData.id} >
                            <Link to={`${MOVIE_DETAILS_ROUTE}/${slideData?.id}`} className='block w-max'>
                                <img src={`https://image.tmdb.org/t/p/w300${slideData?.poster_path}`} alt="recommended movies" className='h-82 rounded-2xl' />
                            </Link>
                        </SwiperSlide>

                    )
                }
            </Swiper>
        </div>
    )
}

export default MovieDetailsSlider