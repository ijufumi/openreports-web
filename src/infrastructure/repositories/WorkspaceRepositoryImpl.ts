import BaseRepository from "../http/BaseRepository"
import WorkspaceRepository from "../../domain/repositories/WorkspaceRepository"
import WorkspaceVo from "../../application/dto/vos/responses/WorkspaceVo"
import IdVo from "../../application/dto/vos/requests/IdVo"
import CreateWorkspaceVo from "../../application/dto/vos/requests/CreateWorkspaceVo"
import UpdateWorkspaceVo from "../../application/dto/vos/requests/UpdateWorkspaceVo"

export default class WorkspaceRepositoryImpl
  extends BaseRepository
  implements WorkspaceRepository
{
  getById = async (args: IdVo) => {
    const path = `/${args.id}`
    const result = await this._get({ path, hasResponse: true })
    return new WorkspaceVo(result)
  }

  register = async (args: CreateWorkspaceVo) => {
    const path = `/`
    const body = { name: args.name }
    const result = await this._post({ path, body })
    return new WorkspaceVo(result)
  }

  update = async (args: UpdateWorkspaceVo) => {
    const path = `/${args.id}`
    const body = { name: args.name }
    const result = await this._put({ path, body })
    return new WorkspaceVo(result)
  }
}
