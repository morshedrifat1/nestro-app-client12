import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Membership from "../pages/Membership/Membership";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreatePost from "../pages/Dashboard/AddPost";
import MyPosts from "../pages/Dashboard/MyPosts";
import MyProfile from "../pages/Dashboard/MyProfile";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ReportedComments from "../pages/Dashboard/ReportedComments";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
      {index:true,Component:Home},
      {path:'membership',Component:Membership},
      {path:'auth/login',Component:Login},
      {path:'auth/register',Component:Register},
    ]
  },
  {
    path:'dashboard',
    Component:Dashboard,
    children:[
      {path:'my-profile',Component:MyProfile},
      {path:'my-post',Component:MyPosts},
      {path:'create-post',Component:CreatePost},
      {path:'manage-users',Component:ManageUsers},
      {path:'make-announcement',Component:MakeAnnouncement},
      {path:'reported-comments',Component:ReportedComments},
    ]
  }
]);