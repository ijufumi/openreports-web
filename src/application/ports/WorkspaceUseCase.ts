import RoleVo from "../dto/vos/responses/RoleVo"
import WorkspaceMemberVo from "../dto/vos/responses/WorkspaceMemberVo"
import WorkspaceMembersVo from "../dto/vos/responses/WorkspaceMembersVo"
import WorkspaceVo from "../dto/vos/responses/WorkspaceVo"

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
