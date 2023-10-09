import { toRupiah, toDate } from "@/utils/format";

const DashboardTimelineCard: React.FC<any> = (props) => {
  const { name, type, category } = props.data;
  const date = toDate(props.data.date);
  const nominal = toRupiah(props.data.nominal);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-3">
        <h1 className="text-sm md:text-xl font-bold">{name}</h1>
        <p className="text-sm md:text-lg">{date}</p>
      </div>
      <p className="mt-2 text-sm">
        Rp. <span className="text-md md:text-xl font-semibold">{nominal}</span>
      </p>
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-start mt-3 md:gap-3">
        <p className="text-sm md:text-lg font-bold">{type}</p>
        <p className="text-sm md:text-lg">{category}</p>
      </div>
    </div>
  );
};

export default DashboardTimelineCard;
