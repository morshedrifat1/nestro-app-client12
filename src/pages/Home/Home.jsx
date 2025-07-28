import React, { useState } from "react";
import HeroSection from "./hero/HeroSection";
import Posts from "./posts/Posts";

const Home = () => {
  const [search,setSearch] = useState('');
  return (
    <div>
      <HeroSection setSearch={setSearch}></HeroSection>
      <div className="max-w-[1420px] mx-auto px-5">
        <Posts search={search}></Posts>
      </div>
    </div>
  );
};

export default Home;
