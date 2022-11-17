import moment from "moment";

const DateUtils = {
  format: (timestampSec: number, format = "YYYY/MM/DD HH:mm:ss"): string => {
    return moment(timestampSec * 1000).format(format);
  },
  nowAsString: (format = "YYYY/MM/DD HH:mm:ss"): string => {
    return moment().format(format);
  },
};

export default DateUtils;
