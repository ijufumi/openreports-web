import ReportsVo from "../vos/ReportsVo";

export default interface ReportRepository {
  reports(): Promise<ReportsVo>;
}
