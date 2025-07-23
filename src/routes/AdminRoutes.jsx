import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";
import LoadingSpiner from "../components/loadingSpiner/LoadingSpiner";
import useProfile from "../hooks/useProfile";

const AdminRoutes = ({ children }) => {
  const { user, loader } = useAuth();
  const { userProfile, isLoading } = useProfile();

  if (loader || isLoading) {
    return <LoadingSpiner></LoadingSpiner>;
  }
  if (!user) {
    return (
      <Navigate to={"/auth/login"} state={location.pathname} replace></Navigate>
    );
  }
  if (userProfile.role === "user") {
    return (
      <Navigate to={"/forbidden"} state={location.pathname} replace></Navigate>
    );
  }
  return children;
};

export default AdminRoutes;
