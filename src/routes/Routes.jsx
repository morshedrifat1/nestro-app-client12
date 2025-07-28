import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import CreatePost from "../pages/Dashboard/AddPost";
import AdminProfile from "../pages/Dashboard/AdminProfile/adminProfile/AdminProfile";
import Dashboard from "../pages/Dashboard/Dashboard";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import ReportedComments from "../pages/Dashboard/ReportedComments";
import UserProfile from "../pages/Dashboard/UserProfile";
import Forbidden from "../pages/forbidden/Forbidden";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Membership from "../pages/Membership/Membership";
import Payment from "../pages/payment/Payment";
import PostDetails from "../pages/postDetails/PostDetails";
import Register from "../pages/register/Register";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import PostComments from "../pages/Dashboard/MyPosts/PostComments";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "membership", element: <PrivateRoutes><Membership></Membership></PrivateRoutes> },
      { path: "post-details/:id", Component: PostDetails },
      { path: "auth/login", Component: Login },
      { path: "auth/register", Component: Register },
      { path: "payment", Component: Payment },
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
        path: "comments/:postId",
        element: (
          <PrivateRoutes>
            <PostComments></PostComments>
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
