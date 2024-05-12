import ReportsVo from "../vos/ReportsVo"
import ReportVo from "../vos/ReportVo"

export default interface ReportsRepository {
  getsByFilter(args: {
    page: number
    limit: number
    templateId?: string
  }): Promise<ReportsVo>

  getById(args: { id: string }): Promise<ReportVo>

  create(args: {
    name: string
    templateId: string
    dataSourceId?: string
    parameterIds: String[]
  }): Promise<ReportVo>

  update(args: {
    id: string
    name: string
    templateId: string
    dataSourceId?: string
  }): Promise<ReportVo>

  output(args: { id: string }): Promise<Blob>

  delete(args: { id: string }): Promise<void>
}
