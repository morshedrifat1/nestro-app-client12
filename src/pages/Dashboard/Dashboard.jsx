import React, { useState } from "react";
import {
  User,
  FileText,
  FilePlus,
  Users,
  Megaphone,
  MessageCircleWarning,
  ChevronRight,
  AlignJustify,
  Home,
} from "lucide-react";

import DashBoardSidebar from "./DashBoardSidebar";
import { useLocation } from "react-router";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(true);
  const location = useLocation();
  const dashboardLinks = [
    {
      name: "Home",
      icon: Home,
      url: "/dashboard",
    },
    {
      name: "My Profile",
      icon: User,
      url: "/dashboard/my-profile",
    },
    {
      name: "My Posts",
      icon: FileText,
      url: "/dashboard/my-post",
    },
    {
      name: "Create Post",
      icon: FilePlus,
      url: "/dashboard/create-post",
    },
    {
      name: "Manage Users",
      icon: Users,
      url: "/dashboard/manage-users",
    },
    {
      name: "Make Announcement",
      icon: Megaphone,
      url: "/dashboard/make-announcement",
    },
    {
      name: "Reported Comments",
      icon: MessageCircleWarning,
      url: "/dashboard/reported-comments",
    },
  ];
  const currentPage = dashboardLinks.find(
    (page) => page.url == location.pathname
  );
  return (
    <div>
      <div className="flex">
        <div
          className={`${
            collapsed ? "w-17 p-4" : "w-64 p-5"
          } ${hidden?'hidden':'inline absolute'} md:inline  h-screen bg-base-100 border-r border-mainborder transition-all duration-500`}
        >
          <DashBoardSidebar
            collapsed={collapsed}
            dashboardLinks={dashboardLinks}
            setHidden={setHidden}
          ></DashBoardSidebar>
        </div>
        <div className="flex-1  h-screen bg-boxbg">
          <div className="border-b border-mainborder p-3 flex items-center gap-3">
            <div className="mt-2">
              <button className="bg-subHeading p-1 rounded-lg cursor-pointer hidden md:inline" onClick={() => setCollapsed(!collapsed)}><AlignJustify></AlignJustify></button>
              <button className="bg-subHeading p-1 rounded-lg cursor-pointer md:hidden" onClick={() => setHidden(false)}><AlignJustify></AlignJustify></button>
            </div>
            <p className="flex items-center text-sm gap-2.5 mt-1">
              Dashboard <ChevronRight size={14}></ChevronRight>{" "}
              {currentPage?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
