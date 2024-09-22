import BaseRepository from "./BaseRepository"
import ReportGroupRepository from "../ReportGroupRepository"
import ReportGroupsVo from "../../vos/responses/ReportGroupsVo"
import ReportGroupVo from "../../vos/responses/ReportGroupVo"

export default class ReportGroupRepositoryImpl
  extends BaseRepository
  implements ReportGroupRepository
{
  getsByFilter = async (args: { page: number; limit: number }) => {
    const path = `?page=${args.page}&limit=${args.limit}`

    const result = await this._get({ path, hasResponse: true })
    return new ReportGroupsVo(result)
  }

  getById = async (args: { id: string }) => {
    const result = await this._get({ path: `/${args.id}`, hasResponse: true })
    return new ReportGroupVo(result)
  }

  register = async (args: { name: string }) => {
    const { name } = args
    const result = await this._put({
      path: `/`,
      body: { name },
    })
    return new ReportGroupVo(result)
  }

  update = async (args: { id: string; name: string }) => {
    const { name } = args
    const result = await this._put({
      path: `/${args.id}`,
      body: { name },
    })
    return new ReportGroupVo(result)
  }

  delete = async (args: { id: string }) => {
    return await this._delete({ path: `/${args.id}` })
  }
}
