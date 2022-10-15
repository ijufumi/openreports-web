import ReportsVo from "../vos/ReportsVo";
import ReportVo from "../vos/ReportVo";

export default interface ReportsRepository {
  reports(args: {
    page: number;
    limit: number;
  }): Promise<ReportsVo | undefined>;

  report(args: { id: string }): Promise<ReportVo | undefined>;
}
