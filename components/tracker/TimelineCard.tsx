import React, { FC } from "react";

const TimelineCard: React.FC<any> = (props) => {
  const { title, nominal, type, category } = props.data;
  let options = {
    dateStyle: 'short',
    timeStyle: 'short'
  }
  const date = props.data.date.toLocaleString('id-ID', options);

  return (
    <div className="bg-white p-5 rounded-lg w-full shadow-2xl md:w-[35rem]">
      <div className="flex justify-between items-center mt-2.5 gap-3">
        <h1 className="text-md md:text-xl font-bold">{title}</h1>
        <p className="text-sm md:text-lg">{date}</p>
      </div>
      <p className="mt-2 text-sm">
        Rp. <span className="text-lg md:text-xl font-semibold">{nominal}</span>
      </p>
      <div className="flex justify-between items-center mt-2.5">
        <p className="text-sm md:text-md">{type}</p>
        <p className="text-sm md:text-md">{category}</p>
      </div>
    </div>
  );
};

export default TimelineCard;
