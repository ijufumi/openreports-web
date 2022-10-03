import ReportsVo from "../vos/ReportsVo";

export default interface ReportsUseCase {
  reports(page: number, limit: number): Promise<ReportsVo | undefined>;
}
