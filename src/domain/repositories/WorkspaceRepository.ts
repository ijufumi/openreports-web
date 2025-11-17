import WorkspaceVo from "../../application/dto/vos/responses/WorkspaceVo"
import IdVo from "../../application/dto/vos/requests/IdVo"
import CreateWorkspaceVo from "../../application/dto/vos/requests/CreateWorkspaceVo"
import UpdateWorkspaceVo from "../../application/dto/vos/requests/UpdateWorkspaceVo"

export default interface WorkspaceRepository {
  getById(args: IdVo): Promise<WorkspaceVo>

  register(args: CreateWorkspaceVo): Promise<WorkspaceVo>

  update(args: UpdateWorkspaceVo): Promise<WorkspaceVo>
}
