import { Plus, Type } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Toast from "../../../../components/toast/Toast";

const TagAddForm = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const tag = data.tag.split(" ").join('');
    axiosSecure
      .post("/tags-post", { tag })
      .then((res) => {
        if (res.data.insertedId) {
          Toast({ type: "success", message: "Tag created successfully!" });
          reset();
        }
      })
      .catch((error) => {
        Toast({ type: "error", message: error.response.data.message });
      });
  };
  return (
    <div className="p-5 border border-mainborder rounded-lg shadow-2xs bg-boxbg">
      <div>
        <h1 className="text-xl font-bold text-base-300">Create New Tag</h1>
        <p className="text-base font-normal text-base-content mt-2">
          Add a New Tags to Enhance User Posts
        </p>
      </div>
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-base-300/80 font-medium text-sm">
          Post Title
        </label>
        <div className="relative mt-2.5">
          <input
            type="text"
            {...register("tag", { required: true })}
            placeholder="Enter tag name"
            className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2.5 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
          />
          <Type
            size={17}
            className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
          />
        </div>
        {errors.tag?.type === "required" && (
          <p className="text-red-700 mt-1.5">Enter tag name *</p>
        )}
        <button
          type="submit"
          className="w-full sm:w-40 mt-5 py-2 rounded-lg cursor-pointer bg-primary text-accent flex items-center justify-center gap-2"
        >
          Post<Plus></Plus>
        </button>
      </form>
    </div>
  );
};

export default TagAddForm;
