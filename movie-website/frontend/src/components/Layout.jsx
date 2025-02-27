import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../service/firebase";
import { setUser } from "../app/features/user/userSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { setVote } from "../app/features/vote/voteSlice";

function Layout() {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        dispatch(
          setUser({ uid: user.uid, email: user.email, ...docSnapshot.data() })
        );
        const moviesTvCollection = collection(db, "MoviesAndTV");
        const moviesTvSnapshot = await getDocs(moviesTvCollection);
        const movieTvList = moviesTvSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});
        dispatch(setVote(movieTvList));
      }
    });
  }, []);
  return (
    // app layout starts here
    <div
      className={`app-layout-container ${
        isDark ? "dark" : ""
      } h-screen sm:grid sm:grid-cols-[180px_1fr] md:grid-cols-[300px_1fr] bg-neutral-100 text-neutral-600 dark:bg-neutral-950 dark:text-neutral-300 font-poppins`}
    >
      {/* sidebar section starts here */}
      <section className="sidebar-section sm:p-2 md:p-4">
        <Sidebar
          isHamburgerOpen={isHamburgerOpen}
          setIsHamburgerOpen={setIsHamburgerOpen}
        />
      </section>
      {/* sidebar section ends here */}

      {/* header and content section starts here */}
      <div className="header-content-container grid grid-rows-[auto_1fr] h-screen">
        {/* header section starts here */}
        <section className="header-section p-2 md:p-4">
          <Header
            setIsHamburgerOpen={setIsHamburgerOpen}
            isDark={isDark}
            setIsDark={setIsDark}
          />
        </section>
        {/* header section ends here */}

        <div className="outlet-container flex-1 overflow-y-auto p-2 md:p-4">
          <Outlet />
        </div>
      </div>
      {/* header and content section ends here */}
    </div>
    // app layout ends here
  );
}

export default Layout;
