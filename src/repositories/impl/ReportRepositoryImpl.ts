import BaseRepository from "./BaseRepository"
import ReportRepository from "../ReportRepository"
import ReportsVo from "../../vos/ReportsVo"
import ReportVo from "../../vos/ReportVo"

export default class ReportRepositoryImpl
  extends BaseRepository
  implements ReportRepository
{
  getsByFilter = async (args: {
    page: number
    limit: number
    templateId?: string
  }) => {
    let path = `?page=${args.page}&limit=${args.limit}`
    if (args.templateId) {
      path = `${path}&templateId=${args.templateId}`
    }

    const result = await this._get({ path })
    return new ReportsVo(result)
  }

  getById = async (args: { id: string }) => {
    const result = await this._get({ path: `/${args.id}` })
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

  update = async (args: { id: string; name: string; templateId: string }) => {
    const { name, templateId } = args
    const result = await this._put({
      path: `/${args.id}`,
      body: { name, templateId },
    })
    return new ReportVo(result)
  }

  output = async (args: { id: string }) => {
    return await this._download({ path: `/outputs/${args.id}` })
  }

  delete = async (args: { id: string }) => {
    return await this._delete({ path: `/${args.id}` })
  }
}
