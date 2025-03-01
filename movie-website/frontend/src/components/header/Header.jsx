import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  EXPLORE_ROUTE,
  LOGIN_ROUTE,
  MOVIE_DETAILS_ROUTE,
  REGISTER_ROUTE,
  SETTINGS_ROUTE,
} from "../../routes";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../service/firebase";
import toast from "react-hot-toast";
import { setUser } from "../../app/features/user/userSlice";
import { setSearch } from "../../app/features/search/searchSlice";
import {
  useGetGenresQuery,
  useGetSearchResultsQuery,
} from "../../app/features/movies/tmdbApi";
import { setFilter } from "../../app/features/filter/filterSlice";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardDoubleArrowRight, MdOutlineLightMode } from "react-icons/md";
import { MOVIE_CATEGORY } from "../../appCategory";
import { useTranslation } from "react-i18next";
function Header({ setIsHamburgerOpen, setIsDark }) {
  const { t, i18n } = useTranslation();
  const appCategory = useSelector((state) => state.appCategory);
  const user = useSelector((store) => store.user);
  const [isUserOptionOpen, setIsUserOptionOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchInputText = useSelector((state) => state.search);
  const { data } = useGetSearchResultsQuery({ appCategory, searchInputText });
  const searchBoxRef = useRef();
  const { data: genresData } = useGetGenresQuery({
    appCategory,
    language: i18n.language,
  });
  const selectedGenre = useSelector((state) => state.filter);
  const filterOptionsRef = useRef();

  const logoutHandler = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      toast.error(error.message.split("Firebase: "));
    }
  };

  // debouncing
  const searchHandler = () => {
    let timerId;
    return (event) => {
      clearTimeout(timerId);
      timerId = setTimeout(
        () =>
          ((event) => {
            dispatch(setSearch(event.target.value));
          })(event),
        500
      );
    };
  };

  // logic to close the search recommendations popup when user click anywhere else starts here
  useEffect(() => {
    const eventHandler = () => {
      dispatch(setSearch(""));
      searchBoxRef.current.value = "";
    };
    window.addEventListener("click", eventHandler);

    return () => {
      window.removeEventListener("click", eventHandler);
    };
  }, []);
  // logic to close the search recommendations popup when user click anywhere else ends here

  // filter login start here
  const filterSelectHandler = (event, genre) => {
    event.stopPropagation();
    dispatch(setFilter(genre));
    filterOptionsRef.current.style.display = "none";
  };

  const toggleFilterOptions = () => {
    if (
      filterOptionsRef.current.style.display === "none" ||
      filterOptionsRef.current.style.display === ""
    ) {
      filterOptionsRef.current.style.display = "block";
    } else {
      filterOptionsRef.current.style.display = "none";
    }
  };

  // filter login end here

  // theme changing logic starts here
  const themeChanger = () => {
    setIsDark((prev) => {
      localStorage.setItem("isDark", JSON.stringify(!prev));
      return !prev;
    });
  };
  // theme changing logic ends here

  return (
    <div className="flex items-stretch gap-1 w-full">
      <div
        onClick={() => setIsHamburgerOpen((prev) => !prev)}
        className="hamburger flex items-center rounded-2xl border border-neutral-400 dark:border-neutral-700 px-2 sm:hidden text-xl cursor-pointer bg-neutral-300 dark:bg-neutral-800"
      >
        <MdKeyboardDoubleArrowRight />
      </div>
      <div className="header-container bg-inherit rounded-2xl w-full flex flex-wrap lg:flex-nowrap  gap-1 md:gap-2 lg:gap-4 items-stretch md:my-0">
        <div
          onClick={toggleFilterOptions}
          className={`filter relative bg-neutral-300 dark:bg-neutral-800 text-sm md:text-base py-1 md:py-2 px-2 lg:px-6 rounded-full flex md:gap-2 items-center border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600 ${
            location.pathname === EXPLORE_ROUTE ? "block" : "hidden"
          }`}
        >
          <div className="genre-name">{selectedGenre.name}</div>
          <RiArrowDropDownLine className="text-2xl" />
          <div
            ref={filterOptionsRef}
            className="options absolute hidden top-12 md:top-18 max-h-80 overflow-y-auto bg-neutral-300 dark:bg-neutral-800 z-10 left-0 rounded-xl border border-neutral-400 dark:border-neutral-700"
          >
            {[
              <div
                onClick={(event) =>
                  filterSelectHandler(event, { name: "All", id: undefined })
                }
                key={crypto.randomUUID()}
                className={`option p-1 md:p-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 ${
                  selectedGenre.name === "All"
                    ? "bg-neutral-300 dark:bg-neutral-700"
                    : ""
                } `}
              >
                {"All"}
              </div>,
              ...(genresData?.genres || []).map((genre) => (
                <div
                  onClick={(event) => filterSelectHandler(event, genre)}
                  key={genre.id}
                  className={`option p-1 md:p-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 ${
                    selectedGenre.name === genre.name
                      ? "bg-neutral-300 dark:bg-neutral-700"
                      : ""
                  }`}
                >
                  {genre.name}
                </div>
              )),
            ]}
          </div>
        </div>
        <div
          onClick={(event) => event.stopPropagation()}
          className="search-bar z-20 relative flex gap-2 items-center bg-neutral-300 flex-1 dark:bg-neutral-800 px-3 md:px-6 py-2 rounded-full fle border border-neutral-400 dark:border-neutral-700"
        >
          <input
            ref={searchBoxRef}
            onChange={searchHandler()}
            type="text"
            placeholder={t("search")}
            className="w-full px-2 outline-none min-w-32"
          />
          <CiSearch className="text-xl" />
          <div
            className={`search-recommendations flex flex-col max-h-80 overflow-y-auto absolute top-12 md:top-16 left-0 right-0 py-2 rounded-xl bg-neutral-800 border border-neutral-700 ${
              location.pathname === EXPLORE_ROUTE || searchInputText === ""
                ? "hidden"
                : "block"
            }`}
          >
            {(() => {
              const searchResults = data?.results?.map(
                (movieDetails) =>
                  movieDetails.poster_path && (
                    <Link
                      to={`${MOVIE_DETAILS_ROUTE}/${appCategory}/${movieDetails.id}`}
                      key={movieDetails.id}
                      className="px-2 md:px-6 py-1 md:py-2 hover:bg-neutral-700"
                    >
                      <div
                        onClick={() => {
                          dispatch(setSearch(""));
                          searchBoxRef.current.value = "";
                        }}
                        search-bar
                        className="recommendation-option flex gap-2 md:gap-4 items-center"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movieDetails.poster_path}`}
                          alt="movie-poster"
                          className="h-10"
                        />
                        {movieDetails.title}
                      </div>
                    </Link>
                  )
              );
              if (searchResults?.length === 0)
                return (
                  <div className="py-1 text-center text-neutral-500">
                    No result found
                  </div>
                );
              else return searchResults;
            })()}
          </div>
        </div>
        <div className="flex gap-1 md:gap-2 items-center w-full lg:w-auto">
          <div className="movies-or-tv-and-language-change text-xs sm:text-nowrap flex flex-col gap-1 min-w-max basis-2/7">
            <Link
              to={SETTINGS_ROUTE}
              className="category px-2 py-1 text-nowrap bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
            >
              {appCategory === MOVIE_CATEGORY ? t("movie") : t("tv")}
            </Link>
            <Link
              to={SETTINGS_ROUTE}
              className="language px-2 py-1 bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
            >
              {t("langSymbol")}
            </Link>
          </div>
          <div
            onClick={themeChanger}
            className="theme-icon-container p-2 bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center h-full  basis-1/7  rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
          >
            <MdOutlineLightMode className="text-xl sm:text-2xl" />
          </div>
          {user ? (
            <div
              onClick={() => setIsUserOptionOpen(!isUserOptionOpen)}
              className="user-info-icon relative basis-4/7 bg-neutral-300 h-full w-full dark:bg-neutral-800 rounded-full flex justify-between gap-1 items-center border border-neutral-400 dark:border-neutral-700 cursor-pointer flex-1"
            >
              <div className="info-container h-full w-full flex items-center sm:gap-1 flex-1 min-w-0">
                <div className="avatar-container h-full w-max flex items-center">
                  <img
                    src="/assets/avatar.png"
                    alt="user-avatar"
                    className="h-12 w-12 md:h-14 md:w-14 rounded-full shrink-0"
                  />
                </div>

                <div className="user-info box-border flex-1 w-full min-w-0 overflow-hidden">
                  <div className="name text-xs md:text-sm w-full text-wrap truncate">
                    {user.firstName}
                  </div>
                  <div className="username text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    @{user.username}
                  </div>
                </div>
                <div
                  onClick={logoutHandler}
                  className={`user-options-dropdown absolute flex justify-center items-center text-sm bg-red-500 text-white  dark:bg-red-900 -bottom-16 z-10 left-5 rounded-2xl p-4 border border-red-600 dark:border-red-900 hover:bg-red-600 dark:hover:bg-red-800 ${
                    isUserOptionOpen ? "" : "hidden"
                  }`}
                >
                  <div>{t("logout")}</div>
                </div>
              </div>
              <div className="down-arrow pe-2">
                <IoIosArrowDown />
              </div>
            </div>
          ) : (
            <div className="basis-4/7 login-register-button flex items-stretch justify-stretch gap-1 md:gap-2 h-full text-sm lg:text-base">
              <Link
                to={LOGIN_ROUTE}
                className="w-full flex items-center justify-center bg-neutral-300 dark:bg-neutral-800 rounded-full h-full border border-neutral-400 dark:border-neutral-700 lg:px-6 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
              >
                <button>{t("login")}</button>
              </Link>
              <Link
                to={REGISTER_ROUTE}
                className="w-full flex items-center justify-center bg-neutral-300 dark:bg-neutral-800 rounded-full h-full border border-neutral-400 dark:border-neutral-700 lg:px-6 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
              >
                <button>{t("register")}</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
