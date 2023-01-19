import WorkspaceMembersVo from "../vos/WorkspaceMembersVo";
import WorkspaceMemberVo from "../vos/WorkspaceMemberVo";

export default interface WorkspaceMemberRepository {
  gets(args: { limit: number; page: number }): Promise<WorkspaceMembersVo>;

  getByMemberId(args: { memberId: string }): Promise<WorkspaceMemberVo>;

  update(args: {
    memberId: string;
    roleId: string;
  }): Promise<WorkspaceMemberVo>;
}
