import React from "react";
import HeroSection from "./hero/HeroSection";
import Posts from "./posts/Posts";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <div className="max-w-[1420px] mx-auto px-5">
        <Posts></Posts>
      </div>
    </div>
  );
};

export default Home;
