import ReportsVo from "../vos/ReportsVo";
import ReportVo from "../vos/ReportVo";

export default interface ReportsRepository {
  getsByFilter(args: {
    page: number;
    limit: number;
    templateId?: string;
  }): Promise<ReportsVo | undefined>;

  getById(args: { id: string }): Promise<ReportVo | undefined>;

  update(args: {
    id: string;
    name: string;
    reportTemplateId: string;
  }): Promise<ReportVo | undefined>;

  output(args: { id: string }): Promise<Blob | undefined>;

  delete(args: { id: string }): Promise<void>;
}
