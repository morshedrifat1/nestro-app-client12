import React from "react";
import PostCard from "./PostCard";
import Tags from "../tags/Tags";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
  const axios = useAxios();
  const { data: posts = [] ,refetch} = useQuery({
    queryKey: "posts",
    queryFn: async () => {
      const res = await axios.get("/all-posts");
      return res.data;
    },
  });
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-y-5 md:grid-cols-3 mt-3 md:gap-5 items-start">
        <div className="col-span-2 space-y-4">
          <div className="flex flex-wrap gap-5 justify-between items-center">
            <h1 className="text-base-300 text-2xl font-bold">Recent Posts</h1>
            <div>
              <button className="bg-boxbg px-5 py-2 border border-mainborder rounded-lg cursor-pointer">
                Sort by Popularity
              </button>
            </div>
          </div>
          {posts.map((post) => (
            <PostCard post={post} refetch={refetch}></PostCard>
          ))}
        </div>
        <div className="sticky top-20">
          <Tags></Tags>
        </div>
      </div>
    </div>
  );
};

export default Posts;
