import { ListVo, ListProps } from "./base"
import WorkspaceVo, { Props as WorkspaceProps } from "./WorkspaceVo"

interface Props extends ListProps<WorkspaceProps> {
  items: Array<WorkspaceProps>
}

export default class WorkspacesVo extends ListVo<WorkspaceProps, WorkspaceVo> {
  readonly items: Array<WorkspaceVo> = []

  constructor(props: Props) {
    super(props)
    this.items = this.getItems(props)
  }

  getItems(props: Props): Array<WorkspaceVo> {
    if (props.items.length > 0) {
      return props.items.map((item) => new WorkspaceVo(item))
    }
    return []
  }
}
