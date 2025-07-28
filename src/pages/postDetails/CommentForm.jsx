import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import userIcon from '../../assets/user.png'
import AllComment from "./AllComment";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

const CommentForm = ({ refetch,totalComment }) => {
  const { user } = useAuth();
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [commentRefetch, setCommentRefetch] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if(!user){
      navigate("/auth/login", { state: location.pathname });
      return
    }
    const commentData = {
      postId: params.id,
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      commentText: data.comment,
      createdAt: new Date().toISOString(),
    };
    axiosSecure.post("/post-comment", commentData).then((res) => {
      if (res.data.insertedId) {
        reset();
        refetch();
        commentRefetch();
      }
    });
  };

  return (
    <div>
      <h1 className="text-base-300 text-xl font-bold mt-5">Comments ({totalComment})</h1>
      <div className="mt-5 bg-boxbg border border-mainborder rounded-lg p-5 flex gap-4">
        <div role="button" tabIndex={0} className="group">
          <img
            src={user ? user?.photoURL : userIcon}
            className="ring-offset-base-100 sm:inline ring-btn w-8 h-8 rounded-full ring-1 ring-offset-2"
          />
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              type="text"
              {...register("comment", {
                required: "Comment is required",
                maxLength: {
                  value: 300,
                  message: "Comment cannot exceed 300 characters",
                },
              })}
              placeholder="Write a detailed description for your post"
              className="pl-5 h-30 border-2 border-mainborder w-full bg-base-100 p-2.5 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
            />
            {errors.comment && (
              <p className="text-red-700 mt-1.5">{errors.comment.message}</p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-35 mt-3 py-2 rounded-lg cursor-pointer bg-primary text-accent gap-2 text-sm"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* load all coomment */}
      <div>
        <AllComment setCommentRefetch={setCommentRefetch}></AllComment>
      </div>
    </div>
  );
};

export default CommentForm;
