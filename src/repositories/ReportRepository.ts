import ReportsVo from "../vos/responses/ReportsVo"
import ReportVo from "../vos/responses/ReportVo"
import GetReportsVo from "../vos/requests/GetReportsVo"
import IdVo from "../vos/requests/IdVo"
import CreateReportVo from "../vos/requests/CreateReportVo"
import UpdateReportVo from "../vos/requests/UpdateReportVo"
import FileVo from "../vos/responses/FileVo"

export default interface ReportRepository {
  getsByFilter(args: GetReportsVo): Promise<ReportsVo>

  getById(args: IdVo): Promise<ReportVo>

  register(args: CreateReportVo): Promise<ReportVo>

  update(args: UpdateReportVo): Promise<ReportVo>

  output(args: { id: string, asPDF?: boolean }): Promise<FileVo>

  delete(args: IdVo): Promise<void>
}
