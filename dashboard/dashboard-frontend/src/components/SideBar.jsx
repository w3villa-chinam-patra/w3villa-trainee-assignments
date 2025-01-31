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
import { SiGoogleforms } from "react-icons/si";
import { TbTableFilled } from "react-icons/tb";
import { FIRST_FORM_ROUTE } from '../routes';



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
                        "text": "Overview",
                        "route": "/",
                    },
                    {
                        "icon": <SiGoogleforms />,
                        "text": "Forms",
                        "subOptions": [
                            {
                                "icon": <SiGoogleforms />,
                                "text": "First Form",
                                "route": FIRST_FORM_ROUTE,
                                "label": "Forms"
                            },
                            {
                                "icon": <SiGoogleforms />,
                                "text": "Second Form",
                                "route": "/",
                                "label": "Forms"
                            }
                        ],
                    },
                    {
                        "icon": <TbTableFilled />,
                        "text": "Table",
                        "route": "table",
                    },
                    {
                        "icon": <IoCalendar />,
                        "text": "Calendar",
                        "route": "calendar",
                    },
                    {
                        "icon": <HiTicket />,
                        "text": "Tickets",
                        "route": "tickets",
                    },
                    {
                        "icon": <FaRegFolderOpen />,
                        "text": "File Manager",
                        "route": "file-manager",
                    },
                    {
                        "icon": <IoMdListBox />,
                        "text": "Kaban",
                        "route": "kaban",
                    },
                    {
                        "icon": <BsFillLayersFill />,
                        "text": "Projects",
                        "route": "projects",
                        "subOptions": [],
                    },
                    {
                        "icon": <FaClipboardList />,
                        "text": "Tasks",
                        "route": "tasks",
                        "subOptions": [],
                    },
                    ]}
                />
                <SideBarMenu
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    heading={"adminstrartor"}
                    options={[{
                        "icon": <HiUsers />,
                        "text": "Auth Pages",
                        "route": "auth-pages",
                        "subOptions": [],
                    },
                    {
                        "icon": <GiCardboardBoxClosed />,
                        "text": "Extra Pages",
                        "route": "extra-pages",
                        "subOptions": [],
                    },
                    {
                        "icon": <BiSolidLayout />,
                        "text": "Layout",
                        "route": "layout",
                    }
                    ]}
                />
                <SideBarMenu
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    heading={"settings"}
                    options={[{
                        "icon": <MdContactSupport />,
                        "text": "Supports",
                        "route": "supports",
                        "subOptions": [],
                    },
                    {
                        "icon": <RiSettings4Fill />,
                        "text": "Settings",
                        "route": "settings",
                        "subOptions": [],
                    },
                    {
                        "icon": <RiLogoutCircleRFill />,
                        "text": "Log Out",
                        "route": "logout",
                    }
                    ]}
                />
            </div>
        </div>
    )
}

export default SideBar