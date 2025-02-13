import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        // app layout starts here
        <div className="app-layout-container h-screen grid grid-cols-[300px_1fr] bg-neutral-900 text-neutral-300 font-poppins">

            {/* sidebar section starts here */}
            <section className="sidebar-section p-4">
                <Sidebar />
            </section>
            {/* sidebar section ends here */}

            {/* header and content section starts here */}
            <div className="header-content-container grid grid-rows-[auto_1fr]">
                {/* header section starts here */}
                <section className="header-section p-4">
                    <Header />
                </section>
                {/* header section ends here */}

                <div className="outlet-container flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
            {/* header and content section ends here */}

        </div>
        // app layout ends here
    )
}

export default Layout