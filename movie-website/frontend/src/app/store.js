import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import searchReducer from "./features/search/searchSlice";
import { tmdbApi } from "./features/movies/tmdbApi";
import filterReducer from "./features/filter/filterSlice";
import voteReducer from "./features/vote/voteSlice";
import appCategoryReducer from "./features/appCategory/appCategorySlice";
import languageReducer from "./features/language/languageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    filter: filterReducer,
    vote: voteReducer,
    language: languageReducer,
    appCategory: appCategoryReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
