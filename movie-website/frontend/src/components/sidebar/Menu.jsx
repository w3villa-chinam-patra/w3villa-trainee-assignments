import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Menu({ options }) {
    const location = useLocation();
    return (
        <ul>
            {options.map((menu) => <li key={menu.title}>
                <Link to={menu.to}>
                    <div className={`option-container flex gap-2 text-sm md:text-base items-center my-4 md:my-6 cursor-pointer hover:text-emerald-200 ${location.pathname === menu.to ? "text-emerald-200" : ""}`}>
                        <div className='icon text-lg md:text-xl'>
                            {menu.icon}
                        </div>
                        <div className="title">
                            {menu.title}
                        </div>
                    </div>
                </Link>
            </li>)}
        </ul>
    )
}

export default Menu