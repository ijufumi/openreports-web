import BaseRepository from "./BaseRepository"
import ReportRepository from "../ReportRepository"
import ReportsVo from "../../vos/responses/ReportsVo"
import ReportVo from "../../vos/responses/ReportVo"
import GetReportsVo from "../../vos/requests/GetReportsVo"
import IdVo from "../../vos/requests/IdVo"
import UpdateReportVo from "../../vos/requests/UpdateReportVo"

export default class ReportRepositoryImpl
  extends BaseRepository
  implements ReportRepository
{
  getsByFilter = async (args: GetReportsVo) => {
    let path = `?page=${args.page}&limit=${args.limit}`
    if (args.templateId) {
      path = `${path}&templateId=${args.templateId}`
    }

    const result = await this._get({ path, hasResponse: true })
    return new ReportsVo(result)
  }

  getById = async (args: IdVo) => {
    const result = await this._get({ path: `/${args.id}`, hasResponse: true })
    return new ReportVo(result)
  }

  register = async (args: {
    name: string
    templateId: string
    dataSourceId?: string
    parameterIds: String[]
  }) => {
    const { name, templateId, dataSourceId, parameterIds } = args
    const result = await this._put({
      path: `/`,
      body: { name, templateId, dataSourceId, parameterIds },
    })
    return new ReportVo(result)
  }

  update = async (args: UpdateReportVo) => {
    const { name, templateId } = args
    const result = await this._put({
      path: `/${args.id}`,
      body: { name, templateId },
    })
    return new ReportVo(result)
  }

  output = async (args: IdVo) => {
    return await this._download({ path: `/outputs/${args.id}` })
  }

  delete = async (args: IdVo) => {
    return await this._delete({ path: `/${args.id}` })
  }
}
