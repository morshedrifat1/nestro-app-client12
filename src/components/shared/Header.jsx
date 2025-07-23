import { Bell, LayoutDashboard, User } from "lucide-react";
import { use } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { Link, NavLink } from "react-router";
import darkLogo from "../../assets/logo-dark.png";
import lightLogo from "../../assets/logo-light.png";
import userImg from "../../assets/user.png";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import useAuth from "../../hooks/useAuth";
import Toast from "../toast/Toast";

const Header = () => {
  // const [darkMode, setDarkMode] = useState(false);
  const { isDark, toggleTheme } = use(ThemeContext);
  const { user, userSignout } = useAuth();
  const navLink = (
    <>
      <li className="text-base font-medium ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-navlink bg-subHeading  px-4 py-1.5 rounded-lg"
              : "hover:bg-subHeading px-4 py-1.5 rounded-lg text-navlink"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li className="text-base font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-navlink bg-subHeading  px-4 py-1.5 rounded-lg"
              : "hover:bg-subHeading px-4 py-1.5 rounded-lg text-navlink"
          }
          to={"/membership"}
        >
          Membership
        </NavLink>
      </li>
      {!user && (
        <li className="text-base font-medium">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-navlink bg-subHeading  px-4 py-1.5 rounded-lg"
                : "hover:bg-subHeading px-4 py-1.5 rounded-lg text-navlink"
            }
            to={"/auth/login"}
          >
            Join US
          </NavLink>
        </li>
      )}
    </>
  );
  const mobileNavlink = (
    <>
      <li className="text-base font-medium ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-navlink bg-subHeading  px-4 py-1.5 rounded-lg"
              : "hover:bg-subHeading px-4 py-1.5 rounded-lg text-navlink"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li className="text-base font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-navlink bg-subHeading  px-4 py-1.5 rounded-lg"
              : "hover:bg-subHeading px-4 py-1.5 rounded-lg text-navlink"
          }
          to={"/membership"}
        >
          Membership
        </NavLink>
      </li>
      {user && (
        <li className="text-base font-medium">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-navlink bg-subHeading  px-4 py-1.5 rounded-lg"
                : "hover:bg-subHeading px-4 py-1.5 rounded-lg text-navlink"
            }
            to={"/dashboard/user-profile"}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  const navLinkDropdown = (
    <>
      <li className="flex items-center gap-2 bg-subHeading px-4 py-1.5 rounded-lg text-navlink">
        {" "}
        <User></User>
        {user?.displayName}
      </li>
      <li className="text-base font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-navlink bg-subHeading  px-4 py-1.5 rounded-lg flex items-center gap-2"
              : "hover:bg-subHeading px-4 py-1.5 rounded-lg text-navlink flex items-center gap-2"
          }
          to={"/dashboard/user-profile"}
        >
          <LayoutDashboard></LayoutDashboard> Dashboard
        </NavLink>
      </li>
    </>
  );

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
    <div className="border border-mainborder">
      <div className="navbar max-w-[1420px] rounded-lg mx-auto px-5 h-17">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <div className="w-full relative">
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-boxbg rounded-box z-1 mt-6 w-52 p-2 space-y-2 "
              >
                <li>
                  <div className="avatar space-x-2 py-2.5">
                    <div className="ring-btn ring-offset-base-100 w-8 h-8 rounded-full ring-1 ring-offset-2">
                      <img src={user && user?.photoURL} />
                    </div>
                  </div>
                </li>
                {mobileNavlink}
                <li>
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      className="btn bg-primary text-accent shadow-none px-5 sm:px-10 flex items-center"
                    >
                      <CiLogout size={22} /> Logout
                    </button>
                  ) : (
                    <Link
                      className="btn bg-primary text-accent shadow-none px-5 sm:px-10 flex items-center"
                      to={"/auth/login"}
                    >
                      Login
                      <CiLogin size={22} />
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <Link to={"/"}>
            <img className="w-36" src={isDark ? darkLogo : lightLogo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-3">{navLink}</ul>
        </div>
        {/* navbar end */}
        <div className="navbar-end space-x-4">
          {/* theme controler */}
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
          {/* anouncement notification count */}
          <div className="relative w-fit">
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
          {/* profile dropdown */}
          {user && (
            <div className=" lg:flex  flex-col hidden dropdown">
              <div role="button" tabIndex={0} className="group">
                <img
                  src={user ? user?.photoURL : userImg}
                  className="hidden ring-offset-base-100 sm:inline ring-btn w-10 h-10 rounded-full ring-1 ring-offset-3 cursor-pointer"
                />
              </div>
              <div
                className={`absolute top-20 right-0 p-3 shadow rounded-lg dropdown-content z-[1] w-auto whitespace-nowrap bg-boxbg`}
              >
                <ul className="z-1 space-y-3">
                  {navLinkDropdown}
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

          {!user && (
            <Link
              className="bg-primary py-2 rounded-xl text-accent shadow-none px-5 sm:px-5 sm:flex items-center hidden"
              to={"/auth/login"}
            >
              Login
              <CiLogin size={22} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
