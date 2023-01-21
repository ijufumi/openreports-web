import ReportsVo from "../vos/ReportsVo";
import TemplatesVo from "../vos/TemplatesVo";
import ReportVo from "../vos/ReportVo";
import TemplateVo from "../vos/TemplateVo";

export default interface ReportsUseCase {
  reports(args: {
    page: number;
    limit: number;
    templateId?: string;
  }): Promise<ReportsVo | undefined>;

  report(args: { id: string }): Promise<ReportVo | undefined>;

  outputReport(args: { id: string }): Promise<Blob | undefined>;

  updateReport(args: {
    id: string;
    name: string;
    templateId: string;
  }): Promise<ReportVo | undefined>;

  deleteReport(args: { id: string }): Promise<void>;

  templates(args: {
    page: number;
    limit: number;
  }): Promise<TemplatesVo | undefined>;

  template(args: { id: string }): Promise<TemplateVo | undefined>;

  registerTemplate(args: {
    name: string;
    file: File;
  }): Promise<TemplateVo | undefined>;

  updateTemplate(args: {
    id: string;
    name: string;
  }): Promise<TemplateVo | undefined>;

  deleteTemplate(args: { id: string }): Promise<boolean>;
}
