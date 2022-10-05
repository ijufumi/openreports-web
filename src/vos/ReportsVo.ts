import ReportVo, { Props as ReportProps } from "./ReportVo";

interface Props {
  items: Array<ReportProps>;

  offset: number;

  limit: number;

  count: number;
}

export default class ReportsVo {
  items: Array<ReportVo>;

  offset: number;

  limit: number;

  count: number;

  constructor(props: Props) {
    this.offset = props.offset;
    this.limit = props.limit;
    this.count = props.count;
    if (props.items) {
      this.items = props.items.map((item) => new ReportVo(item));
    } else {
      this.items = [];
    }
  }
}
