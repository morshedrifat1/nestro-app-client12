import React, { useState } from "react";
import {
  User,
  FileText,
  FilePlus,
  Users,
  Megaphone,
  MessageCircleWarning,
  UserRoundCog,
} from "lucide-react";

import DashBoardSidebar from "./DashBoardSidebar";
import { Outlet, useLocation } from "react-router";
import DashboardHeader from "./DashboardHeader";
import useProfile from "../../hooks/useProfile";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(true);
  const location = useLocation();
  const { userProfile } = useProfile();

  const baseLinks = [
    {
      name: "My Profile",
      icon: User,
      url: "/dashboard/user-profile",
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
  ];

  const adminLinks = [
    {
      name: "Admin Profile",
      icon: UserRoundCog,
      url: '/dashboard/admin-profile',
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
  const dashboardLinks =
    userProfile?.role === "admin" ? [...baseLinks, ...adminLinks] : baseLinks;

  const currentPage = dashboardLinks.find(
    (page) => page.url == location.pathname
  );
  return (
    <div>
      <div className="flex">
        <div
          className={`${collapsed ? "w-17 p-4" : "w-64 p-5"} ${
            hidden ? "hidden" : "inline absolute z-10"
          } md:inline  h-screen bg-base-100 border-r border-mainborder transition-all duration-500 z-20`}
        >
          <DashBoardSidebar
            collapsed={collapsed}
            dashboardLinks={dashboardLinks}
            setHidden={setHidden}
          ></DashBoardSidebar>
        </div>
        <div className="flex-1  h-screen overflow-y-auto bg-boxbg">
          <DashboardHeader
            setCollapsed={setCollapsed}
            collapsed={collapsed}
            setHidden={setHidden}
            currentPage={currentPage}
          ></DashboardHeader>
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
