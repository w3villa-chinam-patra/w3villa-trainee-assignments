import React, { useEffect, useState } from "react";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MOVIE_DETAILS_ROUTE } from "../../routes";

function TopVoted() {
  const vote = useSelector((state) => state.vote);
  const [topVoted, setTopVoted] = useState([]);
  useEffect(() => {
    if (vote) {
      const data = Object.entries(vote);
      data.sort((firstMovieDetail, secondMovieDetail) => {
        return (
          firstMovieDetail[1].downVotes.length -
          firstMovieDetail[1].upVotes.length -
          (secondMovieDetail[1].downVotes.length -
            secondMovieDetail[1].upVotes.length)
        );
      });
      setTopVoted(data);
    }
  }, [vote]);
  return (
    <section className="top-voted-section flex flex-col gap-4 max-w-3xl p-4 mx-auto">
      {topVoted.map((movieDetails, i) => {
        return (
          <Link
            to={`${MOVIE_DETAILS_ROUTE}/${movieDetails[0]}`}
            key={movieDetails[0]}
            className="w-full flex gap-2 relative justify-between items-start border border-neutral-400 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 p-2 rounded-2xl"
          >
            <div className="ranking absolute -left-4 top-4 p-2 w-10 h-10 flex items-center justify-center rounded-full border border-emerald-400 dark:border-emerald-500 bg-emerald-300 dark:bg-emerald-600">
              {i + 1}
            </div>
            <div className="movie-info flex gap-4">
              <img
                src={`https://image.tmdb.org/t/p/w92${movieDetails[1].posterPath}`}
                alt="poster"
                className="rounded-2xl"
              />
              <div className="title md:text-xl font-semibold">
                {movieDetails[1].title}
              </div>
            </div>
            <div className="voting-system flex text-4xl gap-2">
              <div className="downvote text-center">
                <HiThumbDown
                  className={`cursor-pointer border-2 border-red-300 bg-red-500/60 rounded-full p-1`}
                />
                <div className="downvote-count text-xs my-1 text-neutral-500">
                  {(vote &&
                    Object.keys(vote).length &&
                    vote[movieDetails[0]]?.downVotes?.length) ||
                    0}
                </div>
              </div>
              <div className="upvote text-center">
                <HiThumbUp
                  className={`cursor-pointer border-2 border-green-300 bg-green-500/60 rounded-full p-1`}
                />
                <div className="downvote-count text-xs my-1 text-neutral-500">
                  {(vote &&
                    Object.keys(vote).length &&
                    vote[movieDetails[0]]?.upVotes?.length) ||
                    0}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default TopVoted;
