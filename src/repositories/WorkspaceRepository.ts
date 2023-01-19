import WorkspaceVo from "../vos/WorkspaceVo";
import WorkspacesVo from "../vos/WorkspacesVo";

export default interface WorkspaceRepository {
  getById(args: { id: string }): Promise<WorkspaceVo>;

  update(args: { id: string; name: string }): Promise<WorkspaceVo>;
}
