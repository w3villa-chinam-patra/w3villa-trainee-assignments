import React from "react";
import Menu from "./Menu";
import { GoHome } from "react-icons/go";
import { MdHowToVote, MdOutlineExplore } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import {
  EXPLORE_ROUTE,
  FAVORITES_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  TOP_VOTED_ROUTE,
} from "../../routes";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../app/features/user/userSlice";
import { auth } from "../../service/firebase";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

function Sidebar({ isHamburgerOpen, setIsHamburgerOpen }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      dispatch(setUser(null));
      navigate(HOME_ROUTE);
    } catch (error) {
      toast.error(error.message.split("Firebase: "));
    }
  };
  return (
    <div
      className={`sidebar-container transition-all duration-300 ease-in-out ${
        isHamburgerOpen ? "left-2" : "-left-full"
      } absolute z-30 sm:block sm:static bg-neutral-300 dark:bg-neutral-800 sm:h-full inset-y-2 rounded-2xl p-4 md:p-6 border dark:border-neutral-700 border-neutral-400`}
    >
      <div className="flex justify-end mb-2 sm:hidden">
        <div onClick={() => setIsHamburgerOpen(false)}>
          <RxCross2 />
        </div>
      </div>
      <Logo />
      <div className="menu-container py-6">
        <Menu
          options={[
            { icon: <GoHome />, title: t("home"), to: HOME_ROUTE },
            { icon: <MdOutlineExplore />, title: t("explore"), to: EXPLORE_ROUTE },
            {
              icon: <MdFavoriteBorder />,
              title: t("favorites"),
              to: FAVORITES_ROUTE,
            },
            { icon: <MdHowToVote />, title: t("topVoted"), to: TOP_VOTED_ROUTE },
          ]}
        />
        <div className="line-break h-0.5 bg-neutral-400 dark:bg-neutral-700 rounded-full"></div>
        <Menu
          options={[
            // { icon: <FiUser />, title: "Profile", to: PROFILE_ROUTE },
            {
              icon: <IoSettingsOutline />,
              title: t("settings"),
              to: SETTINGS_ROUTE,
            },
          ]}
        />
        {user ? (
          <div
            onClick={logoutHandler}
            className="logout-menu text-sm md:text-base flex gap-2 items-center my-4 md:my-6 cursor-pointer hover:text-red-400"
          >
            <IoMdLogOut className="text-base md:text-xl" />
            <div className="title">{t("logout")}</div>
          </div>
        ) : (
          <Link
            to={LOGIN_ROUTE}
            className="logout-menu text-sm md:text-base flex gap-2 items-center my-4 md:my-6 cursor-pointer hover:text-emerald-500 dark:hover:text-emerald-400"
          >
            <IoMdLogIn className="text-base md:text-xl" />
            <div className="title">{t("login")}</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
