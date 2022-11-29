import dayjs from "dayjs";

const DateUtils = {
  format: (timestampSec: number, format = "YYYY/MM/DD HH:mm:ss"): string => {
    return dayjs.unix(timestampSec).format(format);
  },
  nowAsString: (format = "YYYY/MM/DD HH:mm:ss"): string => {
    return dayjs().format(format);
  },
};

export default DateUtils;
