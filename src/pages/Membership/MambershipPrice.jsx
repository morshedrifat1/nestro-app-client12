import React from 'react';
import { BadgeCheck, Crown } from "lucide-react";
import { useNavigate } from 'react-router';

const MambershipPrice = () => {
  const navigate = useNavigate();
  const handlePay = () =>{
    navigate('/payment')
  }
    return (
        <div className="mt-5 max-w-86">
          <div className="bg-boxbg backdrop-blur-md backdrop-saturate-150 border-3 border-[#7877c6] rounded-2xl p-5">
            <span className="flex items-center gap-1 bg-base-300 w-fit px-3 text-sm font-semibold py-0.5 rounded-full text-base-100 border border-mainborder mt-1">
              <Crown size={16}></Crown>
              Gold
            </span>
            <h1 className="text-lg font-medium text-base-300 mt-1">
              Premium Benefits
            </h1>
            <h1 className="text-base-300 text-3xl font-bold mt-4">
              $90
              <span className="text-sm text-base-content font-normal ml-1">
                / Lifetime
              </span>
            </h1>
            <h1 className="text-lg text-base-300 mt-4">
              Unlock These Features
            </h1>
            <ul className="space-y-2.5 mt-3">
              <li className="flex items-center gap-2 text-base-300/80 text-base">
                <BadgeCheck size={17} /> Unlimited premium access
              </li>
              <li className="flex items-center gap-2 text-base-300/80 text-base">
                <BadgeCheck size={17} /> Ad-free browsing
              </li>
              <li className="flex items-center gap-2 text-base-300/80 text-base">
                <BadgeCheck size={17} /> Priority customer support
              </li>
              <li className="flex items-center gap-2 text-base-300/80 text-base">
                <BadgeCheck size={17} /> Exclusive profile badges
              </li>
              <li className="flex items-center gap-2 text-base-300/80 text-base">
                <BadgeCheck size={17} /> Early feature access
              </li>
              <li className="flex items-center gap-2 text-base-300/80 text-base">
                <BadgeCheck size={17} /> Higher post and upload limits
              </li>
            </ul>
            <button onClick={handlePay} className="bg-base-300 text-base-100 w-full mt-4 py-2 rounded-xl cursor-pointer">Get started</button>
          </div>
        </div>
    );
};

export default MambershipPrice;