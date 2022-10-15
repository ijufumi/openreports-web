import ReportsVo from "../vos/ReportsVo";
import ReportVo from "../vos/ReportVo";

export default interface ReportsUseCase {
  reports(page: number, limit: number): Promise<ReportsVo | undefined>;
  report(id: string): Promise<ReportVo | undefined>;
}
