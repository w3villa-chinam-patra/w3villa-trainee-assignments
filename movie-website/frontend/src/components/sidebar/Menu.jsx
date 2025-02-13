import React from 'react'

function Menu({ options }) {
    return (
        <ul>
            {options.map((menu) => <li key={menu.title} className='flex gap-2 items-center my-6 cursor-pointer hover:text-emerald-200'>
                <div className='icon text-xl'>
                    {menu.icon}
                </div>
                <div className="title">
                    {menu.title}
                </div>
            </li>)}
        </ul>
    )
}

export default Menu