import moment from "moment";
export default (date) => {
  if (moment().isSame(moment(date), "d")) {
    return moment(date).fromNow();
  }
  return moment(date).format("DD.MM.YYYY HH:mm");
};
