import ReportTemplateVo, {
  Props as ReportTemplateProps,
} from "./ReportTemplateVo";
import { ListProps, ListVo } from "./base";

interface Props extends ListProps {
  items: Array<ReportTemplateProps>;
}

export default class ReportTemplatesVo extends ListVo {
  items: Array<ReportTemplateVo> = [];

  constructor(props: Props) {
    super(props);
    this.setItems(props);
  }

  setItems(props: Props): void {
    if (props.items) {
      this.items = props.items.map((item) => new ReportTemplateVo(item));
    } else {
      this.items = [];
    }
  }
}
