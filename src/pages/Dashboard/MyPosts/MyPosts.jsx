import { useQuery } from "@tanstack/react-query";
import { MessageCircleMore, X } from "lucide-react";
import Swal from "sweetalert2";
import LoadingSpiner from "../../../components/loadingSpiner/LoadingSpiner";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loader } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    data: posts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userPost", user?.email,currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posts?email=${user.email}&page=${currentPage}&limit=10`
      );
      setTotalPages(res.data.totalPages);
      return res.data.posts;
    },
  });
  // console.log(posts);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete Post!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/post/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Post has been Deleted.",
                icon: "success",
              });
            }
            refetch();
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire("Error", "Failed to delete post", "error");
          });
      }
    });
  };
  return (
    <>
      {loader || isLoading ? (
        <LoadingSpiner></LoadingSpiner>
      ) : posts.length === 0 ? (
        <NoDataFound
          title={"No Data Found"}
          description={"You haven’t posted anything yet."}
          buttonText={"Create Post"}
          url={"/dashboard/create-post"}
        ></NoDataFound>
      ) : (
        <div className="overflow-x-auto border border-mainborder rounded-box shadow-2xs shadow-accent">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  No
                </th>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  Title
                </th>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  Number of votes
                </th>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  Post Comments
                </th>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  Delete Post
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {posts?.map((post, index) => (
                <tr key={index}>
                  <th className="text-base-content whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="text-base-content whitespace-nowrap">
                    {post.postTitle}
                  </td>
                  <td className="text-base-content whitespace-nowrap">
                    {post.UpVote + post.DownVote}
                  </td>
                  <td className="text-base-content whitespace-nowrap">
                    <Link
                      to={`/dashboard/comments/${post._id}`}
                      className="bg-primary text-accent px-4 py-1.5 rounded-lg inline-flex items-center gap-2 cursor-pointer"
                    >
                      Comments {post?.postComments.length}{" "}
                      <MessageCircleMore size={15}></MessageCircleMore>
                    </Link>
                  </td>

                  <td className="text-heading whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-primary text-accent px-4 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      Delete <X size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* pagination */}
      <div className="my-4">
        {totalPages > 1 && (
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          ></Pagination>
        )}
      </div>
    </>
  );
};

export default MyPosts;
