import moment from "moment";

export const toRupiah = (price: number) => {
  return price.toLocaleString("id-ID");
};

export const toDate = (date: Date) => {
  return moment(date).format('DD MMMM YYYY');
}
