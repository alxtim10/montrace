"use client";

import HomeTimeline from "@/components/tracker/HomeTimeline";
import TrackerHome from "@/components/tracker/TrackerHome";
import { Toaster } from "@/components/ui/toaster";
import { useFetchToken } from "@/features/dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { currentAccessToken, setToken } from "@/stores/tokenState";
import { axiosJWT } from "@/lib/axios";
import { useAppSelector } from "@/stores/hooks";

export default function Home() {
  const dispatch = useDispatch();
  const stateToken = useAppSelector(currentAccessToken);
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

      getTrackers(data.accessToken);
    },
    onError: () => {
      push("/");
    },
  });

  const getTrackers = async (firstToken: any) => {
    const response = await axiosJWT.get("http://localhost:2000/tracker", {
      headers: {
        Authorization: `Bearer ${firstToken}`,
      },
    });
    console.log(response.data);
    setTimeLineData(response.data);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <section className="2xl:flex justify-between">
        <div className=" 2xl:fixed xl:top-[18%] xl:left-[10%]">
          <TrackerHome />
        </div>
        <div></div>
        <div>
          <HomeTimeline timelineData={timelineData}/>
        </div>
      </section>

      <Toaster />
    </>
  );
}
