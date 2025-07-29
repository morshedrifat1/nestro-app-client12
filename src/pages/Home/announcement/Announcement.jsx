import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, ShieldCheck } from "lucide-react";

const Announcement = () => {
  const axios = useAxios();
  const { data: announcement = [] } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const res = await axios.get("/announcements");
      return res.data;
    },
  });
  return (
    <>
      {announcement.length > 0 && (
        <div className="bg-boxbg border border-mainborder rounded-lg p-4 pb-5 h-screen overflow-y-auto">
          <h1 className="text-base-300 text-xl font-bold">Announcements 📢</h1>

          <div>
            {announcement.map((anno,index) => (
              <div key={index} className="mt-3 bg-base-100 rounded-lg border-mainborder p-3">
                <h1 className="text-base-300 text-lg font-semibold">
                  {anno?.annTitle}
                </h1>
                <p className="text-sm text-base-content mt-2">
                  {anno?.annDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;
