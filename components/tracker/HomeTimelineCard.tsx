import { toRupiah } from "@/utils/format";
import React, { FC } from "react";

const HomeTimelineCard: React.FC<any> = (props) => {
  const { name, type, category } = props.data;
  let options = {
    dateStyle: 'short',
    timeStyle: 'short'
  }
  const date = props.data.date.toLocaleString('id-ID', options);
  const nominal = toRupiah(props.data.nominal);

  return (
    <div className="">
      <div className="flex justify-between items-center gap-3">
        <h1 className="text-md md:text-xl font-bold">{name}</h1>
        <p className="text-sm md:text-lg">{date}</p>
      </div>
      <p className="mt-2 text-sm">
        Rp. <span className="text-lg md:text-xl font-semibold">{nominal}</span>
      </p>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm md:text-md">{type}</p>
        <p className="text-sm md:text-lg">{category}</p>
      </div>
    </div>
  );
};

export default HomeTimelineCard;
