import React, { use } from "react";
import lightLogo from "../../assets/logo-light.png";
import darkLogo from "../../assets/logo-dark.png";
import lightIcon from "../../assets/favicon.png";
import darkIcon from "../../assets/fav-dark.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import { AlignLeft, X } from "lucide-react";
const DashBoardSidebar = ({ dashboardLinks, collapsed,setHidden }) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = use(ThemeContext);
  return (
    <div className="relative h-full">
      {/* sidebar header  */}
      <div className="flex flex-wrap items-center justify-between">
        <div>
          {/* logo */}
          <Link to={"/"}>
            {!collapsed && <img className="w-30 px-1.5" src={isDark ? darkLogo : lightLogo} alt="" />}
            {collapsed && <img className="w-8 px-1.5 mx-auto" src={isDark ? darkIcon : lightIcon} alt="" />}
          </Link>
        </div>
        {/* theme controler */}
        <div>
          {!collapsed && <label className="toggle text-base-content">
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
          </label>}
        </div>
        {/* sidebar close */}
        <div>
            <button className="bg-subHeading p-1 rounded-lg cursor-pointer md:hidden" onClick={() => setHidden(true)}><X></X></button>
        </div>
      </div>
      {/* sidebar links */}
      <div className="mt-7">
        <ul className="space-y-3">
          {dashboardLinks.map((link,index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-navlink bg-subHeading px-1.5 py-1.5 rounded-lg flex items-center gap-2 text-base"
                    : "hover:bg-subHeading px-1.5 py-1.5 rounded-lg text-navlink flex items-center gap-2 text-base"
                }
                end={link.url === '/dashboard'}
                to={link.url}
              >
                <link.icon size={collapsed ? 20 : 18} />
                {!collapsed && <span>{link.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* sidebar footer */}
      <div className="absolute bottom-0 w-full flex items-center gap-2">
        <div className="avatar">
          <div className="ring-btn ring-offset-base-100 w-8 h-8 rounded-full ring-1 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>
        <div>
          <h3 className="text-navlink text-sm font-medium">
            {!collapsed && user?.displayName || ""}
          </h3>
          <p className="text-sm text-navlink/70">{!collapsed && user?.email || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSidebar;
