import ReportsVo from "../vos/ReportsVo";
import ReportVo from "../vos/ReportVo";

export default interface ReportsRepository {
  getAll(args: { page: number; limit: number }): Promise<ReportsVo | undefined>;

  getById(args: { id: string }): Promise<ReportVo | undefined>;
}
