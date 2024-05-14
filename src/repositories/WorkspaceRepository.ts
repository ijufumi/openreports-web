import WorkspaceVo from "../vos/WorkspaceVo"

export default interface WorkspaceRepository {
  getById(args: { id: string }): Promise<WorkspaceVo>

  register(args: { name: string }): Promise<WorkspaceVo>

  update(args: { id: string; name: string }): Promise<WorkspaceVo>
}
