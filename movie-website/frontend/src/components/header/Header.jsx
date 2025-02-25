import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EXPLORE_ROUTE, LOGIN_ROUTE, MOVIE_DETAILS_ROUTE, REGISTER_ROUTE } from "../../routes";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../service/firebase";
import toast from "react-hot-toast";
import { setUser } from "../../app/features/user/userSlice";
import { setSearch } from "../../app/features/search/searchSlice";
import { useGetGenresQuery, useGetSearchResultsQuery } from "../../app/features/movies/moviesApi";
import { setFilter } from "../../app/features/filter/filterSlice";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardDoubleArrowRight, MdOutlineLightMode } from "react-icons/md";
function Header({ setIsHamburgerOpen ,setIsDark}) {
    const user = useSelector((store) => store.user);
    const [isUserOptionOpen, setIsUserOptionOpen] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchInputText = useSelector((state) => state.search)
    const { data } = useGetSearchResultsQuery(searchInputText)
    const searchBoxRef = useRef()
    const { data: genresData } = useGetGenresQuery();
    const selectedGenre = useSelector((state) => state.filter)
    const filterOptionsRef = useRef()


    const logoutHandler = async () => {
        try {
            await auth.signOut()
            toast.success("Logged out successfully");
            dispatch(setUser(null));
            navigate("/");
        } catch (error) {
            toast.error(error.message.split("Firebase: "));
        }
    }

    // debouncing
    const searchHandler = () => {
        let timerId;
        return (event) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => ((event) => {
                dispatch(setSearch(event.target.value));
            })(event), 500)
        }
    }

    // logic to close the search recommendations popup when user click anywhere else starts here
    useEffect(() => {
        const eventHandler = () => {
            dispatch(setSearch(""));
            searchBoxRef.current.value = ""
        }
        window.addEventListener('click', eventHandler)

        return () => {
            window.removeEventListener('click', eventHandler)
        }
    }, [])
    // logic to close the search recommendations popup when user click anywhere else ends here

    // filter login start here
    const filterSelectHandler = (event, genre) => {
        event.stopPropagation();
        dispatch(setFilter(genre));
        filterOptionsRef.current.style.display = "none"
    }

    const toggleFilterOptions = () => {
        if (filterOptionsRef.current.style.display === "none" || filterOptionsRef.current.style.display === "") {
            filterOptionsRef.current.style.display = "block"
        } else {
            filterOptionsRef.current.style.display = "none"
        }
    }

    // filter login end here

    // theme changing logic starts here
    const themeChanger = () => {
        setIsDark(prev => {
            localStorage.setItem("isDark", JSON.stringify(!prev));
            return !prev
        })
    }
    // theme changing logic ends here

    return (
        <div className="flex items-stretch gap-1 ">
            <div onClick={() => setIsHamburgerOpen(prev => !prev)} className="hamburger flex items-center rounded-2xl border border-neutral-400 dark:border-neutral-700 px-2 sm:hidden text-xl cursor-pointer bg-neutral-300 dark:bg-neutral-800"><MdKeyboardDoubleArrowRight /></div>
            <div className='header-container bg-inherit rounded-2xl w-full flex flex-wrap lg:flex-nowrap justify-center gap-1 md:gap-2 lg:gap-4 items-stretch md:my-0'>
                <div onClick={toggleFilterOptions} className={`filter relative bg-neutral-300 dark:bg-neutral-800 text-sm md:text-base py-1 md:py-2 px-2 lg:px-6 rounded-full flex md:gap-2 items-center border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600 ${location.pathname === EXPLORE_ROUTE ? "block" : "hidden"}`}>
                    <div className="genre-name">{selectedGenre.name}</div>
                    <RiArrowDropDownLine className="text-2xl" />
                    <div ref={filterOptionsRef} className="options absolute hidden top-12 md:top-14 max-h-80 overflow-y-auto bg-neutral-300 dark:bg-neutral-800 z-10 left-0 rounded-xl border border-neutral-400 dark:border-neutral-700">
                        {
                            [
                                <div onClick={(event) => filterSelectHandler(event, { name: "All", id: undefined })} key={crypto.randomUUID()} className={`option p-1 md:p-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 ${selectedGenre.name === "All" ? "bg-neutral-300 dark:bg-neutral-700" : ""} `}>{"All"}</div>,
                                ...(genresData?.genres || []).map((genre) =>
                                    <div onClick={(event) => filterSelectHandler(event, genre)} key={genre.id} className={`option p-1 md:p-2 hover:bg-neutral-400 dark:hover:bg-neutral-700 ${selectedGenre.name === genre.name ? "bg-neutral-300 dark:bg-neutral-700" : ""}`}>{genre.name}</div>
                                )
                            ]
                        }
                    </div>
                </div>
                <div onClick={(event) => event.stopPropagation()} className="search-bar z-20 relative flex gap-2 items-center bg-neutral-300 dark:bg-neutral-800 text-sm md:text-base px-3 md:px-6 py-1 md:py-2 rounded-full flex-1 border border-neutral-400 dark:border-neutral-700">
                    <input ref={searchBoxRef} onChange={searchHandler()} type="text" placeholder="Search" className="w-full outline-none min-w-32" />
                    <CiSearch className="text-xl" />
                    <div className={`search-recommendations flex flex-col max-h-80 overflow-y-auto absolute top-8 md:top-12 left-0 right-0 py-2 rounded-xl bg-neutral-800 border border-neutral-700 ${(location.pathname === EXPLORE_ROUTE) || (searchInputText === "") ? "hidden" : "block"}`}>
                        {
                            (() => {
                                const searchResults = data?.results?.map((movieDetails) =>
                                    movieDetails.poster_path &&
                                    <Link to={`${MOVIE_DETAILS_ROUTE}/${movieDetails.id}`} key={movieDetails.id} className="px-2 md:px-6 py-1 md:py-2 hover:bg-neutral-700">
                                        <div onClick={() => { dispatch(setSearch("")); searchBoxRef.current.value = "" }} className="recommendation-option flex gap-2 md:gap-4 items-center">
                                            <img src={`https://image.tmdb.org/t/p/w92${movieDetails.poster_path}`} alt="movie-poster" className="h-10" />
                                            {movieDetails.title}
                                        </div>
                                    </Link>
                                )
                                if (searchResults?.length === 0)
                                    return <div className="py-1 text-center text-neutral-500">No result found</div>
                                else
                                    return searchResults
                            })()
                        }
                    </div>
                </div>
                <div className="flex gap-1 md:gap-2 lg:gap-4 items-center w-full lg:w-auto">
                    <div onClick={themeChanger} className="theme-icon-container bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center w-[20%] h-full lg:w-12 rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600">
                        <MdOutlineLightMode className="md:text-2xl" />
                    </div>
                    {
                        user
                            ?
                            <div onClick={() => setIsUserOptionOpen(!isUserOptionOpen)} className="user-info-icon relative bg-neutral-300 dark:bg-neutral-800 rounded-full flex justify-between gap-2 pe-3 md:gap-2 items-center border border-neutral-400 dark:border-neutral-700 cursor-pointer flex-1">
                                <div className="info-container flex items-center">
                                    <div className="avatar-container bg-neutral-700 w-7 h-7 md:w-12 md:h-12 rounded-full overflow-hidden">
                                        <img src="/assets/avatar.png" alt="user-avatar" className="w-full" />
                                    </div>

                                    <div className="user-info">
                                        <div className="name text-xs md:text-sm overflow-ellipsis text-nowrap truncate">{user.firstName}</div>
                                        <div className="username text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 truncate">@{user.username}</div>
                                    </div>
                                    <div onClick={logoutHandler} className={`user-options-dropdown absolute flex justify-center items-center text-sm bg-red-500 text-white  dark:bg-red-900 -bottom-16 z-10 left-[40%] rounded-2xl p-4 border border-red-600 dark:border-red-900 hover:bg-red-600 dark:hover:bg-red-800 ${isUserOptionOpen ? "" : "hidden"}`}>
                                        <div>Logout</div>
                                    </div>
                                </div>
                                <IoIosArrowDown />
                            </div>
                            :
                            <div className="w-full login-register-button grid grid-cols-2 gap-1 md:gap-2 items-center text-sm lg:text-base">
                                <Link to={LOGIN_ROUTE}><button className="w-full bg-neutral-300 dark:bg-neutral-800 rounded-full border border-neutral-400 dark:border-neutral-700 px-4 py-2 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600">Login</button></Link>
                                <Link to={REGISTER_ROUTE}><button className="w-full bg-neutral-300 dark:bg-neutral-800 rounded-full border border-neutral-400 dark:border-neutral-700 px-4 py-2 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600">Register</button></Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header