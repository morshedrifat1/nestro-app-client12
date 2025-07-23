import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Membership from "../pages/Membership/Membership";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreatePost from "../pages/Dashboard/AddPost";
import MyPosts from "../pages/Dashboard/MyPosts";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ReportedComments from "../pages/Dashboard/ReportedComments";
import Forbidden from "../pages/forbidden/Forbidden";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import UserProfile from "../pages/Dashboard/UserProfile";
import AdminProfile from "../pages/Dashboard/AdminProfile/adminProfile/AdminProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "membership", Component: Membership },
      { path: "auth/login", Component: Login },
      { path: "auth/register", Component: Register },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "user-profile",
        element: (
          <PrivateRoutes>
            <UserProfile></UserProfile>
          </PrivateRoutes>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoutes>
            <AdminProfile></AdminProfile>
          </AdminRoutes>
        ),
      },
      {
        path: "my-post",
        element: (
          <PrivateRoutes>
            <MyPosts></MyPosts>
          </PrivateRoutes>
        ),
      },
      {
        path: "create-post",
        element: (
          <PrivateRoutes>
            <CreatePost></CreatePost>
          </PrivateRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoutes>
            <ManageUsers></ManageUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminRoutes>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminRoutes>
        ),
      },
      {
        path: "reported-comments",
        element: (
          <AdminRoutes>
            <ReportedComments></ReportedComments>
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "forbidden",
    Component: Forbidden,
  },
]);
