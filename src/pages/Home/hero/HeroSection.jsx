import { Search } from "lucide-react";
import React from "react";
const HeroSection = ({ setSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.tag.value;
    setSearch(searchText);
    const section = document.getElementById("post-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-[700px] sm:h-[calc(100vh-68px)] w-full bg-boxbg flex items-center justify-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#9494942e_1px,transparent_1px),linear-gradient(to_bottom,#9494942e_1px,transparent_1px)] bg-[size:25px_26px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_0%,transparent_140%)]"></div>
      {/* hero main content */}
      <div className="z-10 space-y-5 flex flex-col items-center px-5">
        <p className="bg-boxbg/50 backdrop-blur-md backdrop-saturate-150 border border-mainborder w-fit mx-auto px-3 py-1 rounded-full shadow-md shadow-subHeading/50">
          Open Discussion Hub 🪐
        </p>
        <h1 className="text-center text-3xl leading-10 sm:text-5xl sm:leading-14 md:text-6xl md:leading-18 font-extrabold max-w-210 bg-gradient-to-b from-base-300 to-base-100  text-transparent bg-clip-text">
          Join the Conversation. Share Ideas. Connect Freely 🚀
        </h1>
        <form onSubmit={handleSearch}>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <div className="relative mt-1.5 mx-auto">
              <input
                type="text"
                name="tag"
                placeholder="Search posts by tag..."
                className="pl-10 border-2 border-mainborder sm:w-100 bg-base-100 p-3 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
              />
              <Search
                size={18}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
              />
            </div>

            <button
              className="bg-base-300 mx-auto px-5 py-2.5 mt-1.5 text-base-100 rounded-lg cursor-pointer"
              type="submit"
              value=""
            >
              {" "}
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
