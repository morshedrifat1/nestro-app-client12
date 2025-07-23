import { FileText, Plus, Type } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../components/loadingSpiner/LoadingSpiner";
import MambershipPrice from "../Membership/MambershipPrice";
import Membership from "../Membership/Membership";
import { useEffect, useState } from "react";
const CreatePost = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [totalPost, setTotalPost] = useState(0);
  // fetch user profile data for count post
  const { data: userProfile = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-profile?email=${user?.email}`);
      return res.data;
    },
  });
  // set total post in state
  useEffect(() => {
    if (userProfile?.totalPost) {
      setTotalPost(userProfile.totalPost);
    }
  }, [userProfile?.totalPost]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const options = [
    { value: "JS", label: "Js" },
    { value: "React", label: "React" },
    { value: "Express Js", label: "Express Js" },
  ];
  const onSubmit = (data) => {
    const postTag = data.postTags.map((tag) => tag.value);
    const { postTags, ...rest } = data;
    const postData = {
      ...rest,
      postTag,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      UpVote: 0,
      DownVote: 0,
      postTime: new Date().toISOString(),
    };
    axiosSecure.post("/post", postData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your post has been created successfully.",
          icon: "success",
          draggable: true,
        });
        reset();
        setTotalPost(totalPost + 1);
      }
    });
  };
  return (
    <>
      {loader || isLoading ? (
        <LoadingSpiner></LoadingSpiner>
      ) : userProfile.membership === "Bronze" && totalPost === 5 ? (
        <Membership></Membership>
      ) : (
        <div className="bg-white/5 p-5 shadow-2xs shadow-accent  rounded-lg border border-mainborder ">
          <div>
            <h1 className="text-2xl font-bold text-base-300">
              Create New Post
            </h1>
            <p className="text-base font-normal text-base-content mt-2">
              Share your knowledge with the community
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="text-base-300/80 font-medium text-sm">
                Post Title
              </label>
              <div className="relative mt-2.5">
                <input
                  type="text"
                  {...register("postTitle", { required: true })}
                  placeholder="Enter the post title"
                  className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2.5 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
                />
                <Type
                  size={17}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
                />
              </div>
              {/* error message for email */}
              {errors.postTitle?.type === "required" && (
                <p className="text-red-700 mt-1.5">Enter the post title *</p>
              )}
              <label className="text-base-300/80 mt-4 block font-medium text-sm">
                Post Description
              </label>
              <div className="relative mt-2.5">
                <textarea
                  type="text"
                  {...register("postDescription", { required: true })}
                  placeholder="Write a detailed description for your post"
                  className="pl-10 h-30 border-2 border-mainborder w-full bg-base-100 p-2.5 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
                />
                <FileText
                  size={17}
                  className="absolute top-3.5 left-3 text-base-content "
                />
              </div>
              {/* error message for post Description */}
              {errors.postDescription?.type === "required" && (
                <p className="text-red-700 mt-1.5">
                  Write a detailed description for your post *
                </p>
              )}
              <label className="text-base-300/80 mt-4 block font-medium text-sm">
                Select a tag
              </label>
              <div className="relative mt-2.5">
                <Controller
                  name="postTags"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      isMulti
                      onChange={(selected) => field.onChange(selected)}
                      classNames={{
                        control: (state) =>
                          state.isFocused
                            ? "border-red-600"
                            : "border-grey-300",
                      }}
                    />
                  )}
                />
              </div>
              {/* error message for email */}
              {errors.postTags?.type === "required" && (
                <p className="text-red-700 mt-1.5">
                  Select tag for your post *
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

export default CreatePost;
