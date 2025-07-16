'use client'
import React, { useEffect, useState } from "react";
import HomeTimelineCard from "./HomeTimelineCard";
import { useTrackerDataStore } from "@/stores/useTrackerDataStore";

const HomeTimeline = () => {
  // const [timelineData, setTimeLineData] = useState<any>([]);
  let userToken = localStorage.getItem('dompetToken');
  const trackerData = useTrackerDataStore(
    (state: any) => state.mainTrackerData
  );
  const setTrackerData = useTrackerDataStore(
    (state: any) => state.setMainTrackerData
  );
  const setExpenseData = useTrackerDataStore(
    (state: any) => state.setExpenseData
  );
  const setSavingsData = useTrackerDataStore(
    (state: any) => state.setSavingsData
  );

  useEffect(() => {
    const fetchTimeline = async () => {
      const fetchData = await fetch("/api/tracker?token=" + userToken);
      const res = await fetchData.json();
      setTrackerData(res.data);

      const expenses = res.data.filter((data: any) => {
        return data.type === "Expense";
      });

      const savings = res.data.filter((data: any) => {
        return data.type === "Savings";
      });

      setExpenseData(expenses);
      setSavingsData(savings);
    };
    fetchTimeline();
  }, []);

  return (
    <section className="p-5 w-full">
      <h1 className="text-center">recent transactions</h1>
      <div className="mt-3 flex flex-col gap-2 justify-center items-center">
        {trackerData
          ? trackerData
            .slice(-8)
            .reverse()
            .map((data: any, i: any) => {
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-lg w-full shadow-lg border border-gray-100 md:w-[35rem] text-black"
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
