import React from "react";
import { Link } from "react-router";
import error from "../../assets/error.json";
import Lottie from "lottie-react";
import { ArrowLeft } from "lucide-react";
const ErrorPage = () => {
  return (
    <div className="bg-white">
      <div className="flex h-screen flex-col justify-center items-center">
        <div className="max-w-100 sm:max-w-150">
          <Lottie animationData={error} />
        </div>
        <Link
          className="bg-black text-white shadow-none py-2 rounded-lg justify-center mx-auto flex items-center gap-2 w-[150px]"
          to={"/"}
        >
          <ArrowLeft className="mt-1" size={20} />
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
