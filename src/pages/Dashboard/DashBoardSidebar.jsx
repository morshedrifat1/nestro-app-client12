import React, { use } from "react";
import lightLogo from "../../assets/logo-light.png";
import darkLogo from "../../assets/logo-dark.png";
import lightIcon from "../../assets/favicon.png";
import darkIcon from "../../assets/fav-dark.png";
import { Link, NavLink } from "react-router";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import {X } from "lucide-react";
const DashBoardSidebar = ({ dashboardLinks, collapsed, setHidden }) => {
  const { isDark } = use(ThemeContext);
  return (
    <div className="relative h-full">
      {/* sidebar header  */}
      <div className="flex flex-wrap items-center justify-between">
        <div>
          {/* logo */}
          <Link to={"/"}>
            {!collapsed && (
              <img
                className="w-30 px-1.5"
                src={isDark ? darkLogo : lightLogo}
                alt=""
              />
            )}
            {collapsed && (
              <img
                className="w-8 px-1.5 mx-auto"
                src={isDark ? darkIcon : lightIcon}
                alt=""
              />
            )}
          </Link>
        </div>
        {/* sidebar close */}
        <div>
          <button
            className="bg-subHeading p-1 rounded-lg cursor-pointer md:hidden"
            onClick={() => setHidden(true)}
          >
            <X></X>
          </button>
        </div>
      </div>
      {/* sidebar links */}
      <div className="mt-7">
        <ul className="space-y-3">
          {dashboardLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-navlink bg-subHeading px-1.5 py-1.5 rounded-lg flex items-center gap-2 text-base"
                    : "hover:bg-subHeading px-1.5 py-1.5 rounded-lg text-navlink flex items-center gap-2 text-base"
                }
                end={link.url === "/dashboard"}
                to={link.url}
              >
                <link.icon size={collapsed ? 20 : 18} />
                {!collapsed && <span>{link.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardSidebar;
