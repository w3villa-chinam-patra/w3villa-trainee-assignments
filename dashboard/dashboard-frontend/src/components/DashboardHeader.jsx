import { CiSearch } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi2";
import { GoGlobe } from "react-icons/go";
import user from "../assets/man.png"
function DashboardHeader() {
    return (
        <div className="bg-slate-200">
            <div className='bg-white py-4 px-6 flex items-center justify-between shadow'>
                <div className='bg-slate-200 rounded-3xl px-4 py-2 gap-2 flex items-center w-72'>
                    <CiSearch className="text-xl" />
                    <input type="text" className="w-full outline-none text-sm" placeholder="Search tasks..." />
                </div>
                <div className="flex items-center gap-6 text-xl">
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