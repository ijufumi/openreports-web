import { ListVo, ListProps } from "./base"
import DataSourceVo, { Props as DataSourceProps } from "./DataSourceVo"

interface Props extends ListProps {
  items: Array<DataSourceProps>
}

export default class DataSourcesVo extends ListVo {
  readonly items: Array<DataSourceVo> = []

  constructor(props: Props) {
    super(props)
    this.items = this.getItems(props)
  }

  getItems(props: Props): Array<DataSourceVo> {
    if (props.items) {
      return props.items.map((item) => new DataSourceVo(item))
    }
    return []
  }
}
