"use client"

import { useFetchTracker } from "@/features/tracker";
import DashboardTimelineCard from "./DashboardTimelineCard";
import { useAppSelector } from "@/stores/hooks";
import { currentExpenseData, currentSavingsData, setTrackerData } from "@/stores/trackerState";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const DashboardTimeline = () => {

  const dispatch = useDispatch();


  const expenseData = useAppSelector(currentExpenseData);
  const savingsData = useAppSelector(currentSavingsData);

  const { data, refetch: fetchTracker } = useFetchTracker({
    onSuccess: (datas: any) => {
      const expenseData = datas.filter((data: any) => {
        return data.type === "Expense";
      });
      const savingsData = datas.filter((data: any) => {
        return data.type === "Savings";
      });

      dispatch(
        setTrackerData({
          mainTimelineData: datas,
          expenseData: expenseData,
          savingsData: savingsData,
        })
      );
    },
    onError: () => {},
  });

  useEffect(() => {
    fetchTracker();
  }, [])

  return (
    <div className="pt-20 px-5 pb-5">
      
      <h1 className="text-center text-5xl">Timeline</h1>
      <div className="flex justify-center items-start mt-20 gap-5">
        <div className="bg-[#1234c4] text-white w-full xl:w-[50rem]">
          <h1 className="text-center mt-10 text-2xl">Expenses</h1>
          <div className="flex flex-col justify-center items-center py-10 gap-5 p-3">
            {expenseData.slice(-20).reverse().map((data, i) => {
              return (
                <div
                  key={i}
                  className="bg-[#e0e0e0] p-2 md:p-5 rounded-lg w-full xl:w-[40rem] text-black"
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
            {savingsData.slice(-20).reverse().map((data, i) => {
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
