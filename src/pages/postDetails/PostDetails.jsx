import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  MessageCircle,
  Share2,
} from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import LoadingSpiner from "../../components/loadingSpiner/LoadingSpiner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useProfile from "../../hooks/useProfile";
import Toast from "../../components/toast/Toast";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import CommentForm from "./CommentForm";

const PostDetails = () => {
  const { user } = useAuth();
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const axios = useAxios();
  const {
    data: post,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post",params.id],
    queryFn: async () => {
      const res = await axios.get(`/post/${params.id}`);
      return res.data;
    },
  });
  //   vote update
  const { userProfile } = useProfile();
  const handleVote = async (type) => {
    if(!user){
      navigate("/auth/login", { state: location.pathname });
      return
    }
    await axiosSecure.patch(`/posts/vote/${post._id}`, {
      userId: userProfile._id,
      type,
    });
    refetch();
  };
  const handleCopy = () => {
    const urlToCopy = `${import.meta.env.VITE_URL}/post-details/${post._id}`;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      Toast({ type: "success", message: "URL copied to clipboard!" });
    });
  };
  // post date
  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  if (isLoading) {
    return <LoadingSpiner></LoadingSpiner>;
  }
  return (
    <div className="max-w-200 mx-auto p-5 mt-0 sm:mt-15">
      <Link to={'/'} className="mt-3 w-25 py-2 rounded-lg cursor-pointer text-navlink bg-subHeading flex items-center justify-center gap-1">
        <ChevronLeft size={20}></ChevronLeft> Back
      </Link>
      <div className="bg-boxbg border border-mainborder rounded-lg p-5 mt-4">
        <div>
          <div className="flex items-center gap-4">
            <div role="button" tabIndex={0} className="group">
              <img
                src={post && post?.userPhoto}
                className="ring-offset-base-100 sm:inline ring-btn w-8 h-8 rounded-full ring-1 ring-offset-2"
              />
            </div>
            <div>
              <h1 className="text-base-300 text-base font-medium flex items-center gap-2">
                {post?.userName}
                <BadgeCheck
                  className="bg-gradient-to-b from-[#24b2fd] to-[#036ae3] rounded-full text-white"
                  size={18}
                ></BadgeCheck>
              </h1>
              <p className="text-base-content text-sm font-normal">
                {getTimeAgo(post?.postTime)}
              </p>
            </div>
          </div>
          <div></div>
        </div>
        <Link to={`/post-details/${post._id}`}>
          <h1 className="text-lg font-semibold text-base-300 mt-2">
            {post?.postTitle}
          </h1>
        </Link>
        <p className="text-base leading-7 font-normal text-base-content mt-2">
          {post?.postDescription}
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          {post?.postTag.map((tag) => (
            <button className="border bg-subHeading border-mainborder px-2.5 text-navlink text-sm rounded-full cursor-pointer">
              # {tag}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => handleVote("up")}
              className="flex items-center gap-2 text-base-300 text-sm bg-subHeading/50 rounded-md p-1 px-2 cursor-pointer"
            >
              <ChevronUp size={18}></ChevronUp>
              {post?.UpVote}
            </button>
            <button
              onClick={() => handleVote("down")}
              className="flex items-center gap-2 text-base-300 text-sm bg-subHeading/50 rounded-md p-1 px-2 cursor-pointer"
            >
              <ChevronDown size={18}></ChevronDown>
              {post?.DownVote}
            </button>
            <button className="flex items-center gap-2 text-base-300 text-sm bg-subHeading/50 rounded-md p-1 px-2 cursor-pointer">
              <MessageCircle size={18}></MessageCircle>
              {post?.Comments}
            </button>
          </div>
          <div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-base-300 text-sm bg-subHeading/50 rounded-md p-1 px-2 cursor-pointer"
            >
              <Share2 size={18}></Share2>Share
            </button>
          </div>
        </div>
      </div>
      {/* comments */}
      <div>
        <CommentForm totalComment={post?.Comments} refetch={refetch}></CommentForm>
      </div>
    </div>
  );
};

export default PostDetails;
