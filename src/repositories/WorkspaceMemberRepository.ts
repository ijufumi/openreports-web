import WorkspaceMembersVo from "../vos/WorkspaceMembersVo";
import WorkspaceMemberVo from "../vos/WorkspaceMemberVo";

export default interface WorkspaceMemberRepository {
  getAll(): Promise<WorkspaceMembersVo>;

  getByMemberId(args: {
    memberId: string;
  }): Promise<WorkspaceMemberVo | undefined>;

  update(args: {
    memberId: string;
    roleId: string;
  }): Promise<WorkspaceMemberVo>;
}
