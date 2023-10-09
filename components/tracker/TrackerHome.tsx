"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
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
import { useFormik } from "formik";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInsertTracker } from "@/features/tracker";

const TrackerHome = ({refetchTracker} : any) => {
  const dispatch = useAppDispatch();
  const trackerType = useAppSelector(currentTracker);
  const [category, setCategory] = useState<String>("Category");
  const [type, setType] = useState<String>("Type");

  const [listCategory, setListCategory] = useState<any>([]);
  const [listType] = useState<any>(typeData);
  const [trackerDate, setDate] = React.useState<any>(new Date);

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
    formik.setFieldValue("type", type);
  };

  const handleCategory = (category: String) => {
    setCategory(category);
    formik.setFieldValue("category", category);
  };

  const formik = useFormik({
    initialValues: {
      date: new Date,
      name: "",
      nominal: 0,
      type: "",
      category: "",
    },
    onSubmit: async () => {

      const {date, name, nominal, type, category} = formik.values;
      insertTracker({
        date,
        name,
        nominal,
        type,
        category
      })

      formik.setFieldValue("date", new Date);
      formik.setFieldValue("name", "");
      formik.setFieldValue("nominal", 0);
      formik.setFieldValue("type", "");
      formik.setFieldValue("category", "");
      
      setCategory("Category");
      setType("Type");

    },
  });

  const handleFormInput = (event: any) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const { mutate: insertTracker } = useInsertTracker({
    onSuccess: (data: any) => {
      refetchTracker();
    },
    onError: (data: any) => {
      console.log(data);
    },
  });

  const handleDate = (event: any) => {
    formik.setFieldValue("date", event);
    setDate(event);
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
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center items-center mt-10 md:ml-24">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !trackerDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {trackerDate ? format(trackerDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={trackerDate}
                  onSelect={handleDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-5  justify-center items-center">
            <div className="input-container">
              <input
                name="name"
                placeholder="Title"
                className="input-field md:w-[40rem]"
                type="text"
                onChange={handleFormInput}
                value={formik.values.name}
              />
              <label className="input-label">Title</label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <input
                name="nominal"
                placeholder="Nominal"
                className="input-field md:w-[40rem]"
                type="number"
                onChange={handleFormInput}
                value={formik.values.nominal}
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
                        <div key={i} onClick={() => handleCategory(data.name)}>
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
            <button
              type="submit"
              className="px-4 py-2 border border-black rounded-md shadow-lg hover:border-[#1234c4] hover:bg-[#1234c4] hover:text-white transition-all"
            >
              Submit {trackerType}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TrackerHome;
