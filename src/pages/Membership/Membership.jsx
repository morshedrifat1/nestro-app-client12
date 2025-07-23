import React from "react";
import MambershipPrice from "./MambershipPrice";
const Membership = () => {
  return (
    <div className="relative py-10 h-auto sm:py-0 sm:h-[calc(100vh-68px)] w-full bg-boxbg flex items-center justify-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#9494942e_1px,transparent_1px),linear-gradient(to_bottom,#9494942e_1px,transparent_1px)] bg-[size:25px_26px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_0%,transparent_140%)]"></div>
      <div className="px-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-base-300">
            Plans and Pricing
          </h1>
          <p className="text-base font-normal text-base-content mt-2">
            Get unlimited credits & save with yearly plan.
          </p>
        </div>
        <div className="max-w-86">
          <MambershipPrice></MambershipPrice>
        </div>
      </div>
    </div>
  );
};

export default Membership;
