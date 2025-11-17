export interface Props {
  workspaceId: string
  memberId: string
  email: string
  roleId: string
}

export default class WorkspaceMemberVo {
  readonly workspaceId: string
  readonly memberId: string
  readonly email: string
  readonly roleId: string

  constructor(props: Props) {
    this.workspaceId = props.workspaceId
    this.memberId = props.memberId
    this.email = props.email
    this.roleId = props.roleId
  }
}
