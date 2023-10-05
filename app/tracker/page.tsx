"use client"

import Timeline from "@/components/tracker/Timeline";
import { NavigationMenuDemo } from "@/components/navigation/NavigationMenu";
import Tracker from "@/components/tracker/Tracker";

export default function Home() {

  return (
    <>
        <NavigationMenuDemo />
        <div className="2xl:flex justify-between">
          <div className=" 2xl:fixed xl:top-[18%] xl:left-[10%]">
            <Tracker />
          </div>
          <div></div>
          <div className="">
            <Timeline />
          </div>
        </div>
    </>
  );
}
