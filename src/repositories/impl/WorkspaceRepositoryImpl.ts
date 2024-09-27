import BaseRepository from "./BaseRepository"
import WorkspaceRepository from "../WorkspaceRepository"
import WorkspaceVo from "../../vos/responses/WorkspaceVo"
import IdVo from "../../vos/requests/IdVo"
import CreateWorkspaceVo from "../../vos/requests/CreateWorkspaceVo"
import UpdateWorkspaceVo from "../../vos/requests/UpdateWorkspaceVo"

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
