import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useGetMoviesQuery, useGetTVQuery } from "../../app/features/movies/tmdbApi";
import ShimmerCard from "./ShimmerCard";
import { useSelector } from "react-redux";
import { MOVIE_CATEGORY, TV_CATEGORY } from "../../appCategor";

function CardContainer({ list }) {
  const appCategory = useSelector((state) => state.appCategory);
  let { data, isLoading, isError } = {
    data: null,
    isLoading: null,
    isError: null,
  };
  if (appCategory === MOVIE_CATEGORY) {
    const { data: movieData, isLoading, isError } = useGetMoviesQuery(list);
    data = movieData;
  } else if (appCategory === TV_CATEGORY) {
    const { data: tvData, isLoading, isError } = useGetTVQuery(list);
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
                title: cardDetail.title,
                review: cardDetail.vote_average,
                year: cardDetail.release_date,
              }}
            />
          ))}
    </div>
  );
}

export default CardContainer;
