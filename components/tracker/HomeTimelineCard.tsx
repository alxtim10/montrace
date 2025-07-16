import { toRupiah, toDate } from "@/utils/format";
import React, { FC } from "react";
import moment from 'moment'
import { TrackerResponse } from "@/interface/tracker";

interface HomeTimelineCardProps {
  data: TrackerResponse
}

const HomeTimelineCard = ({ data }: HomeTimelineCardProps) => {
  const { name, type_name, category_name } = data;
  const date = toDate(data.date);
  const nominal = toRupiah(data.nominal);

  return (
    <div>
      <div className="flex justify-between items-center gap-3">
        <h1 className="text-md md:text-xl font-bold">{name}</h1>
        <p className="text-sm md:text-lg">{date}</p>
      </div>
      <p className="mt-2 text-sm">
        Rp. <span className="text-lg md:text-xl font-semibold">{nominal}</span>
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm md:text-md">{type_name}</p>
        <p className="text-sm md:text-lg">{category_name}</p>
      </div>
    </div>
  );
};

export default HomeTimelineCard;
