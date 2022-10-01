import ReportsVo from "../vos/ReportsVo";

export default interface ReportsUseCase {
  reports(): Promise<ReportsVo | undefined>;
}
