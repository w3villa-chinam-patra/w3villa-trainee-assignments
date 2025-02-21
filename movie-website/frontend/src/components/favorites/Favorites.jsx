import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../routes';
import FavoriteCard from './FavoriteCard';

function Favorites() {
    const user = useSelector((state) => state.user);
    // const user = null;
    return (
        <>
            {
                user
                    ?
                    user.favorites.length === 0
                        ?
                        <div className="favorites-container h-full w-full flex justify-center items-center text-neutral-600 text-lg">
                            There is nothing in your favorites.
                        </div>
                        :
                        <div className="favorites-container grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                            {
                                user.favorites.map((movieId) =>
                                    <FavoriteCard key={movieId} movieId={movieId} />
                                ).reverse()
                            }
                        </div>
                    :
                    <div className="favorites-container h-full w-full flex justify-center items-center text-neutral-500">
                        Please  &nbsp;  <Link to={LOGIN_ROUTE} className='text-emerald-500 hover:underline cursor-pointer'>Login</Link>  &nbsp;  to see your favorites.
                    </div>
            }
        </>
    )
}

export default Favorites