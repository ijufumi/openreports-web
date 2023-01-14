import ReportsVo from "../vos/ReportsVo";
import Templates from "../vos/Templates";
import ReportVo from "../vos/ReportVo";
import TemplateVo from "../vos/TemplateVo";

export default interface ReportsUseCase {
  reports(
    page: number,
    limit: number,
    templateId?: string
  ): Promise<ReportsVo | undefined>;

  report(id: string): Promise<ReportVo | undefined>;

  outputReport(id: string): Promise<Blob | undefined>;

  updateReport(
    id: string,
    name: string,
    reportTemplateId: string
  ): Promise<ReportVo | undefined>;

  deleteReport(id: string): Promise<void>;

  templates(page: number, limit: number): Promise<Templates | undefined>;

  template(id: string): Promise<TemplateVo | undefined>;

  registerTemplate(name: string, file: File): Promise<TemplateVo | undefined>;

  updateTemplate(id: string, name: string): Promise<TemplateVo | undefined>;

  deleteTemplate(id: string): Promise<boolean>;
}
