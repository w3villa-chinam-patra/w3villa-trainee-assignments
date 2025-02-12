import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

function Layout() {
    return (
        <div className='app-container bg-indigo-950 text-neutral-100 h-screen flex flex-col'>
            <Header />
            <div className="outlet-container container mx-auto p-4 bg-inherit rounded-2xl flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout