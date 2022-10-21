import ReportVo, { Props as ReportProps } from "./ReportVo";
import { ListProps, ListVo } from "./base";

interface Props extends ListProps {
  items: Array<ReportProps>;
}

export default class ReportsVo extends ListVo {
  items: Array<ReportVo> = [];

  constructor(props: Props) {
    super(props);
    this.setItems(props);
  }

  setItems(props: Props): void {
    if (props.items) {
      this.items = props.items.map((item) => new ReportVo(item));
    } else {
      this.items = [];
    }
  }
}
