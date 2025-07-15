'use client'
import HomeTimeline from "@/components/tracker/HomeTimeline";
import TrackerDrawer from "@/components/tracker/TrackerDrawer";

export default function Home() {

  return (
    <>
      <section className="2xl:flex justify-between">
        <div className="p-5">
          <div className="bg-base rounded-2xl py-5 px-5 shadow-md">
            <div>
              <h1 className="text-white font-bold text-md">Balance</h1>
              <h1 className="text-white font-bold text-2xl">Rp. 320.500.000</h1>
            </div>
            <div>

            </div>
            <div className="flex items-center justify-between mt-5">
              <div>
                <h1 className="text-white text-sm">Expense</h1>
                <h1 className="text-white text-md">Rp. 150.000</h1>
              </div>
              <div>
                <h1 className="text-white text-sm">Savings</h1>
                <h1 className="text-white text-md">Rp. 150.000</h1>
              </div>
            </div>
          </div>
        </div>

        <div></div>
        <div className="xl:min-w-[45rem]">
          <HomeTimeline />
        </div>
        <TrackerDrawer />
      </section>
    </>
  );
}
