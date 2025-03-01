import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HeroSectionStyle.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import PosterSlide from "./PosterSlide";
import { useEffect, useState } from "react";
import {
  useGetMoviesQuery,
  useGetTVQuery,
} from "../../app/features/movies/tmdbApi";
import { useSelector } from "react-redux";
import { MOVIE_CATEGORY, TV_CATEGORY } from "../../appCategory";
import { useTranslation } from "react-i18next";

function HeroSection() {
  const { i18n } = useTranslation();
  const appCategory = useSelector((state) => state.appCategory);
  let { data, isLoading, isError } = {
    data: null,
    isLoading: null,
    isError: null,
  };
  if (appCategory === MOVIE_CATEGORY) {
    const {
      data: movieData,
      isLoading,
      isError,
    } = useGetMoviesQuery({ movieList: "popular", language: i18n.language });
    data = movieData;
  } else if (appCategory === TV_CATEGORY) {
    const {
      data: tvData,
      isLoading,
      isError,
    } = useGetTVQuery({ tvList: "popular", language: i18n.language });
    data = tvData;
  }
  return (
    <div className="hero-section-carousel-container absolute inset-0 rounded-2xl overflow-hidden border border-neutral-400 dark:border-neutral-700">
      <Swiper
        loop={data?.results?.length > 1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        onMouseEnter={(swiper) => swiper.autoplay.stop()}
        onMouseLeave={(swiper) => swiper.autoplay.start()}
      >
        {data?.results.map((movieInfo) => {
          return (
            <SwiperSlide key={movieInfo.id}>
              <PosterSlide
                content={{
                  id: movieInfo.id,
                  poster: `https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`,
                  title: movieInfo.title || movieInfo.name,
                  overview: movieInfo.overview,
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default HeroSection;
