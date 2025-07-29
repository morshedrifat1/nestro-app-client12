import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Award, Crown, ShieldCheck, UserCheck, X } from "lucide-react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../components/loadingSpiner/LoadingSpiner";
import { useState } from "react";
import { GoMail } from "react-icons/go";
import Pagination from "../../components/Pagination/Pagination";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loader } = useAuth();
  const [email, setEmail] = useState("");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&limit=10&email=${email}`
      );
      setTotalPages(res.data.totalPages);
      return res.data.users;
    },
  });
  const hadleSearch = (e) => {
    e.preventDefault();
    const email = e.target.value;
    setEmail(email);
  };
  const handelAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change Role",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/update-role/${id}`)
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                title: "Updated!",
                text: "Your Role has been Updated.",
                icon: "success",
              });
            }
            refetch();
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to Update role", error);
          });
      }
    });
  };
  return (
    <>
      <div className="overflow-x-auto border border-mainborder rounded-box shadow-2xs shadow-accent">
        <div className="flex flex-wrap space-y-3 items-center justify-between p-3.5">
          <div>
            <h1 className="text-2xl font-bold text-base-300">
              Manage All Users
            </h1>
          </div>
          <div className="relative mt-1.5">
            <input
              onChange={hadleSearch}
              type="email"
              name="userEmail"
              placeholder="Search users by Email"
              className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
            />
            <GoMail
              size={17}
              className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
            />
          </div>
        </div>
        {loader || isLoading ? (
          <LoadingSpiner></LoadingSpiner>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  No
                </th>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  User Name
                </th>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  User Email
                </th>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  Membership
                </th>
                <th className="bg-base-100 text-heading text-sm whitespace-nowrap">
                  Make admin
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.map((user, index) => (
                <tr key={index}>
                  <th className="text-base-content whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="text-base-content whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="text-base-content whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="text-base-content whitespace-nowrap">
                    <p className="flex items-center gap-1 bg-base-300 w-fit px-3 text-sm font-medium py-0.5 rounded-full text-base-100 border border-mainborder mt-1">
                      {user.membership === "Bronze" ? (
                        <Award size={15}></Award>
                      ) : (
                        <Crown size={15}></Crown>
                      )}
                      {user.membership}
                    </p>
                  </td>
                  <td className="text-heading whitespace-nowrap">
                    <button
                      onClick={() => handelAdmin(user._id)}
                      className="bg-primary text-accent px-4 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      {user.role === "user" ? (
                        <UserCheck size={17} />
                      ) : (
                        <ShieldCheck size={17}></ShieldCheck>
                      )}
                      {user.role === "user" ? "Make Admin" : "Remove Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
    </>
  );
};

export default ManageUsers;
