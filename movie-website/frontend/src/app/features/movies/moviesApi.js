import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDkwODQwNWU1YmE0ZDkxZWY4ZDVmMGJhNjdlYzBlYiIsIm5iZiI6MTczOTUxNDU5OS45NjcsInN1YiI6IjY3YWVlMmU3ODBmNzZkNjFlYjhlNjExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qAwS8WFJ95sg0-v6S_WUkqlqx0l5czPqEX2No6rc6oM"

export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/3",
        prepareHeaders: (headers) => {
            headers.set("accept", "application/json")
            headers.set("Authorization", `Bearer ${BEARER_TOKEN}`);
            return headers
        }
    }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: (movieList) =>
                `/movie/${movieList}?language=en-US&page=1`, keepUnusedDataFor: 600
        }),
        discoverMovies: builder.query({
            query: ({page = 1, genreId}) => { 
                return`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genreId ? ("&with_genres=" + genreId.toString()) : ""}` },
            keepUnusedDataFor: 600,
        }),
        getMovieDetails: builder.query({
            query: (movieId) =>
                `/movie/${movieId}?language=en-US`
        }),
        getSearchResults: builder.query({
            query: (inputText = "") =>
                `/search/movie?query=${inputText}&include_adult=false&language=en-US&page=1`
        }),
        getGenres: builder.query({
            query: () =>
                `genre/movie/list?language=en`
        })
    })
})

export const { useGetMoviesQuery, useDiscoverMoviesQuery, useGetMovieDetailsQuery, useGetSearchResultsQuery, useGetGenresQuery } = moviesApi;