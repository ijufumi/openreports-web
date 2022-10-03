import ReportsVo from "../vos/ReportsVo";

export default interface ReportsRepository {
  reports(args: {
    page: number;
    limit: number;
  }): Promise<ReportsVo | undefined>;
}
