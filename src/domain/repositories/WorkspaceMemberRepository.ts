import WorkspaceMembersVo from "../../application/dto/vos/responses/WorkspaceMembersVo"
import WorkspaceMemberVo from "../../application/dto/vos/responses/WorkspaceMemberVo"
import GetWorkspaceMembersVo from "../../application/dto/vos/requests/GetWorkspaceMembersVo"
import UpdateWorkspaceMemberVo from "../../application/dto/vos/requests/UpdateWorkspaceMemberVo"
import GetWorkspaceMemberByMemberIdVo from "../../application/dto/vos/requests/GetWorkspaceMemberByMemberIdVo"

export default interface WorkspaceMemberRepository {
  gets(args: GetWorkspaceMembersVo): Promise<WorkspaceMembersVo>

  getByMemberId(
    args: GetWorkspaceMemberByMemberIdVo
  ): Promise<WorkspaceMemberVo>

  update(args: UpdateWorkspaceMemberVo): Promise<WorkspaceMemberVo>
}
