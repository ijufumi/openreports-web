import ReportsVo from "../vos/ReportsVo";
import ReportTemplatesVo from "../vos/ReportTemplatesVo";
import ReportVo from "../vos/ReportVo";
import ReportTemplateVo from "../vos/ReportTemplateVo";

export default interface ReportsUseCase {
  reports(page: number, limit: number): Promise<ReportsVo | undefined>;

  report(id: string): Promise<ReportVo | undefined>;

  outputReport(id: string): Promise<Blob | undefined>;

  updateReport(
    id: string,
    name: string,
    reportTemplateId: string
  ): Promise<ReportVo | undefined>;

  deleteReport(id: string): Promise<void>;

  reportTemplates(
    page: number,
    limit: number
  ): Promise<ReportTemplatesVo | undefined>;

  reportTemplate(id: string): Promise<ReportTemplateVo | undefined>;
}
