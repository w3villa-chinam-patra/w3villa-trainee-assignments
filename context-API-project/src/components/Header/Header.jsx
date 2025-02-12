import { Link } from 'react-router-dom';
import { AVATAR_PATH, LOGO_PATH } from '../../assets/imagePath'
import { FaShoppingCart } from "react-icons/fa";

function Header() {
    return (
        <header className='app-header container bg-inherit mx-auto p-4'>
            <nav className='flex justify-between items-center p-4 rounded-2xl bg-white/20'>
                <div className="logo-container">
                    <img src={LOGO_PATH} alt="logo" className='w-12' />
                </div>
                <div className="nav-options-container text-lg">
                    <ul className='flex gap-8'>
                        <li><Link to={"/"}>Home</Link> </li>
                        <li>Categories</li>
                        <li>Contact US</li>
                    </ul>
                </div>
                <div className="user-info-container flex items-center gap-6">
                    <FaShoppingCart className='text-3xl'/>
                    <img src={AVATAR_PATH} alt="user-avatar" className='w-10' />
                </div>
            </nav>
        </header>
    )
}

export default Header