import { Props as WorkspaceProps } from "./WorkspaceVo"
import { Props as FunctionProps } from "./FunctionVo"

export interface Props {
  workspaces: Array<WorkspaceProps>
  functions: Array<FunctionProps>
}

export default class PermissionVo {
  readonly workspaces: Array<WorkspaceProps>
  readonly functions: Array<FunctionProps>

  constructor(props: Props) {
    this.workspaces = props.workspaces
    this.functions = props.functions
  }
}
