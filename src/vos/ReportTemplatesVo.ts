import ReportTemplateVo, {
  Props as ReportTemplateProps,
} from "./ReportTemplateVo";
import { ListProps, ListVo } from "./base";

interface Props extends ListProps {
  items: Array<ReportTemplateProps>;
}

export default class ReportTemplatesVo extends ListVo {
  readonly items: Array<ReportTemplateVo> = [];

  constructor(props: Props) {
    super(props);
    this.items = this.getItems(props);
  }

  getItems(props: Props): Array<ReportTemplateVo> {
    if (props.items) {
      return props.items.map((item) => new ReportTemplateVo(item));
    }
    return [];
  }
}
