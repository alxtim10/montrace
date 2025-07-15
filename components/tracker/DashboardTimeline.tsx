"use client";

import DashboardTimelineCard from "./DashboardTimelineCard";
import { useTrackerDataStore } from "@/stores/useTrackerDataStore";

const DashboardTimeline = () => {
  const expenseData = useTrackerDataStore((state: any) => state.expenseData);
  const savingsData = useTrackerDataStore((state: any) => state.savingsData);

  return (
    <div className="pt-10 px-5 pb-5">
      <h1 className="text-center text-5xl">Timeline</h1>
      <div className="flex flex-col md:flex-row justify-center items-start mt-10 gap-5">
        <div className="rounded-2xl border shadow-lg bg-[#1234c4] text-white w-full xl:w-[50rem]">
          <h1 className="text-center mt-4 text-2xl">Expenses</h1>
          <div className="flex flex-col justify-center items-center gap-5 p-4">
            {expenseData
              .slice(-20)
              .reverse()
              .map((data: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="bg-[#f6f6f6] p-2 md:p-5 rounded-lg w-full xl:w-[40rem] text-black"
                  >
                    <DashboardTimelineCard data={data} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="rounded-2xl shadow-lg border-[#e5e5e5] border bg-[#f6f6f6] w-full xl:w-[50rem]">
          <h1 className="text-center mt-4 text-2xl">Savings</h1>
          <div className="flex flex-col justify-center items-center gap-5 p-4">
            {savingsData
              .slice(-20)
              .reverse()
              .map((data: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="bg-[#1234c4] p-2 md:p-5 rounded-lg w-full shadow-2xl xl:w-[40rem] text-[#e0e0e0]"
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
