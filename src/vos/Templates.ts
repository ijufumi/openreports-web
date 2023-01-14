import Template, { Props as ReportTemplateProps } from "./Template";
import { ListProps, ListVo } from "./base";

interface Props extends ListProps {
  items: Array<ReportTemplateProps>;
}

export default class Templates extends ListVo {
  readonly items: Array<Template> = [];

  constructor(props: Props) {
    super(props);
    this.items = this.getItems(props);
  }

  getItems(props: Props): Array<Template> {
    if (props.items) {
      return props.items.map((item) => new Template(item));
    }
    return [];
  }
}
