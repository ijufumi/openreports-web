import BaseRepository from "../BaseRepository";
import ReportsRepository from "../ReportsRepository";
import ReportsVo from "../../vos/ReportsVo";

export default class ReportsRepositoryImpl
  extends BaseRepository
  implements ReportsRepository
{
  reports = async () => {
    const result = await this.get({ path: "/" });
    return new ReportsVo(result);
  };
}
