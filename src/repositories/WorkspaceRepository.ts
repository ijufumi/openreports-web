import WorkspaceVo from "../vos/WorkspaceVo";
import WorkspacesVo from "../vos/WorkspacesVo";

export default interface WorkspaceRepository {
  getById(args: { id: string }): Promise<WorkspaceVo | undefined>;

  getByMemberId(args: { memberId: string }): Promise<WorkspacesVo | undefined>;

  update(args: { id: string; name: string }): Promise<WorkspaceVo | undefined>;
}
