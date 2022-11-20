import ReportsVo from "../vos/ReportsVo";
import TemplatesVo from "../vos/TemplatesVo";
import ReportVo from "../vos/ReportVo";
import TemplateVo from "../vos/TemplateVo";

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

  templates(page: number, limit: number): Promise<TemplatesVo | undefined>;

  template(id: string): Promise<TemplateVo | undefined>;
}
