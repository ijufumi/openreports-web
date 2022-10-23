import moment from "moment";

const DateUtil = {
  format: (timestampSec: number, format = "YYYY/MM/DD HH:mm:ss"): string => {
    return moment(timestampSec * 1000).format(format);
  },
};

export default DateUtil;
