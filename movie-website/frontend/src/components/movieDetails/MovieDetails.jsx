import React from 'react'
import { useGetMovieDetailsQuery } from '../../app/features/movies/moviesApi'
import { useParams } from 'react-router-dom'
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { db } from "../../service/firebase";
import { setUser } from "../../app/features/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function MovieDetails() {
  const params = useParams();
  const { data, isLoading, isError } = useGetMovieDetailsQuery(params.movieId)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const favoriteHandler = async () => {
    const docRef = doc(db, "Users", user.uid);
    try {
      if (user.favorites.includes(Number(params.movieId))) {
        dispatch(setUser({ ...user, favorites: user.favorites.filter((movieId) => Number(params.movieId) !== movieId) }))
        await updateDoc(docRef, {
          favorites: arrayRemove(Number(params.movieId))
        })
      }
      else {
        dispatch(setUser({ ...user, favorites: [...user.favorites, Number(params.movieId)] }))
        await updateDoc(docRef, {
          favorites: arrayUnion(Number(params.movieId))
        })
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section className='movie-details-section relative h-full w-full border border-neutral-700 rounded-2xl overflow-y-auto text-white'>
      <img src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt="backdrop-image" className='w-full h-full object-cover' />
      <div className="overlay absolute inset-0 bg-gradient-to-t from-neutral-950 to-neutral-950/20 flex flex-col gap-4 p-8 justify-between items-start"></div>
      <div className="movie-details absolute inset-0">
        {/* md:grid md:grid-cols-[auto_auto] */}
        <div className="p-2 lg:p-6">
          <div className="movie-title-ratings flex justify-between gap-0 md:gap-2 items-center p-4">
            <div className="movie-title flex flex-col items-start w-full">
              <div className="title text-4xl lg:text-5xl font-black">{data?.title}</div>
              <div className="movie-tagline my-2 text-base lg:text-xl font-medium">{data?.tagline}</div>
              <div className="release-date-and-review-container flex gap-2 justify-between flex-wrap w-full items-center">
                <div className="release-date flex flex-wrap gap-1 text-sm lg:text-base my-2">
                  <div className='font-medium text-nowrap bg-white/50 px-2 py-1 rounded-full backdrop-blur-3xl'>Release Date:</div>
                  <div className='text-nowrap bg-white/30 px-2 py-1 rounded-full backdrop-blur-3xl'>{new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format((new Date(data?.release_date || "2024/12/1")))}</div>
                </div>
                <div className="review flex items-center gap-1 md:gap-2 px-2 lg:px-4 lg:py-1 bg-white/30 rounded-full backdrop-blur-3xl">
                  <div className="star-container w-6">
                    <img src="/assets/star.png" alt="star" className='w-full' />
                  </div>
                  <div className="rating text-base lg:text-lg mt-1">{data?.vote_average.toFixed(1)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-poster-overview flex flex-col md:flex-row gap-4 justify-center items-center w-full p-4">
            <div className="poster-container relative max-w-xs md:w-[40%]">
              <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt="movie-poster" className='w-full rounded-2xl border border-neutral-600 shadow-2xl shadow-neutral-500' />
              <div onClick={favoriteHandler} className="favorite-icon absolute cursor-pointer flex justify-center items-center bg-neutral-800/60 border border-neutral-500 text-white text-4xl rounded-full -right-4 -top-4 p-2">
                {
                  user?.favorites.includes(Number(params.movieId))
                    ?
                    <MdFavorite className="text-emerald-200" />
                    :
                    <MdFavoriteBorder className="" />
                }
              </div>
            </div>
            <div className='overview-genre-container md:w-[60%] px-2'>
              <div className="overview text-base lg:text-lg">
                <h2 className='text-xl lg:text-3xl font-semibold my-4'>Overview</h2>
                {data?.overview}
              </div>
              <div className="genres my-4 flex flex-wrap gap-2 lg:gap-4 items-center text-nowrap">
                {
                  data?.genres.map((genres) => {
                    return <div key={genres.id} className=' px-2 lg:px-4 py-1 text-xs lg:text-sm backdrop-blur-3xl rounded-full border border-neutral-600'>{genres.name}</div>
                  }
                  )
                }
              </div>
            </div>
          </div>
          <div className="movie-info flex items-center text-white p-2 lg:p-4 h-full">
            <div className="movie-info-wrapper my-auto">

              <div className="production-companies">
                <h2 className='text-xl lg:text-2xl font-semibold my-2'>Production Companies</h2>
                <div className="logo-container flex flex-wrap gap-2 lg:gap-6 my-2 lg:my-4">
                  {
                    data?.production_companies.map((company) => {
                      return company.logo_path && <div key={company.id} className="img-container flex justify-center items-center p-1 bg-white w-14 h-14 rounded-full overflow-hidden">
                        <img src={`https://image.tmdb.org/t/p/w92${company.logo_path}`} alt="logo" className='h-full object-contain' />
                      </div>
                    }
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default MovieDetails