import React from "react";
import HomeTimelineCard from "./HomeTimelineCard";
import { mainTimelineData } from "@/data/timelineData";

const HomeTimeline = () => {
  return (
    <section className="p-20 min-h-screen">
      <h1 className="text-center">recent money thrown</h1>
      <div className="mt-10 flex flex-col gap-5 justify-center items-center">
        {mainTimelineData.slice(0, 5).map((data, i) => {
          return (
            <div key={i} className="bg-white p-5 rounded-lg w-full shadow-2xl md:w-[35rem] text-black">
              <HomeTimelineCard data={data}/>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeTimeline;
