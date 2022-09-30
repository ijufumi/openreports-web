import BaseRepository from "../BaseRepository";
import ReportRepository from "../ReportRepository";
import ReportsVo from "../../vos/ReportsVo";

export default class ReportsRepositoryImpl
  extends BaseRepository
  implements ReportRepository
{
  reports = async () => {
    const result = await this.get({ path: "/" });
    return new ReportsVo(result);
  };
}
