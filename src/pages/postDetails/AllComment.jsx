import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router";
import LoadingSpiner from "../../components/loadingSpiner/LoadingSpiner";
import { formatDistanceToNow } from "date-fns";

const AllComment = ({ setCommentRefetch }) => {
  const axios = useAxios();
  const params = useParams();
  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", params.id],
    queryFn: async () => {
      const res = await axios.get(`/comments/${params.id}`);
      return res.data;
    },
  });
  useEffect(() => {
    setCommentRefetch(() => refetch);
  }, [refetch, setCommentRefetch]);

  if (isLoading) {
    return <LoadingSpiner></LoadingSpiner>;
  }


  // post date
    const getTimeAgo = (createdAt) => {
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    };
    console.log(comments);
  return (
    <div>
      {comments.map((comment) => (
        <div className="mt-5 bg-boxbg border border-mainborder rounded-lg p-5">
          <div className="flex gap-4">
            <div role="button" tabIndex={0} className="group">
              <img
                src={comment && comment?.userPhoto}
                className="ring-offset-base-100 sm:inline ring-btn w-8 h-8 rounded-full ring-1 ring-offset-2"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-sm font-medium text-base-300">{comment?.userName} </h1> 
                <span className="text-base">•</span>
                <p className="text-sm font-normal text-base-content"> {getTimeAgo(comment?.createdAt)}</p>
              </div>
              <div>
                <p className="text-base text-base-content">{comment?.commentText}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComment;
