import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
function Header() {
    return (
        <div className='header-container bg-inherit rounded-2xl flex gap-4'>
            <div className="filter bg-neutral-800 py-2 px-6 rounded-full flex gap-2 items-center">
                All
                <RiArrowDropDownLine className="text-2xl" />
            </div>
            <div className="search-bar flex gap-2 items-center bg-neutral-800 px-6 py-2 rounded-full flex-1">
                <input type="text" placeholder="Search" className="w-full outline-none" />
                <CiSearch className="text-xl" />
            </div>
            <div className="notification-icon-container bg-neutral-800 flex items-center justify-center w-12 h-12 rounded-full">
                <BsBell className="text-xl" />
            </div>
            <div className="user-info-icon bg-neutral-800 rounded-full flex gap-2 pe-6 items-center">
                <div className="avatar-container bg-neutral-700 w-12 h-12 rounded-full overflow-hidden">
                    <img src="/assets/avatar.png" alt="user-avatar" className="w-full" />
                </div>
                <div className="user-info">
                    <div className="name text-sm">Dibyadyuti</div>
                    <div className="username text-xs text-neutral-400">@cdpatra</div>
                </div>
            </div>
        </div>
    )
}

export default Header