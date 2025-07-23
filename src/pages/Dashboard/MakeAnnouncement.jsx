import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FileText, Plus, Type } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import LoadingSpiner from "../../components/loadingSpiner/LoadingSpiner";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loader } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const announcementData = {
      adminEmail: user.email,
      adminName: user.displayName,
      adminPhoto: user.photoURL,
      annTitle: data.annTitle,
      annDesc: data.annDesc,
    };
    axiosSecure
      .post("/announcement-post", announcementData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your Announcement has been created successfully.",
            icon: "success",
            draggable: true,
          });
          reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "error!",
          text: `${error.message}`,
          icon: "error",
          draggable: true,
        });
      });
  };
  return (
    <>
      {loader ? (
        <LoadingSpiner></LoadingSpiner>
      ) : (
        <div className="bg-white/5 p-5 shadow-2xs shadow-accent  rounded-lg border border-mainborder ">
          <div>
            <h1 className="text-2xl font-bold text-base-300">
              Create New Announcement
            </h1>
            <p className="text-base font-normal text-base-content mt-2">
              Share important updates or news with all forum members.
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="text-base-300/80 font-medium text-sm">
                Announcement Title
              </label>
              <div className="relative mt-2.5">
                <input
                  type="text"
                  {...register("annTitle", { required: true })}
                  placeholder="Enter a Announcement Title"
                  className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2.5 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
                />
                <Type
                  size={17}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
                />
              </div>
              {/* error message for Announcement title */}
              {errors.annTitle?.type === "required" && (
                <p className="text-red-700 mt-1.5">
                  Enter a Announcement Title *
                </p>
              )}
              <label className="text-base-300/80 mt-4 block font-medium text-sm">
                Announcement Description
              </label>
              <div className="relative mt-2.5">
                <textarea
                  type="text"
                  {...register("annDesc", { required: true })}
                  placeholder="Write a Announcement Description"
                  className="pl-10 h-30 border-2 border-mainborder w-full bg-base-100 p-2.5 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
                />
                <FileText
                  size={17}
                  className="absolute top-3.5 left-3 text-base-content "
                />
              </div>
              {/* error message for Announcement Description */}
              {errors.annDesc?.type === "required" && (
                <p className="text-red-700 mt-1.5">
                  Write a Announcement Description *
                </p>
              )}
              <button
                type="submit"
                className="w-full sm:w-40 mt-5 py-2 rounded-lg cursor-pointer bg-primary text-accent flex items-center justify-center gap-2"
              >
                Post<Plus></Plus>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MakeAnnouncement;
