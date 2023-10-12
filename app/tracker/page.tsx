'use client'
import HomeTimeline from "@/components/tracker/HomeTimeline";
import TrackerHome from "@/components/tracker/TrackerHome";

export default function Home() {

  return (
    <>
      <section className="2xl:flex justify-between">
        <div className=" 2xl:fixed xl:top-[18%] xl:left-[10%]">
          <TrackerHome />
        </div>
        <div></div>
        <div className="xl:min-w-[45rem]">
          <HomeTimeline />
        </div>
      </section>
    </>
  );
}
