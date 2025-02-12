import React from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { BASIC_DETAILS_FORM_ROUTE } from '../../routes';

function Card({ img, content }) {
    const [user, setUser] = useUser();
    const navigate = useNavigate();
    const buyClickHandler = () => {
        user.product = [content, img];
        setUser(user);
        navigate("/" + BASIC_DETAILS_FORM_ROUTE);
        alert("Details Required !");
    }
    return (
        <div className='card-container bg-white/10 rounded-2xl backdrop-blur-3xl p-4 flex flex-col gap-4'>
            <img src={img} className='w-full bg-white/30 p-2 rounded-2xl' />
            <div className="content-container flex justify-between items-center bg-white/30 rounded-2xl p-4 text-xl">
                <div className="content">{content}</div>
                <div className='flex gap-2 items-center'>
                    <div>$5</div>
                    <button onClick={buyClickHandler} className='cursor-pointer bg-indigo-600 border-2 border-indigo-700 px-4 py-1 rounded-xl hover:bg-indigo-700'>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default Card