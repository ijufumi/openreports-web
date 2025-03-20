import ReportGroupVo, { Props as ReportGroupProps } from "./ReportGroupVo"
import { ListProps, ListVo } from "./base"

interface Props extends ListProps<ReportGroupProps> {
  items: Array<ReportGroupProps>
}

export default class ReportGroupsVo extends ListVo<
  ReportGroupProps,
  ReportGroupVo
> {
  readonly items: Array<ReportGroupVo> = []

  constructor(props: Props) {
    super(props)
    this.items = this.getItems(props)
  }

  getItems(props: Props): Array<ReportGroupVo> {
    if (props.items) {
      return props.items.map((item) => new ReportGroupVo(item))
    }
    return []
  }
}
