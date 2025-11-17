import BaseRepository from "../http/BaseRepository"
import ReportGroupRepository from "../../domain/repositories/ReportGroupRepository"
import ReportGroupsVo from "../../application/dto/vos/responses/ReportGroupsVo"
import ReportGroupVo from "../../application/dto/vos/responses/ReportGroupVo"
import IdVo from "../../application/dto/vos/requests/IdVo"
import GetReportGroupsVo from "../../application/dto/vos/requests/GetReportGroupsVo"
import CreateReportGroupVo from "../../application/dto/vos/requests/CreateReportGroupVo"
import UpdateReportGroupVo from "../../application/dto/vos/requests/UpdateReportGroupVo"

export default class ReportGroupRepositoryImpl
  extends BaseRepository
  implements ReportGroupRepository
{
  getsByFilter = async (args: GetReportGroupsVo) => {
    const path = `?page=${args.page}&limit=${args.limit}`

    const result = await this._get({ path, hasResponse: true })
    return new ReportGroupsVo(result)
  }

  getById = async (args: IdVo) => {
    const result = await this._get({ path: `/${args.id}`, hasResponse: true })
    return new ReportGroupVo(result)
  }

  register = async (args: CreateReportGroupVo) => {
    const { name } = args
    const result = await this._post({
      path: `/`,
      body: { name },
    })
    return new ReportGroupVo(result)
  }

  update = async (args: UpdateReportGroupVo) => {
    const { name } = args
    const result = await this._put({
      path: `/${args.id}`,
      body: { name },
    })
    return new ReportGroupVo(result)
  }

  delete = async (args: IdVo) => {
    return await this._delete({ path: `/${args.id}` })
  }
}
