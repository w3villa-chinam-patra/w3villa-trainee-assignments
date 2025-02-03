import { CiSearch } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi2";
import { GoGlobe } from "react-icons/go";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

import user from "../assets/man.png"
function DashboardHeader({ sidebarState }) {
    const [isSidebarOpen, setIsSidebarOpen] = sidebarState;
    const onClickHandler = () => {
        const sidebar = document.querySelector(".sidebar");
        if (!isSidebarOpen) {
            setIsSidebarOpen(true);
            sidebar.style.left = "0";
        }
    }
    return (
        <div className="bg-slate-200">
            <div className='bg-white py-4 px-2 md:px-6 flex items-center justify-between gap-2 shadow'>

                <div className="search-bar-hamburger flex items-center gap-2 md:gap-6 flex-1">
                    <div className="hamburger-open-button text-4xl text-gray-500 lg:hidden" onClick={onClickHandler}>
                        <TbLayoutSidebarRightCollapseFilled />
                    </div>
                    <div className='search-bar bg-slate-200 rounded-3xl px-2 md:px-4 py-2 gap-2 flex items-center w-full max-w-72'>
                        <CiSearch className="text-xl" />
                        <input type="text" className="w-full outline-none text-sm" placeholder="Search tasks..." />
                    </div>
                </div>
                <div className="options-menu flex items-center gap-1 md:gap-6 md:text-xl">
                    <div className="bg-slate-200 p-2 rounded-full">
                        <IoMoonOutline />
                    </div>
                    <div className="bg-slate-200 p-2 rounded-full">
                        <HiOutlineBell />
                    </div>
                    <div className="bg-slate-200 p-2 rounded-full">
                        <GoGlobe />
                    </div>
                    <img src={user} alt="user" className="w-9" />
                </div>
            </div>
            <div className="text-gray-600 mx-4 my-3 text-sm">
                Dashboards <span className="text-gray-900">{">"} Overview</span>
            </div>
        </div>
    )
}

export default DashboardHeader