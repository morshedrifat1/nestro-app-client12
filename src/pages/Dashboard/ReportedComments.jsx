import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Eye, Trash } from "lucide-react";
import Swal from "sweetalert2";
import LoadingSpiner from "../../../src/components/loadingSpiner/LoadingSpiner";
import NoDataFound from "../../../src/components/noDataFound/NoDataFound";
import useAuth from "../../../src/hooks/useAuth";
import useAxiosSecure from "../../../src/hooks/useAxiosSecure";
import { Link } from "react-router";
import { useState } from "react";
import Toast from "../../components/toast/Toast";
import Pagination from "../../components/Pagination/Pagination";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const { loader } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [commentText, setCommentText] = useState("");
  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reported-comments?page=${currentPage}&limit=10`
      );
      setTotalPages(res.data.totalPages);
      return res.data.comments;
    },
  });
  // console.log(currentPage);

  const handleAction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete Comment",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/reported-comment/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Toast({
                type: "success",
                message: "Comment deleted successfully",
              });
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to Delete Comment", error);
          });
      }
    });
  };
  const handleSeemore = (text) => {
    setCommentText(text);
    document.getElementById("my_modal_3").showModal();
  };
  return (
    <>
      {loader || isLoading ? (
        <LoadingSpiner></LoadingSpiner>
      ) : comments.length === 0 ? (
        <NoDataFound
          title={"No Data Found"}
          description={"You post haven’t any reported comment"}
          buttonText={"Create Post"}
          url={"/dashboard/create-post"}
        ></NoDataFound>
      ) : (
        <div>
          <div className="overflow-x-auto border border-mainborder rounded-box shadow-2xs shadow-accent mt-5">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    No
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Commenter Email
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Comment
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Read More
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Author Feedback
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {comments?.map((comment, index) => (
                  <tr key={index}>
                    <th className="text-base-content whitespace-nowrap">
                      {index + 1}
                    </th>
                    <td className="text-base-content whitespace-nowrap">
                      {comment?.userEmail}
                    </td>
                    <td className="text-base-content whitespace-nowrap">
                      {comment?.commentText.slice(0, 20)} ...
                    </td>
                    <td className="text-base-content whitespace-nowrap">
                      <button
                        onClick={() => handleSeemore(comment?.commentText)}
                        className="bg-primary text-accent px-4 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        Read More <Eye size={17} />
                      </button>
                    </td>

                    <td className="text-heading whitespace-nowrap">
                      <button className="bg-[#00d390] text-white px-2 py-1 rounded-full">
                        {comment?.report}
                      </button>
                    </td>

                    <td className="text-heading whitespace-nowrap">
                      <button
                        onClick={() => handleAction(comment._id)}
                        className="bg-base-300 text-accent px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        Delete <Trash size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* modal for seemore text comment */}
            <div>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <p className="py-4 text-base-300 text-base leading-7">
                    {commentText}
                  </p>
                </div>
              </dialog>
            </div>
          </div>
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
        </div>
      )}
    </>
  );
};

export default ReportedComments;
