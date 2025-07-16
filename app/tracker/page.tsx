'use client'
import CarouselBudget from "@/components/budget/CarouselBudget";
import HomeTimeline from "@/components/tracker/HomeTimeline";
import TrackerDrawer from "@/components/tracker/TrackerDrawer";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {

  let userToken = localStorage.getItem('dompetToken');

  return (
    <>
      {userToken && (
        <section className="pb-10 2xl:flex justify-between">
          <div className="p-5">
            <div className="bg-base rounded-2xl p-5 shadow-md">
              <div>
                <h1 className="text-white font-bold text-md">Balance</h1>
                <h1 className="text-white font-bold text-2xl"><span className="text-sm">Rp.</span> 320.500.000</h1>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div>
                  <h1 className="text-white text-sm">Expense</h1>
                  <h1 className="text-white text-md"><span className="text-sm">Rp.</span> 150.000</h1>
                </div>
                <div>
                  <h1 className="text-white text-sm">Savings</h1>
                  <h1 className="text-white text-md"><span className="text-sm">Rp.</span> 150.000</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 mb-5">
            <h1 className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-base" /> AI Suggestions</h1>
            <div className="border rounded-2xl mt-2 p-4">
              <p>You should save more money. You should save more money. You should save more money. You should save more money.</p>
            </div>
          </div>

          <div>
            <Link href={'/budget'} className="flex items-center gap-1 text-sm px-5">Budgeting <ArrowRight className="w-3 h-3 mt-[2px]" /></Link>
            <CarouselBudget />
          </div>
          <div className="xl:min-w-[45rem]">
            <HomeTimeline />
          </div>
          <TrackerDrawer />
        </section>
      )}
    </>

  );
}
