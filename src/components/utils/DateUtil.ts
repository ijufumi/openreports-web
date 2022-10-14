import moment from "moment";

const DateUtil = {
  format: (timestamp: number, format = "YYYY/MM/DD HH:mm:ss"): string => {
    return moment().format(format);
  },
};

export default DateUtil;
