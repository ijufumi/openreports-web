import WorkspaceVo from "../vos/responses/WorkspaceVo"
import IdVo from "../vos/requests/IdVo"
import CreateWorkspaceVo from "../vos/requests/CreateWorkspaceVo"
import UpdateWorkspaceVo from "../vos/requests/UpdateWorkspaceVo"

export default interface WorkspaceRepository {
  getById(args: IdVo): Promise<WorkspaceVo>

  register(args: CreateWorkspaceVo): Promise<WorkspaceVo>

  update(args: UpdateWorkspaceVo): Promise<WorkspaceVo>
}
