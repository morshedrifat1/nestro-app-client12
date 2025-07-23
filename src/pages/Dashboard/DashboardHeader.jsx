import {
  AlignJustify,
  ChevronRight,
  LayoutDashboard,
  User,
} from "lucide-react";
import React, { use } from "react";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import useAuth from "../../hooks/useAuth";
import Toast from "../../components/toast/Toast";
import { NavLink } from "react-router";
import { CiLogout } from "react-icons/ci";

const DashboardHeader = ({
  setCollapsed,
  collapsed,
  setHidden,
  currentPage,
}) => {
  const { isDark, toggleTheme } = use(ThemeContext);
  const { user, userSignout } = useAuth();
  // handle logout

  const handleSignOut = () => {
    userSignout()
      .then(() => {
        Toast({ type: "success", message: "Logout successful" });
      })
      .catch((error) => {
        Toast({ type: "error", message: error.message });
      });
  };
  return (
    <div className="border-b border-mainborder p-3 pr-6 flex items-center justify-between gap-3 sticky top-0 bg-boxbg z-10">
        {/* navigation header */}
      <div className="flex items-center gap-3">
        <div className="mt-2">
          <button
            className="bg-subHeading p-1 rounded-lg cursor-pointer hidden md:inline"
            onClick={() => setCollapsed(!collapsed)}
          >
            <AlignJustify></AlignJustify>
          </button>
          <button
            className="bg-subHeading p-1 rounded-lg cursor-pointer md:hidden"
            onClick={() => setHidden(false)}
          >
            <AlignJustify></AlignJustify>
          </button>
        </div>
        <div>
          <p className="flex items-center text-sm gap-2.5 mt-1">
            Dashboard <ChevronRight size={14}></ChevronRight>{" "}
            {currentPage?.name}
          </p>
        </div>
      </div>
      {/* theme and profile section */}
      <div className="flex items-center gap-3">
        {/* theme control */}
        <div>
          <label className="toggle text-base-content">
            <input
              type="checkbox"
              className="theme-controller"
              value="dark"
              checked={isDark}
              onChange={toggleTheme}
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>
        <div>
          {/* profile dropdown */}
          {user && (
            <div className=" flex  flex-col dropdown cursor-pointer">
              <div role="button" tabIndex={0} className="group">
                <img
                  src={user && user?.photoURL}
                  className="ring-offset-base-100 sm:inline ring-btn w-8 h-8 rounded-full ring-1 ring-offset-3"
                />
              </div>
              <div
                className={`absolute top-20 right-0 p-3 shadow rounded-lg dropdown-content z-[1] w-auto whitespace-nowrap bg-boxbg`}
              >
                <ul className="z-1 space-y-3">
                  <li className="flex items-center gap-2 bg-subHeading px-4 py-1.5 rounded-lg text-navlink">
                    <User></User>
                    {user?.displayName}
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="btn w-full bg-primary text-accent shadow-none px-5 sm:px-10 flex items-center"
                    >
                      <CiLogout size={22} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
