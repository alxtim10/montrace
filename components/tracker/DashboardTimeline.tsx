import { mainTimelineData } from "@/data/timelineData";
import DashboardTimelineCard from "./DashboardTimelineCard";

const DashboardTimeline = () => {
  return (
    <div className="pt-20 px-5 pb-5">
      <h1 className="text-center text-5xl">Timeline</h1>

      <div className="flex justify-center items-start mt-20 gap-5">
        <div className="bg-[#1234c4] text-white w-full xl:w-[50rem]">
          <h1 className="text-center mt-10 text-2xl">Expenses</h1>
          <div className="flex flex-col justify-center items-center py-10 gap-5 p-3">
            {mainTimelineData.map((data, i) => {
              return (
                <div
                  key={i}
                  className="bg-[#e0e0e0] p-5 rounded-lg w-52  md:w-full xl:w-[40rem] text-black"
                >
                  <DashboardTimelineCard data={data} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#e0e0e0] w-full xl:w-[50rem]">
          <h1 className="text-center mt-10 text-2xl">Savings</h1>
          <div className="flex flex-col justify-center items-center py-10 gap-5 p-3">
            {mainTimelineData.map((data, i) => {
              return (
                <div
                  key={i}
                  className="bg-[#1234c4] p-5 rounded-lg w-52 shadow-2xl md:w-full xl:w-[40rem] text-[#e0e0e0]"
                >
                  <DashboardTimelineCard data={data} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTimeline;
