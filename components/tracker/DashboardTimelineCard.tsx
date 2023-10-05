import { toRupiah } from "@/utils/format";

const DashboardTimelineCard: React.FC<any> = (props) => {
  const { title, type, category } = props.data;
  let options = {
    dateStyle: 'short',
    timeStyle: 'short'
  }
  const date = props.data.date.toLocaleString('id-ID', options);
  const nominal = toRupiah(props.data.nominal);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-3">
        <h1 className="text-md md:text-xl font-bold">{title}</h1>
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

export default DashboardTimelineCard;
