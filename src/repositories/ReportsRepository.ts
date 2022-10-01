import ReportsVo from "../vos/ReportsVo";

export default interface ReportsRepository {
  reports(): Promise<ReportsVo | undefined>;
}
