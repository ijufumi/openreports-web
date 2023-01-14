import Report, { Props as ReportProps } from "./Report";
import { ListProps, ListVo } from "./base";

interface Props extends ListProps {
  items: Array<ReportProps>;
}

export default class Reports extends ListVo {
  readonly items: Array<Report> = [];

  constructor(props: Props) {
    super(props);
    this.items = this.getItems(props);
  }

  getItems(props: Props): Array<Report> {
    if (props.items) {
      return props.items.map((item) => new Report(item));
    }
    return [];
  }
}
