"use client";
import CarouselBudget from "@/components/budget/CarouselBudget";
import HomeTimeline from "@/components/tracker/HomeTimeline";
import TrackerDrawer from "@/components/tracker/TrackerDrawer";
import { BudgetType } from "@/interface/budget";
import { UserDetail } from "@/interface/user";
import { formatToRupiah } from "@/lib/utils";
import { AlignLeft, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<UserDetail>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [budgetData, setBudgetData] = useState<BudgetType[]>([]);

  const GetUser = useCallback(async () => {
    const fetchData = await fetch("/api/protected/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const res = await fetchData.json();
    setUserData(res.data);
  }, [refreshToken]);

  const GetBudget = useCallback(async () => {
    const fetchData = await fetch("/api/protected/budget", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const res = await fetchData.json();
    setBudgetData(res.data);
  }, [refreshToken]);

  const GetItems = useCallback(async () => {
    GetUser();
    GetBudget();
  }, [GetUser, GetBudget]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let userToken = localStorage.getItem("dompetToken");
      if (userToken) {
        setRefreshToken(userToken);
      }
    }
  }, []);

  useEffect(() => {
    if (refreshToken) {
      GetItems();
    }
  }, [refreshToken, GetItems]);

  return (
    <>
      {userData && (
        <section className="pb-10 2xl:flex justify-between">
          <div className="p-5">
            <div className="bg-gradient-to-br from-base to-[#170b71] rounded-2xl p-4 shadow-md">
              <div>
                <h1 className="text-white font-bold text-md">Balance</h1>
                <h1 className="text-white font-bold text-2xl">
                  {formatToRupiah(userData.user.balance)}
                </h1>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div>
                  <h1 className="text-gray-300 text-xs">Expense</h1>
                  <h1 className="text-white text-md">
                    {formatToRupiah(userData.user.expense)}
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 text-xs">Income</h1>
                  <h1 className="text-white text-md">
                    {formatToRupiah(userData.user.saving)}
                  </h1>
                </div>
              </div>

            </div>
            <div className="mt-1 p-4 pt-2 w-full bg-gradient-to-br from-base to-[#170b71] rounded-2xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-[#5e6c97]">
              <h1 className="text-white text-md font-bold">Saving Goal</h1>

              <div className="mt-2 flex items-center justify-between">
                <h1 className="text-sm text-white">{formatToRupiah(Number(5000000))}</h1>
                <h1 className="text-sm text-white">{formatToRupiah(Number(500000000))}</h1>
              </div>

              <div className="w-full bg-gray-400 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Number(1000) > 0
                      ? Math.min((Number(1000) / Number(5000)) * 100, 100)
                      : 0
                      }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="px-5 mb-5">
            <h1 className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-base" /> AI Suggestions
            </h1>
            <div className="border rounded-2xl mt-2 p-4">
              <p>
                You should save more money. You should save more money. You
                should save more money. You should save more money.
              </p>
            </div>
          </div>

          <div>
            <Link
              href={"/budget"}
              className="flex items-center gap-1 text-sm px-5"
            >
              Budgeting{" "}
              {budgetData.length > 0 && (
                <ArrowRight className="w-3 h-3 mt-[2px]" />
              )}
            </Link>
            {budgetData.length ? (
              <CarouselBudget data={budgetData} />
            ) : (
              <div className="px-5">
                <Link
                  href={"/budget"}
                  className="w-full flex items-center justify-between border rounded-2xl mt-2 p-4"
                >
                  <div>
                    <h1 className="text-left">Create budget plan</h1>
                    <h1 className="text-sm text-gray-500">
                      Control ahead your expenses
                    </h1>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
          <div className="xl:min-w-[45rem]">
            <HomeTimeline trackers={userData.tracker} />
          </div>
          <TrackerDrawer onSuccess={GetItems} />
        </section>
      )}
    </>
  );
}
