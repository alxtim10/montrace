"use client"

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { DatePicker } from "../picker/DatePicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import "./TrackerHome.css";
import { expenseCategory, savingsCategory } from "@/data/categoryData";
import { currentTracker, switcher } from "@/stores/trackerSwitch";
import { typeData } from "@/data/typeData";

const TrackerHome = () => {
  const dispatch = useAppDispatch();
  const trackerType = useAppSelector(currentTracker);
  const [category, setCategory] = useState("Category");
  const [type, setType] = useState<String>("Type");
  const [listCategory, setListCategory] = useState<any>([]);
  const [listType] = useState<any>(typeData);

  useEffect(() => {
    if (trackerType === "Expense") {
      setListCategory(expenseCategory);
    } else {
      setListCategory(savingsCategory);
    }
  }, [trackerType]);

  const handleType = (type: String) => {
    dispatch(switcher(type));
    setType(type);
    setCategory("Category");
  }

  return (
    <section className="p-10 md:p-20 flex justify-center items-center w-full">
      <div
        className="bg-[#e8e8e8] w-full md:w-[45rem] p-5 rounded-xl"
        style={{
          boxShadow: "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
        }}
      >
        <h1 className="text-2xl tracking-wider text-center">
          shoot your {trackerType.toLowerCase()}
        </h1>
        <div className="flex justify-center items-center mt-10 md:ml-24">
          <DatePicker />
        </div>
        <div className="flex flex-col gap-5  justify-center items-center">
          <div className="input-container">
            <input
              placeholder="Title"
              className="input-field md:w-[40rem]"
              type="text"
            />
            <label className="input-label">Title</label>
            <span className="input-highlight"></span>
          </div>
          <div className="input-container">
            <input
              placeholder="Nominal"
              className="input-field md:w-[40rem]"
              type="text"
            />
            <label className="input-label">Nominal</label>
            <span className="input-highlight"></span>
          </div>
          <div className="flex justify-around items-center w-full">
            <div className="flex justify-center w-40">
              <DropdownMenu>
                <DropdownMenuTrigger>{type}</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  {listType.map((data: any, i: number) => {
                    return (
                      <div key={i} onClick={() => handleType(data)}>
                        <DropdownMenuItem>{data}</DropdownMenuItem>
                      </div>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex justify-center w-40">
              <DropdownMenu>
                <DropdownMenuTrigger>{category}</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  {listCategory.map((data: any, i: number) => {
                    return (
                      <div key={i} onClick={() => setCategory(data.name)}>
                        <DropdownMenuItem>{data.name}</DropdownMenuItem>
                      </div>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <button className="px-4 py-2 border border-black rounded-md shadow-lg hover:border-[#1234c4] hover:bg-[#1234c4] hover:text-white transition-all">
            Submit {trackerType}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrackerHome;
