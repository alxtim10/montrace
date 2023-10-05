import React from "react";
import TimelineCard from "./TimelineCard";
import { mainTimelineData } from "@/data/timelineData";

const Timeline = () => {
  return (
    <section className="p-20 min-h-screen">
      <h1 className="text-center">money thrown</h1>
      <div className="mt-10 flex flex-col gap-5 justify-center items-center">
        {mainTimelineData.slice(0, 5).map((data, i) => {
          return (
            <div key={i}>
              <TimelineCard data={data}/>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
