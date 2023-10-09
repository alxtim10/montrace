"use client";

import HomeTimeline from "@/components/tracker/HomeTimeline";
import TrackerHome from "@/components/tracker/TrackerHome";
import { useFetchToken } from "@/features/dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setToken } from "@/stores/tokenState";
import { useFetchTracker } from "@/features/tracker";

export default function Home() {
  
  const {
    data,
    refetch: fetchTracker,
  } = useFetchTracker({
    onSuccess: (data: any) => {
      setTimeLineData(data);
    },
    onError: () => {

    },
  });

  const dispatch = useDispatch();
  const { push } = useRouter();
  const [timelineData, setTimeLineData] = useState([]);

  const { mutate: refreshToken } = useFetchToken({
    onSuccess: (data: any) => {
      const decoded: any = jwt_decode(data.accessToken);
      dispatch(
        setToken({
          exp: decoded.exp,
          name: decoded.name,
          token: data.accessToken,
        })
      );
    },
    onError: () => {
      push("/");
    },
  });


  const refetchTracker = () => {
    fetchTracker();
  }

  useEffect(() => {
    refreshToken();
    fetchTracker();
  }, []);


  return (
    <>
      <section className="2xl:flex justify-between">
        <div className=" 2xl:fixed xl:top-[18%] xl:left-[10%]">
          <TrackerHome refetchTracker={refetchTracker}/>
        </div>
        <div></div>
        <div>
          <HomeTimeline timelineData={timelineData}/>
        </div>
      </section>

    </>
  );
}
