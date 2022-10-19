import ReportTemplatesVo from "../vos/ReportTemplatesVo";
import ReportTemplateVo from "../vos/ReportTemplateVo";

export default interface ReportTemplatesRepository {
  getAll(args: {
    page: number;
    limit: number;
  }): Promise<ReportTemplatesVo | undefined>;

  getById(args: { id: string }): Promise<ReportTemplateVo | undefined>;
}
