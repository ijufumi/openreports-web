import TemplateVo, { Props as ReportTemplateProps } from "./TemplateVo"
import { ListProps, ListVo } from "./base"

interface Props extends ListProps<ReportTemplateProps> {
  items: Array<ReportTemplateProps>
}

export default class TemplatesVo extends ListVo<
  ReportTemplateProps,
  TemplateVo
> {
  readonly items: Array<TemplateVo> = []

  constructor(props: Props) {
    super(props)
    this.items = this.getItems(props)
  }

  getItems(props: Props): Array<TemplateVo> {
    if (props.items) {
      return props.items.map((item) => new TemplateVo(item))
    }
    return []
  }
}
