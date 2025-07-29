import React, { use } from "react";
import darkLogo from "../../assets/logo-dark.png";
import lightLogo from "../../assets/logo-light.png";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import { NavLink } from "react-router";
import { GoMail } from "react-icons/go";
const Footer = () => {
  const { isDark } = use(ThemeContext);

  return (
    <div className="bg-boxbg py-10 mt-15">
      <div className="max-w-[1420px] rounded-lg mx-auto px-5">
        <div className="flex flex-wrap sm:flex-nowrap gap-5 items-center justify-between">
          <div>
            <img className="w-28" src={isDark ? darkLogo : lightLogo} alt="" />
            <ul className="flex flex-wrap gap-3 mt-7">
              <li className="text-base-300 text-base font-normal">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="text-base-300 text-base font-normal">
                <NavLink to={"/membership"}>Membership</NavLink>
              </li>
              <li className="text-base-300 text-base font-normal">
                <NavLink>Features</NavLink>
              </li>
              <li className="text-base-300 text-base font-normal">
                <NavLink>Privacy</NavLink>
              </li>
              <li className="text-base-300 text-base font-normal">
                <NavLink>Help</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-base-300">
              Stay up to date
            </h1>
            <form className="flex items-center gap-2 mt-4">
              <div className="relative mt-1.5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
                />
                <GoMail
                  size={17}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
                />
              </div>
              <button className="bg-base-300 text-accent px-5 py-2 rounded-lg mt-1.5">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <hr className="my-5 sm:my-8 border-base-content/30" />
        <div>
          <p className="text-base font-normal text-base-content text-center">© 2025 nestro.com All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
