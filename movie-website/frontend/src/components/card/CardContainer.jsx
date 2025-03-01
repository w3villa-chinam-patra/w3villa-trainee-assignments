import React, { useEffect, useState } from "react";
import Card from "./Card";
import {
  useGetMoviesQuery,
  useGetTVQuery,
} from "../../app/features/movies/tmdbApi";
import ShimmerCard from "./ShimmerCard";
import { useSelector } from "react-redux";
import { MOVIE_CATEGORY, TV_CATEGORY } from "../../appCategory";
import { useTranslation } from "react-i18next";

function CardContainer({ list }) {
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
    } = useGetMoviesQuery({ movieList: list, language: i18n.language });
    data = movieData;
  } else if (appCategory === TV_CATEGORY) {
    const {
      data: tvData,
      isLoading,
      isError,
    } = useGetTVQuery({ tvList: list, language: i18n.language });
    data = tvData;
  }
  return (
    <div className="card-container grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
      {isLoading
        ? Array.from({ length: 10 }, () => (
            <ShimmerCard key={crypto.randomUUID()} />
          ))
        : data?.results?.map((cardDetail) => (
            <Card
              key={cardDetail.id}
              content={{
                id: cardDetail.id,
                poster: `https://image.tmdb.org/t/p/w342${cardDetail.poster_path}`,
                title: cardDetail.title || cardDetail.name,
                review: cardDetail.vote_average,
                year: cardDetail.release_date || cardDetail.first_air_date,
              }}
            />
          ))}
    </div>
  );
}

export default CardContainer;
