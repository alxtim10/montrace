'use client'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Plus } from "lucide-react"
import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import "./TrackerDrawer.css";
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
import { expenseCategory, savingsCategory } from "@/data/categoryData";
import { useToast } from "../ui/use-toast";
import { TrackerType } from "@/interface/tracker";
import { categories, type } from "@/data/constants";

const TrackerDrawer = ({ onSuccess }: { onSuccess: () => void }) => {


    const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
    const [category, setCategory] = useState<String>("Category");
    const [selectedTypeId, setSelectedTypeId] = useState<number>();
    const [currenttype, setType] = useState<String>("Type");
    const { toast } = useToast();
    const [listCategory, setListCategory] = useState<any>(expenseCategory);
    const [trackerDate, setDate] = React.useState<any>(new Date());

    let refreshToken = localStorage.getItem("dompetToken");

    const handleType = (typeId: number) => {
        setSelectedTypeId(typeId)
        let selectedType = type.find(item => item.id == typeId);
        if (selectedType) {
            setType(selectedType.name);
            formik.setFieldValue("type", selectedType.id);
        }
        let newList = categories.filter(item => item.typeId == typeId)
        setListCategory(newList);
        setCategory("Category");
    };

    const handleCategory = (categoryId: number) => {
        setSelectedCategoryId(categoryId)
        let selectedCategory = categories.find(item => item.id == categoryId);
        if (selectedCategory) {
            setCategory(selectedCategory.name);
            formik.setFieldValue("category", selectedCategory.id);
        }
    };

    const formik = useFormik({
        initialValues: {
            date: new Date(),
            name: "",
            nominal: 0,
            type: 1,
            category: 1,
        },
        onSubmit: async () => {
            const { date, name, nominal, type, category } = formik.values;
            const reqBody: TrackerType = {
                date,
                name,
                nominal,
                type: selectedTypeId ?? 1,
                category: selectedCategoryId ?? 1,
                refreshToken: refreshToken ?? "",
            };
            submitHandler(reqBody);

            formik.setFieldValue("date", new Date());
            formik.setFieldValue("name", "");
            formik.setFieldValue("nominal", 0);
            formik.setFieldValue("type", "");
            formik.setFieldValue("category", "");
            setCategory("Category");
            setType("Type");
        },
    });

    const submitHandler = async (body: TrackerType) => {
        const trackerResponse = await fetch("/api/protected/tracker", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify(body),
        });
        const res = await trackerResponse.json();

        toast({
            title: "Success",
            description: res.message,
        });
        onSuccess();
    };

    const handleFormInput = (event: any) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    const handleDate = (event: any) => {
        formik.setFieldValue("date", event);
        setDate(event);
    };

    return (
        <Drawer>
            <DrawerTrigger className="fixed bottom-7 bg-base text-white rounded-full p-3 left-1/2 transform -translate-x-1/2">
                <Plus />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add your transaction</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <section className="px-5 pb-14 md:p-20 flex justify-center items-center w-full">
                    <div
                        className="bg-[#e8e8e8] shadow-lg border w-full md:w-[45rem] p-5 rounded-xl"
                    >
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex justify-center items-center md:ml-24">
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
                                            {trackerDate ? (
                                                format(trackerDate, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
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
                            <div className="flex flex-col gap-5 justify-center items-center">
                                <div className="input-container w-full">
                                    <input
                                        name="name"
                                        placeholder="Title"
                                        className="input-field w-full md:w-[40rem]"
                                        type="text"
                                        onChange={handleFormInput}
                                        value={formik.values.name}
                                    />
                                    <label className="input-label">Title</label>
                                    <span className="input-highlight"></span>
                                </div>
                                <div className="input-container w-full">
                                    <input
                                        name="nominal"
                                        placeholder="Nominal"
                                        className="input-field w-full md:w-[40rem]"
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
                                            <DropdownMenuTrigger>{currenttype}</DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuSeparator />
                                                {type.map((data: { id: number, name: string }, i: number) => {
                                                    return (
                                                        <div key={i} onClick={() => handleType(data.id)}>
                                                            <DropdownMenuItem>{data.name}</DropdownMenuItem>
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
                                                        <div key={i} onClick={() => handleCategory(data.id)}>
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
                                <DrawerTrigger
                                    type="submit"
                                    className="px-4 py-2 border border-black rounded-md shadow-lg hover:border-[#1234c4] hover:bg-[#1234c4] hover:text-white transition-all"
                                >
                                    Submit
                                </DrawerTrigger>
                            </div>
                        </form>
                    </div>
                </section>
            </DrawerContent>
        </Drawer>
    )
}

export default TrackerDrawer