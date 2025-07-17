'use client'
import HomeTimelineCard from "./HomeTimelineCard";
import { TrackerResponse } from "@/interface/tracker";

interface HomeTimelineProps {
  trackers: TrackerResponse[]
}

const HomeTimeline = ({ trackers }: HomeTimelineProps) => {

  return (
    <section className="p-5 w-full">
      <h1 className="text-center">recent transactions</h1>
      <div className="mt-3 flex flex-col gap-2 justify-center items-center">
        {trackers
          ? trackers
            .map((data: TrackerResponse, i: any) => {
              return (
                <div
                  key={i}
                  className="bg-white px-5 py-3 rounded-lg w-full shadow-lg border border-gray-100 md:w-[35rem] text-black"
                >
                  <HomeTimelineCard data={data} />
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
};

export default HomeTimeline;
