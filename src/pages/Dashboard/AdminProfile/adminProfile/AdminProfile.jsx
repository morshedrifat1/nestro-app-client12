import React from "react";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import DataPaiChart from "./DataPaiChart";
import TagAddForm from "./TagAddForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpiner from "../../../../components/loadingSpiner/LoadingSpiner";

const AdminProfile = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: adminProfile,
    isLoading,
  } = useQuery({
    queryKey: ["comments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-profile?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <>
      {loader || isLoading ? (
        <LoadingSpiner></LoadingSpiner>
      ) : (
        <div className="bg-white/5 p-5 shadow-2xs shadow-accent  rounded-lg border border-mainborder ">
          <div className="space-y-2.5">
            <h1 className="text-base-300 text-2xl font-bold">Admin Profile</h1>
            <p className="text-base font-normal text-base-content">
              Manage your profile and posts
            </p>
          </div>
          {/* user info */}
          <div className="mt-10 flex items-center gap-4">
            <div role="button" tabIndex={0} className="group">
              <img
                src={user && user?.photoURL}
                className="ring-offset-base-100 sm:inline ring-btn w-16 h-16  sm:w-20 sm:h-20 rounded-full ring-1 ring-offset-3"
              />
            </div>
            <div>
              <h1 className="text-base-300 text-lg font-bold flex items-center gap-2">
                {user?.displayName}{" "}
                <BadgeCheck
                  className="bg-gradient-to-b from-[#24b2fd] to-[#036ae3] rounded-full text-white"
                  size={18}
                ></BadgeCheck>
              </h1>
              <p className="text-base font-normal text-navlink/70 ">
                {user?.email}
              </p>
              <p className="flex items-center gap-1 bg-base-300 w-fit px-3 text-sm font-medium py-0.5 rounded-full text-base-100 border border-mainborder mt-1">
                <ShieldCheck size={15}></ShieldCheck>
                Admin
              </p>
            </div>
          </div>
          {/* user activity */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            <div className="text-center bg-boxbg shadow-2xs border border-mainborder py-4 rounded-lg space-y-1">
              <h1 className="text-base-300 text-2xl font-bold">{adminProfile.totalPost}</h1>
              <p className="text-lg font-normal text-navlink px-3">
                Total Posts
              </p>
            </div>
            <div className="text-center bg-boxbg shadow-2xs border border-mainborder py-4 rounded-lg space-y-1">
              <h1 className="text-base-300 text-2xl font-bold">{adminProfile.totalVotes}</h1>
              <p className="text-lg font-normal text-navlin px-3">
                Total Votes
              </p>
            </div>
            <div className="text-center bg-boxbg shadow-2xs border border-mainborder py-4 rounded-lg space-y-1">
              <h1 className="text-base-300 text-2xl font-bold">{adminProfile.totalComment}</h1>
              <p className="text-lg font-normal text-navlink px-3">
                Comments Received
              </p>
            </div>
            <div className="text-center bg-boxbg shadow-2xs border border-mainborder py-4 rounded-lg space-y-1">
              <h1 className="text-base-300 text-2xl font-bold">{adminProfile.totalUser}</h1>
              <p className="text-lg font-normal text-navlink px-3">
                Total Users
              </p>
            </div>
          </div>

        {/* data pai chart */}
         <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
           <DataPaiChart totalComment={adminProfile.totalComment} totalUser={adminProfile.totalUser} totalPost={adminProfile.totalPost}></DataPaiChart>
           <TagAddForm></TagAddForm>
         </div>
        </div>
      )}
    </>
  );
};

export default AdminProfile;
