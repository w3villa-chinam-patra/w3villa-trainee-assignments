import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./MovieTVDetailsSliderStyle.css";

// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { MOVIE_DETAILS_ROUTE } from "../../routes";
import { useSelector } from "react-redux";

function MovieDetailsSlider({ slideData }) {
  const appCategory = useSelector((state) => state.appCategory);
  return (
    <div className="slider-container w-full">
      <Swiper
        slidesPerView={"auto"}
        // spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {slideData?.results?.map((slideData) => (
          <SwiperSlide key={slideData.id}>
            <Link
              to={`${MOVIE_DETAILS_ROUTE}/${appCategory}/${slideData?.id}`}
              className="block w-max mx-auto"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${slideData?.poster_path}`}
                alt="recommended movies"
                className="h-82 rounded-2xl"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieDetailsSlider;
