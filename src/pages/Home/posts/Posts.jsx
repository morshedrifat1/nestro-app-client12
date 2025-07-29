import React, { useState } from "react";
import PostCard from "./PostCard";
import Tags from "../tags/Tags";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../../components/Pagination/Pagination";
import LoadingSpiner from "../../../components/loadingSpiner/LoadingSpiner";
import Announcement from "../announcement/Announcement";

const Posts = ({search}) => {
  const axios = useAxios();
  const [sortPopuler,setSortPopuer] = useState('');
  const [searchTag,setSearchTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const queryParams = {
      page:currentPage,
      limit: 5,
      sort:sortPopuler,
      tag:searchTag,
      search
    }
  const {
      data: posts = [],isLoading,refetch
    } = useQuery({
      queryKey: ["posts",queryParams],
      queryFn: async () => {
        const res = await axios.get('/all-posts',{ params: queryParams });
        setTotalPages(res.data.totalPages)
        return res.data.posts;
      }
    });

    if(isLoading){
      return <LoadingSpiner></LoadingSpiner>
    }

  return (
    <div className="my-10" id="post-section">
      <div className="grid grid-cols-1 gap-y-5 md:grid-cols-3 mt-3 md:gap-5 items-start">
        <div className="col-span-2 space-y-4">
          <div className="flex flex-wrap gap-5 justify-between items-center">
            <h1 className="text-base-300 text-2xl font-bold">Recent Posts</h1>
            <div>
              <button onClick={()=>setSortPopuer('popular')} className="bg-boxbg px-5 py-2 border border-mainborder rounded-lg cursor-pointer">
               Sort by Popularity 
              </button>
            </div>
          </div>
          {posts.map((post,index) => (
            <PostCard key={index} setSearchTag={setSearchTag} post={post} refetch={refetch}></PostCard>
          ))}
          {(totalPages>1)&&<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}></Pagination>}
          
        </div>
        <div className="sticky top-20 space-y-3">
          <Tags setSearchTag={setSearchTag} ></Tags>
          <Announcement></Announcement>
        </div>
      </div>
    </div>
  );
};

export default Posts;
