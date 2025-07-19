import React, { useState } from "react";
import {
  User,
  FileText,
  FilePlus,
  Users,
  Megaphone,
  MessageCircleWarning,
} from "lucide-react";

import DashBoardSidebar from "./DashBoardSidebar";

const Dashboard = () => {
      const [collapsed, setCollapsed] = useState(false);
    
  const dashboardLinks = [
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

  return (
    <div>
      <div className="flex">
        <div className={`${collapsed?"w-17 p-4" : "w-64 p-5"}  h-screen bg-base-100 border-r border-mainborder transition-all duration-300`}>
          <DashBoardSidebar collapsed={collapsed} setCollapsed={setCollapsed} dashboardLinks={dashboardLinks}></DashBoardSidebar>
        </div>
        <div className={`flex-1  h-screen bg-boxbg`}>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
