import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth, db } from '../service/firebase'
import { setUser } from '../app/features/user/userSlice'
import { doc, getDoc } from 'firebase/firestore'

function Layout() {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            const docRef = doc(db, "Users", user.uid)
            const docSnapshot = await getDoc(docRef)
            if (docSnapshot.exists()) {
                dispatch(setUser({ uid: user.uid, email: user.email, ...docSnapshot.data() }));
            } else {
                alert("user is not logged in");
            }
        })
    }, [])
    return (
        // app layout starts here
        <div className="app-layout-container h-screen sm:grid sm:grid-cols-[180px_1fr] md:grid-cols-[300px_1fr] bg-neutral-950 text-neutral-300 font-poppins">

            {/* sidebar section starts here */}
            <section className="sidebar-section sm:p-2 md:p-4">
                <Sidebar isHamburgerOpen={isHamburgerOpen} setIsHamburgerOpen={setIsHamburgerOpen} />
            </section>
            {/* sidebar section ends here */}

            {/* header and content section starts here */}
            <div className="header-content-container grid grid-rows-[auto_1fr] h-screen">
                {/* header section starts here */}
                <section className="header-section p-2 md:p-4">
                    <Header  setIsHamburgerOpen={setIsHamburgerOpen} />
                </section>
                {/* header section ends here */}

                <div className="outlet-container flex-1 overflow-y-auto p-2 md:p-4">
                    <Outlet />
                </div>
            </div>
            {/* header and content section ends here */}

        </div>
        // app layout ends here
    )
}

export default Layout