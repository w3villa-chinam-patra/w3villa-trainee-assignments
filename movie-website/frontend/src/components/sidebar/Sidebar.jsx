import React from 'react'
import Menu from './Menu'
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

function Sidebar() {
    return (
        <div className='sidebar-container bg-neutral-800 h-full rounded-2xl p-6'>
            <div className="logo-container flex gap-2 items-center">
                <img src="/assets/logo.png" alt="logo" className='w-8' />
                <div className="app-name text-2xl">
                    <span className='font-bold text-white'>Prime</span>
                    <span className='font-light'>Vision</span>
                </div>
            </div>
            <div className="menu-container py-6">
                <Menu options={[
                    { icon: <GoHome />, title: "Home" },
                    { icon: <MdOutlineExplore />, title: "Explore" },
                    { icon: <MdFavoriteBorder />, title: "Favorites" },
                ]} />
                <div className="line-break h-0.5 bg-neutral-700 rounded-full"></div>
                <Menu options={[
                    { icon: <FiUser />, title: "Profile" },
                    { icon: <IoSettingsOutline />, title: "Settings" },
                ]} />
            </div>
        </div>
    )
}

export default Sidebar