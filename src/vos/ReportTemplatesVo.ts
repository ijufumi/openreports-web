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
  }

  getItems(props: ListProps): Array<any> {
    if (props.items) {
      return props.items.map((item) => new ReportTemplateVo(item));
    }
    return [];
  }
}
