import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDkwODQwNWU1YmE0ZDkxZWY4ZDVmMGJhNjdlYzBlYiIsIm5iZiI6MTczOTUxNDU5OS45NjcsInN1YiI6IjY3YWVlMmU3ODBmNzZkNjFlYjhlNjExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qAwS8WFJ95sg0-v6S_WUkqlqx0l5czPqEX2No6rc6oM";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${BEARER_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (movieList) => `/movie/${movieList}?language=en-US&page=1`,
      keepUnusedDataFor: 600,
    }),
    discover: builder.query({
      query: ({ appCategory, page = 1, genreId }) => {
        return `/discover/${appCategory}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${
          genreId ? "&with_genres=" + genreId.toString() : ""
        }`;
      },
      keepUnusedDataFor: 600,
    }),
    getDetails: builder.query({
      query: ({ appCategory, id }) =>
        `/${appCategory}/${id}?language=en-US`,
    }),
    getSearchResults: builder.query({
      query: ({ appCategory, searchInputText = "" }) => {
        return `/search/${appCategory}?query=${searchInputText}&include_adult=false&language=en-US&page=1`;
      },
    }),
    getGenres: builder.query({
      query: (appCategory) => `genre/${appCategory}/list?language=en`,
    }),
    getCredits: builder.query({
      query: ({ appCategory, id }) =>
        `/${appCategory}/${id}/credits?language=en-US`,
    }),
    getRecommendations: builder.query({
      query: ({ appCategory, id }) =>
        `/${appCategory}/${id}/recommendations?language=en-US&page=1`,
    }),
    getSimilar: builder.query({
      query: ({ appCategory, id }) =>
        `/${appCategory}/${id}/similar?language=en-US&page=1`,
    }),
    getRelatedImages: builder.query({
      query: ({ appCategory, id }) => `/${appCategory}/${id}/images`,
    }),
    getTV: builder.query({
      query: (tvList) =>
        `https://api.themoviedb.org/3/tv/${tvList}?language=en-US&page=1`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useDiscoverQuery,
  useGetDetailsQuery,
  useGetSearchResultsQuery,
  useGetGenresQuery,
  useGetCreditsQuery,
  useGetRecommendationsQuery,
  useGetSimilarQuery,
  useGetRelatedImagesQuery,
  useGetTVQuery
} = tmdbApi;
