import WorkspaceMembersVo from "../vos/responses/WorkspaceMembersVo"
import WorkspaceMemberVo from "../vos/responses/WorkspaceMemberVo"
import GetWorkspaceMembersVo from "../vos/requests/GetWorkspaceMembersVo"
import UpdateWorkspaceMemberVo from "../vos/requests/UpdateWorkspaceMemberVo"
import GetWorkspaceMemberByMemberIdVo from "../vos/requests/GetWorkspaceMemberByMemberIdVo"

export default interface WorkspaceMemberRepository {
  gets(args: GetWorkspaceMembersVo): Promise<WorkspaceMembersVo>

  getByMemberId(
    args: GetWorkspaceMemberByMemberIdVo
  ): Promise<WorkspaceMemberVo>

  update(args: UpdateWorkspaceMemberVo): Promise<WorkspaceMemberVo>
}
