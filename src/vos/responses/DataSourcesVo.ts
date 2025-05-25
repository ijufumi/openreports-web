import { ListVo, ListProps } from "./base"
import DataSourceVo, { Props as DataSourceProps } from "./DataSourceVo"

interface Props extends ListProps<DataSourceProps> {
  items: Array<DataSourceProps>
}

export default class DataSourcesVo extends ListVo<
  DataSourceProps,
  DataSourceVo
> {
  readonly items: Array<DataSourceVo> = []

  constructor(props: Props) {
    super(props)
    this.items = this.getItems(props)
  }

  getItems(props: Props): Array<DataSourceVo> {
    if (props.items.length > 0) {
      return props.items.map((item) => new DataSourceVo(item))
    }
    return []
  }
}
