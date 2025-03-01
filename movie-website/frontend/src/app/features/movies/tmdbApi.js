import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n from "../../../i18n";

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
      query: ({ movieList, language = i18n.language }) =>
        `/movie/${movieList}?language=${language}&page=1`,
      keepUnusedDataFor: 600,
    }),
    discover: builder.query({
      query: ({ appCategory, page = 1, genreId, language = i18n.language }) =>
        `/discover/${appCategory}?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc${
          genreId ? "&with_genres=" + genreId.toString() : ""
        }`,
      keepUnusedDataFor: 600,
    }),
    getDetails: builder.query({
      query: ({ appCategory, id, language = i18n.language }) =>
        `/${appCategory}/${id}?language=${language}`,
    }),
    getSearchResults: builder.query({
      query: ({
        appCategory,
        searchInputText = "",
        language = i18n.language,
      }) =>
        `/search/${appCategory}?query=${searchInputText}&include_adult=false&language=${language}&page=1`,
    }),
    getGenres: builder.query({
      query: ({ appCategory, language = i18n.language }) =>
        `genre/${appCategory}/list?language=${language}`,
    }),
    getCredits: builder.query({
      query: ({ appCategory, id, language = i18n.language }) =>
        `/${appCategory}/${id}/credits?language=${language}`,
    }),
    getRecommendations: builder.query({
      query: ({ appCategory, id, language = i18n.language }) =>
        `/${appCategory}/${id}/recommendations?language=${language}&page=1`,
    }),
    getSimilar: builder.query({
      query: ({ appCategory, id, language = i18n.language }) =>
        `/${appCategory}/${id}/similar?language=${language}&page=1`,
    }),
    getRelatedImages: builder.query({
      query: ({ appCategory, id }) => `/${appCategory}/${id}/images`,
    }),
    getTV: builder.query({
      query: ({ tvList, language = i18n.language }) =>
        `/tv/${tvList}?language=${language}&page=1`,
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
  useGetTVQuery,
} = tmdbApi;
