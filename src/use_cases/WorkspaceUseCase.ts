import RoleVo from "../vos/responses/RoleVo"
import WorkspaceMemberVo from "../vos/responses/WorkspaceMemberVo"
import WorkspaceMembersVo from "../vos/responses/WorkspaceMembersVo"
import WorkspaceVo from "../vos/responses/WorkspaceVo"

export default interface WorkspaceUseCase {
  getWorkspace(args: { id: string }): Promise<WorkspaceVo | undefined>

  updateWorkspace(args: {
    id: string
    name: string
  }): Promise<WorkspaceVo | undefined>

  getRoles(): Promise<Array<RoleVo> | undefined>

  getWorkspaceMembers(args: {
    limit: number
    page: number
  }): Promise<WorkspaceMembersVo>

  getWorkspaceMember(args: {
    memberId: string
  }): Promise<WorkspaceMemberVo | undefined>

  updateWorkspaceMember(args: {
    memberId: string
    roleId: string
  }): Promise<WorkspaceMemberVo | undefined>

  deleteWorkspaceMember(args: { memberId: string }): Promise<void>
}
