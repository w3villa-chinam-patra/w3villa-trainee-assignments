import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import {
  EXPLORE_ROUTE,
  FAVORITES_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MOVIE_DETAILS_ROUTE,
  REGISTER_ROUTE,
  SETTINGS_ROUTE,
  TOP_VOTED_ROUTE,
} from "./routes";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import AuthLayout from "./components/AuthLayout";
import Favorites from "./components/favorites/Favorites";
import MovieDetails from "./components/movieTVDetails/MovieTVDetails";
import Explore from "./components/explore/Explore";
import TopVoted from "./components/topVoted/TopVoted";
import Settings from "./components/settings/Settings";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={FAVORITES_ROUTE} element={<Favorites />} />
        <Route
          path={`${MOVIE_DETAILS_ROUTE}/:category/:id`}
          element={<MovieDetails />}
        />
        <Route path={EXPLORE_ROUTE} element={<Explore />} />
        <Route path={TOP_VOTED_ROUTE} element={<TopVoted />} />
        <Route path={SETTINGS_ROUTE} element={<Settings />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
