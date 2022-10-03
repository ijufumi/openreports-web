import BaseRepository from "../BaseRepository";
import ReportsRepository from "../ReportsRepository";
import ReportsVo from "../../vos/ReportsVo";

export default class ReportsRepositoryImpl
  extends BaseRepository
  implements ReportsRepository
{
  reports = async (args: { page: number; limit: number }) => {
    const path = `/?page=${args.page}&limit=${args.limit}`;
    const result = await this.get({ path });
    return new ReportsVo(result);
  };
}
