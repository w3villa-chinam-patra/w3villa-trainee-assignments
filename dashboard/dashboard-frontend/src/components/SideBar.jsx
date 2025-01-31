import { useState } from 'react'
import SideBarMenu from './SideBarMenu'
import { IoGrid } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { HiTicket } from "react-icons/hi2";
import { FaRegFolderOpen } from "react-icons/fa6";
import { IoMdList, IoMdListBox } from "react-icons/io";
import { BsFillLayersFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { BiSolidLayout } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import { RiLogoutCircleRFill } from "react-icons/ri";



function SideBar() {
    const [isSelected, setIsSelected] = useState("Overview");
    return (
        <div className='bg-zinc-900 text-slate-200 overflow-y-auto'>
            <div className='font-[Raleway] font-bold text-3xl text-yellow-600 m-2 tracking-tight'>Dashboard</div>
            <div className='m-2'>
                <SideBarMenu
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    heading={"dashboards"}
                    options={[{
                        "icon": <IoGrid />,
                        "text": "Overview"
                    },
                    {
                        "icon": <IoCalendar />,
                        "text": "Calender"
                    },
                    {
                        "icon": <HiTicket />,
                        "text": "Tickets"
                    },
                    {
                        "icon": <FaRegFolderOpen />,
                        "text": "File Manager"
                    },
                    {
                        "icon": <IoMdListBox />,
                        "text": "Kaban"
                    },
                    {
                        "icon": <BsFillLayersFill />,
                        "text": "Projects"
                    },
                    {
                        "icon": <FaClipboardList />,
                        "text": "Tasks"
                    },
                    ]}
                />
                <SideBarMenu
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    heading={"adminstrartor"}
                    options={[{
                        "icon": <HiUsers />,
                        "text": "Auth Pages"
                    },
                    {
                        "icon": <GiCardboardBoxClosed />,
                        "text": "Extra Pages"
                    },
                    {
                        "icon": <BiSolidLayout />,
                        "text": "Layout"
                    }
                    ]}
                />
                <SideBarMenu
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    heading={"settings"}
                    options={[{
                        "icon": <MdContactSupport />,
                        "text": "Supports"
                    },
                    {
                        "icon": <RiSettings4Fill />,
                        "text": "Settings"
                    },
                    {
                        "icon": <RiLogoutCircleRFill />,
                        "text": "Log Out"
                    }
                    ]}
                />
            </div>
        </div>
    )
}

export default SideBar