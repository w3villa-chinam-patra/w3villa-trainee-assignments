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
import { FiTv } from "react-icons/fi";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineLightMode,
  MdOutlineMovie,
} from "react-icons/md";
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
      <div className="header-container bg-inherit rounded-2xl w-full flex flex-wrap lg:flex-nowrap gap-1 md:gap-2 lg:gap-4 items-center justify-between md:my-0">
        <div className="hamburger-filter-search-container flex gap-1 md:gap-2 w-full md:flex-1">
          <div
            onClick={() => setIsHamburgerOpen((prev) => !prev)}
            className="hamburger flex items-center rounded-2xl border border-neutral-400 dark:border-neutral-700 px-2 sm:hidden text-xl cursor-pointer bg-neutral-300 dark:bg-neutral-800"
          >
            <MdKeyboardDoubleArrowRight />
          </div>
          <div
            onClick={toggleFilterOptions}
            className={`filter relative bg-neutral-300 dark:bg-neutral-800 text-sm md:text-base py-1 md:py-2 px-2 rounded-full flex md:gap-2 items-center border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600 ${
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
            className="search-bar z-20 relative flex flex-1 gap-2 items-center bg-neutral-300 dark:bg-neutral-800 px-3 py-2 rounded-full border border-neutral-400 dark:border-neutral-700"
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
        </div>
        <div className="options-and-user-info-container flex gap-1 md:gap-2 items-center w-full justify-end ml-auto md:w-auto">
          <Link
            to={SETTINGS_ROUTE}
            className="category p-3 h-full aspect-square text-nowrap text-xl bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
          >
            {appCategory === MOVIE_CATEGORY ? <MdOutlineMovie /> : <FiTv />}
          </Link>
          <Link
            to={SETTINGS_ROUTE}
            className="language p-3 bg-neutral-300 h-full aspect-square dark:bg-neutral-800 flex items-center justify-center rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
          >
            {t("langSymbol")}
          </Link>
          <div
            onClick={themeChanger}
            className="theme-icon-container p-3 bg-neutral-300 aspect-square dark:bg-neutral-800 flex items-center justify-center h-full  rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
          >
            <MdOutlineLightMode className="text-xl" />
          </div>
          {user ? (
            <div
              onClick={() => setIsUserOptionOpen(!isUserOptionOpen)}
              className="user-info-icon relative  bg-neutral-300 dark:bg-neutral-800 rounded-full flex justify-between items-center border border-neutral-400 dark:border-neutral-700 cursor-pointer"
            >
              <div className="info-container h-full flex items-center sm:gap-1 flex-1 min-w-0 overflow-hidden">
                <div className="avatar-container h-full w-max flex items-center">
                  <img
                    src="/assets/avatar.png"
                    alt="user-avatar"
                    className="h-11 w-11  rounded-full shrink-0"
                  />
                </div>

                <div className="user-info box-border flex-1 w-full min-w-0 overflow-hidden">
                  <div className="name text-xs md:text-sm hidden md:block md:max-w-[200px] truncate">
                    {user.firstName}
                  </div>
                  <div className="username text-[10px] md:text-xs hidden md:block md:max-w-[200px] text-neutral-500 dark:text-neutral-40 whitespace-nowrap overflow-hidden text-ellipsis">
                    @{user.username}
                  </div>
                </div>
                <div
                  onClick={logoutHandler}
                  className={`user-options-dropdown absolute flex justify-center items-center text-sm bg-red-500 text-white  dark:bg-red-900 -bottom-16 z-10 right-0 rounded-2xl p-4 border border-red-600 dark:border-red-900 hover:bg-red-600 dark:hover:bg-red-800 ${
                    isUserOptionOpen ? "" : "hidden"
                  }`}
                >
                  <div>{t("logout")}</div>
                </div>
              </div>
              <div className="down-arrow px-2">
                <IoIosArrowDown />
              </div>
            </div>
          ) : (
            <div className="login-register-button flex gap-1 md:gap-2 text-sm lg:text-base">
              <Link
                to={LOGIN_ROUTE}
                className="w-full p-3 flex items-center justify-center bg-neutral-300 dark:bg-neutral-800 rounded-full border border-neutral-400 dark:border-neutral-700 lg:px-6 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
              >
                <button>{t("login")}</button>
              </Link>
              <Link
                to={REGISTER_ROUTE}
                className="w-full p-3 flex items-center justify-center bg-neutral-300 dark:bg-neutral-800 rounded-full border border-neutral-400 dark:border-neutral-700 lg:px-6 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600"
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
