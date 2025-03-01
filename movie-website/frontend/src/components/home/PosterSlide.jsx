import { FaPlay } from "react-icons/fa";
import { RiDownloadLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useGetDetailsQuery } from "../../app/features/movies/tmdbApi";
function PosterSlide({ content }) {
  const { t, i18n } = useTranslation();
  const appCategory = useSelector((state) => state.appCategory);
  const { data: movieDetails } = useGetDetailsQuery({
    appCategory,
    id: content.id,
    language: i18n.language,
  });

  return (
    <div className="poster-card relative w-full h-full text-white">
      <img loading="lazy" src={content.poster} alt="movie-poster" />
      <div className="overlay absolute inset-0 bg-gradient-to-tr from-black/40 dark:from-black/90 to-transparent flex flex-col gap-4 p-8 justify-between items-start">
        <div className="tag text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 backdrop-blur-3xl rounded-full">
          🔥 {t("nowPopular")}
        </div>
        <div className="movie-info text-start flex flex-col gap-4">
          <div className="category flex gap-4">
            {movieDetails &&
              movieDetails.genres.map((genres) => {
                return (
                  <div
                    key={genres.id}
                    className="px-1 md:px-2 md:py-1 text-xs md:text-sm backdrop-blur-3xl rounded-full"
                  >
                    {genres.name}
                  </div>
                );
              })}
          </div>
          <h1 className="text-2xl md:text-4xl tracking-wider font-black">
            {content.title}
          </h1>
          <div className="max-w-lg md:max-w-xl text-xs md:text-sm">
            {content.overview}
          </div>
          <div className="buttons flex gap-2">
            <button className="watch-now-button flex text-sm md:text-base items-center gap-2 bg-white hover:bg-white/80 cursor-pointer text-neutral-950 px-2 md:px-4 py-1 md:py-2 rounded-full">
              <FaPlay />
              <div>{t("watchNow")}</div>
            </button>
            <button className="download-button flex text-sm md:text-base  items-center gap-2 bg-neutral-950 border border-neutral-700 hover:bg-gray-800 cursor-pointer px-2 md:px-4 py-1 md:py-2 rounded-full">
              <RiDownloadLine />
              <div>{t("download")}</div>
            </button>
            <button className="download-button flex items-center gap-2 bg-neutral-950 border border-neutral-700 hover:bg-gray-800 cursor-pointer px-2 md:px-4 py-1 md:py-2 rounded-full">
              <HiOutlineDotsHorizontal />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosterSlide;
