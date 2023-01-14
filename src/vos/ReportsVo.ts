import ReportVo, { Props as ReportProps } from "./ReportVo";
import { ListProps, ListVo } from "./base";

interface Props extends ListProps {
  items: Array<ReportProps>;
}

export default class ReportsVo extends ListVo {
  readonly items: Array<ReportVo> = [];

  constructor(props: Props) {
    super(props);
    this.items = this.getItems(props);
  }

  getItems(props: Props): Array<ReportVo> {
    if (props.items) {
      return props.items.map((item) => new ReportVo(item));
    }
    return [];
  }
}
