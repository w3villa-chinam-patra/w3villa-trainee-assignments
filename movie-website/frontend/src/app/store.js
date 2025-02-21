import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import searchReducer from './features/search/searchSlice'
import { moviesApi } from './features/movies/moviesApi'
import filterReducer from './features/filter/filterSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        filter: filterReducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
})