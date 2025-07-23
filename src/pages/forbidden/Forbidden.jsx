import { CircleAlert } from "lucide-react";
import React from "react";
import { Link } from "react-router";
const Forbidden = () => {
  return (
    <div className="py-25 flex flex-col max-w-[1420px] mx-auto justify-center items-center px-5">
      <div className="py-15 w-75 sm:w-150 bg-boxbg mx-auto px-5 text-center border border-mainborder rounded-lg flex flex-col justify-center items-center">
        <div className="bg-boxbg shadow-lg shadow-subHeading w-17 h-17 flex items-center rounded-full  mx-auto">
          <CircleAlert
            size={40}
            className="mx-auto text-yellow-500"
          ></CircleAlert>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-heading mt-5">
          403
        </h1>
        <p className="text-base sm:text-lg text-base-content mt-3">
          "Access Forbidden: You don't have permission to view this resource."
        </p>
        <Link className="bg-base-300 text-base-100 px-4 rounded-lg py-1.5 mt-3" to={'/'}>Back Home</Link>
      </div>
    </div>
  );
};

export default Forbidden;
