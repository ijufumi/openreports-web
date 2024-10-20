import BaseRepository from "./BaseRepository"
import ReportGroupRepository from "../ReportGroupRepository"
import ReportGroupsVo from "../../vos/responses/ReportGroupsVo"
import ReportGroupVo from "../../vos/responses/ReportGroupVo"
import IdVo from "../../vos/requests/IdVo"
import GetReportGroupsVo from "../../vos/requests/GetReportGroupsVo"
import CreateReportGroupVo from "../../vos/requests/CreateReportGroupVo"
import UpdateReportGroupVo from "../../vos/requests/UpdateReportGroupVo"

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
