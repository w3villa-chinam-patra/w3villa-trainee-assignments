import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../service/firebase";
import { setUser } from "../../app/features/user/userSlice";
import { Link } from "react-router-dom";
import { MOVIE_DETAILS_ROUTE } from "../../routes";
import { FaImage } from "react-icons/fa";

function Card({ content }) {
  const appCategory = useSelector((state) => state.appCategory);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const favoriteHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const docRef = doc(db, "Users", user.uid);
    try {
      if (
        user.favorites.filter(({ id, category }) => content.id === id).length
      ) {
        dispatch(
          setUser({
            ...user,
            favorites: user.favorites.filter(
              ({ id, category }) => content.id !== id
            ),
          })
        );
        await updateDoc(docRef, {
          favorites: arrayRemove({ id: content.id, category: appCategory }),
        });
      } else {
        dispatch(
          setUser({
            ...user,
            favorites: [
              ...user.favorites,
              { id: content.id, category: appCategory },
            ],
          })
        );
        await updateDoc(docRef, {
          favorites: arrayUnion({ id: content.id, category: appCategory }),
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Link to={`${MOVIE_DETAILS_ROUTE}/${appCategory}/${content.id}`}>
      <div className="relative flex flex-col rounded-2xl cursor-pointer p-3  max-w-[250px] mx-auto">
        <div className="image-container relative w-full h-72 rounded-2xl overflow-hidden border border-neutral-700">
          <div className="overlay absolute inset-0 bg-linear-to-b from-transparent to-black/10 dark:to-black/50">
            <img
              loading="lazy"
              src={content?.poster}
              alt="movie-poster"
              className="transition-all duration-600 w-full h-full object-cover hover:scale-105"
            />
          </div>
        </div>
        <div
          onClick={favoriteHandler}
          className={`favorite-icon absolute ${
            user ? "block" : "hidden"
          } flex justify-center items-center bg-neutral-500/60 darK:bg-neutral-800/60 border border-neutral-500 text-white text-2xl rounded-full right-0 top-0 p-1.5`}
        >
          {user?.favorites.filter(({ id, category }) => content.id === id)
            .length ? (
            <MdFavorite className="text-emerald-200" />
          ) : (
            <MdFavoriteBorder className="" />
          )}
        </div>
        <div className="movie-info-container flex my-4 items-center justify-between">
          <div className="review flex items-center gap-2 px-3 py-1 bg-white/30 rounded-full backdrop-blur-3xl">
            <div className="star-container w-5">
              <img src="/assets/star.png" alt="star" className="w-full" />
            </div>
            <div className="rating text-sm mt-1">
              {content?.review?.toFixed(1)}
            </div>
          </div>
          <div className="movie-title-and-year me-1 text-end flex flex-col items-end gap-1 ps-2">
            <div className="movie-title text-sm font-semibold">
              {content?.title }
            </div>
            <div className="movie-year text-xs text-neutral-400">
              {content?.year?.split("-")[0]}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
