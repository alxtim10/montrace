"use client";

import HomeTimeline from "@/components/tracker/HomeTimeline";
import TrackerHome from "@/components/tracker/TrackerHome";
import { useFetchToken } from "@/features/dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { currentUserId, setToken } from "@/stores/tokenState";
import { useFetchTracker } from "@/features/tracker";
import { useAppSelector } from "@/stores/hooks";
import { currentExpenseData, setTrackerData } from "@/stores/trackerState";

export default function Home() {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [timelineData, setTimeLineData] = useState<any>([]);
  const userId = useAppSelector(currentUserId);

  const { mutate: refreshToken } = useFetchToken({
    onSuccess: (data: any) => {
      const decoded: any = jwt_decode(data.accessToken);
      dispatch(
        setToken({
          exp: decoded.exp,
          userId: decoded.userId,
          token: data.accessToken,
        })
      );
    },
    onError: () => {
      push("/");
    },
  });

  const { data, refetch: fetchTracker } = useFetchTracker({
    onSuccess: (datas: any) => {
      setTimeLineData(datas);
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

  const refetchTracker = () => {
    fetchTracker();
  };

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    fetchTracker();
  }, [userId]);

  return (
    <>
      <section className="2xl:flex justify-between">
        <div className=" 2xl:fixed xl:top-[18%] xl:left-[10%]">
          <TrackerHome refetchTracker={refetchTracker} />
        </div>
        <div></div>
        <div className="xl:min-w-[45rem]">
          <HomeTimeline timelineData={timelineData} />
        </div>
      </section>
    </>
  );
}
