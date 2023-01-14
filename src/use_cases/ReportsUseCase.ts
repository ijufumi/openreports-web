import Reports from "../vos/Reports";
import Templates from "../vos/Templates";
import Report from "../vos/Report";
import Template from "../vos/Template";

export default interface ReportsUseCase {
  reports(
    page: number,
    limit: number,
    templateId?: string
  ): Promise<Reports | undefined>;

  report(id: string): Promise<Report | undefined>;

  outputReport(id: string): Promise<Blob | undefined>;

  updateReport(
    id: string,
    name: string,
    reportTemplateId: string
  ): Promise<Report | undefined>;

  deleteReport(id: string): Promise<void>;

  templates(page: number, limit: number): Promise<Templates | undefined>;

  template(id: string): Promise<Template | undefined>;

  registerTemplate(name: string, file: File): Promise<Template | undefined>;

  updateTemplate(id: string, name: string): Promise<Template | undefined>;

  deleteTemplate(id: string): Promise<boolean>;
}
