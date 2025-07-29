import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, CircleAlert, Eye } from "lucide-react";
import LoadingSpiner from "../../../components/loadingSpiner/LoadingSpiner";
import NoDataFound from "../../../components/noDataFound/NoDataFound";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";

const PostComments = () => {
  const axiosSecure = useAxiosSecure();
  const { loader } = useAuth();
  const [commentText, setCommentText] = useState("");
  const params = useParams();
  const [selectedReports, setSelectedReports] = useState({});
  const [disabledButtons, setDisabledButtons] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", params.postId, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/comments-report/${params.postId}?page=${currentPage}&limit=10`
      );
      setTotalPages(res.data.totalPages);
      return res.data.comments;
    },
  });
  const handleSelectChange = (commentId, value) => {
    setSelectedReports((prev) => ({ ...prev, [commentId]: value }));
    setDisabledButtons((prev) => ({ ...prev, [commentId]: false }));
  };

  const handleReport = (id) => {
    const reportReason = selectedReports[id];
    if (!reportReason) return;
    axiosSecure
      .post(`/report-comment/${id}`, { report: reportReason })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          setDisabledButtons((prev) => ({ ...prev, [id]: true }));
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
          description={"You post haven’t any comment"}
          buttonText={"Create Post"}
          url={"/dashboard/create-post"}
        ></NoDataFound>
      ) : (
        <div>
          {/* back button */}
          <Link
            to={"/dashboard/my-post"}
            className="mt-3 w-25 py-2 rounded-lg cursor-pointer text-navlink bg-subHeading flex items-center justify-center gap-1"
          >
            <ChevronLeft size={20}></ChevronLeft> Back
          </Link>

          <div className="overflow-x-auto border border-mainborder rounded-box shadow-2xs shadow-accent mt-5">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    No
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Email
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Comment
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Read More
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Feedback
                  </th>
                  <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                    Report
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
                      {comment?.report ? (
                        <button className="bg-[#00d390] text-white px-2 py-1 rounded-full">
                          {comment?.report}
                        </button>
                      ) : (
                        <select
                          onChange={(e) =>
                            handleSelectChange(comment._id, e.target.value)
                          }
                          value={selectedReports[comment._id] || ""}
                          className="block px-2 py-2 text-base font-medium text-gray-700 bg-white border border-mainborder shadow rounded-md"
                        >
                          <option value="">Select feedback</option>
                          <option value="Spam">Spam</option>
                          <option value="Bullying">Bullying</option>
                          <option value="Harassment">Harassment</option>
                        </select>
                      )}
                    </td>

                    <td className="text-heading whitespace-nowrap">
                      <button
                        onClick={() => handleReport(comment._id)}
                        disabled={disabledButtons[comment._id] ?? true}
                        className={`px-4 py-2 rounded flex items-center gap-2 ${
                          disabledButtons[comment._id] ?? true
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-base-300 text-accent cursor-pointer"
                        }`}
                      >
                        Report <CircleAlert size={17} />
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

export default PostComments;
