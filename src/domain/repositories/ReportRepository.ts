import ReportsVo from "../../application/dto/vos/responses/ReportsVo"
import ReportVo from "../../application/dto/vos/responses/ReportVo"
import GetReportsVo from "../../application/dto/vos/requests/GetReportsVo"
import IdVo from "../../application/dto/vos/requests/IdVo"
import CreateReportVo from "../../application/dto/vos/requests/CreateReportVo"
import UpdateReportVo from "../../application/dto/vos/requests/UpdateReportVo"
import FileVo from "../../application/dto/vos/responses/FileVo"

export default interface ReportRepository {
  getsByFilter(args: GetReportsVo): Promise<ReportsVo>

  getById(args: IdVo): Promise<ReportVo>

  register(args: CreateReportVo): Promise<ReportVo>

  update(args: UpdateReportVo): Promise<ReportVo>

  output(args: { id: string, asPDF?: boolean }): Promise<FileVo>

  delete(args: IdVo): Promise<void>
}
