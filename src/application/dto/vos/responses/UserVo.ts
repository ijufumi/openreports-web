import WorkspaceVo, { Props as WorkspaceProps } from "./WorkspaceVo"

interface Props {
  id: string
  email: string
  name: string
  workspaces: Array<WorkspaceProps>
}

export default class UserVo {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly workspaces: Array<WorkspaceVo>

  constructor(props: Props) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    if (props.workspaces.length > 0) {
      this.workspaces = props.workspaces.map((w) => new WorkspaceVo(w))
    } else {
      this.workspaces = []
    }
  }
}
