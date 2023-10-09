import React from "react";
import HomeTimelineCard from "./HomeTimelineCard";

const HomeTimeline = ({timelineData}: any) => {
  return (
    <section className="p-20 min-h-screen  w-50rem">
      <h1 className="text-center">recent money thrown</h1>
      <div className="mt-10 flex flex-col gap-5 justify-center items-center">
        {timelineData.slice(-8).reverse().map((data:any, i:any) => {
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
