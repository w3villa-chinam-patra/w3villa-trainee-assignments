import logo from '../assets/images/logo.png';
import { RiFilmFill } from "react-icons/ri";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import { FaBookmark } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

function NavBar() {
    return (
        <div className="nav-bar-container">
            <div className='nav-bar'>
                <img className="logo" src={logo} alt="logo" />
                <div className="menu">
                    <IoGrid />
                    <RiFilmFill />
                    <TbDeviceTvOldFilled />
                    <FaBookmark />
                </div>
            </div>
        </div>
    )
}

export default NavBar