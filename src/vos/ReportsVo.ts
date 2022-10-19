import ReportVo, { Props as ReportProps } from "./ReportVo";
import { ListProps, ListVo } from "./base";

interface Props extends ListProps {
  items: Array<ReportProps>;
}

export default class ReportsVo extends ListVo {
  items: Array<ReportVo> = [];

  constructor(props: Props) {
    super(props);
  }

  getItems(props: ListProps): Array<ReportVo> {
    if (props.items) {
      return props.items.map((item) => new ReportVo(item));
    }
    return [];
  }
}
