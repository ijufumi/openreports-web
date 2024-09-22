import WorkspaceMembersVo from "../vos/responses/WorkspaceMembersVo"
import WorkspaceMemberVo from "../vos/responses/WorkspaceMemberVo"

export default interface WorkspaceMemberRepository {
  gets(args: { limit: number; page: number }): Promise<WorkspaceMembersVo>

  getByMemberId(args: { memberId: string }): Promise<WorkspaceMemberVo>

  update(args: { memberId: string; roleId: string }): Promise<WorkspaceMemberVo>
}
