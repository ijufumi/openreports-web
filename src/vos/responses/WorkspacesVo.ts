import { ListVo, ListProps } from "./base"
import WorkspaceVo, { Props as WorkspaceProps } from "./WorkspaceVo"

interface Props extends ListProps {
  items: Array<WorkspaceProps>
}

export default class WorkspacesVo extends ListVo {
  readonly items: Array<WorkspaceVo> = []

  constructor(props: Props) {
    super(props)
    this.items = this.getItems(props)
  }

  getItems(props: Props): Array<WorkspaceVo> {
    if (props.items) {
      return props.items.map((item) => new WorkspaceVo(item))
    }
    return []
  }
}
