import ReportsVo from "../vos/responses/ReportsVo"
import TemplatesVo from "../vos/responses/TemplatesVo"
import ReportVo from "../vos/responses/ReportVo"
import TemplateVo from "../vos/responses/TemplateVo"
import GetReportsVo from "../vos/requests/GetReportsVo"
import IdVo from "../vos/requests/IdVo"
import UpdateReportVo from "../vos/requests/UpdateReportVo"
import CreateReportVo from "../vos/requests/CreateReportVo"
import FileVo from "../vos/responses/FileVo"

export default interface ReportsUseCase {
  reports(args: GetReportsVo): Promise<ReportsVo | undefined>

  report(args: IdVo): Promise<ReportVo | undefined>

  registerReport(args: CreateReportVo): Promise<ReportVo | undefined>

  updateReport(args: UpdateReportVo): Promise<ReportVo | undefined>

  deleteReport(args: IdVo): Promise<void>

  templates(args: {
    page: number
    limit: number
  }): Promise<TemplatesVo | undefined>

  template(args: { id: string }): Promise<TemplateVo | undefined>

  registerTemplate(args: {
    name: string
    file: File
  }): Promise<TemplateVo | undefined>

  updateTemplate(args: {
    id: string
    name: string
  }): Promise<TemplateVo | undefined>

  deleteTemplate(args: { id: string }): Promise<boolean>

  outputReport(args: {id: string, asPDF?: boolean}): Promise<FileVo | undefined>
}
