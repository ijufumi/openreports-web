import BaseRepository from "../BaseRepository";
import ReportsRepository from "../ReportsRepository";
import ReportsVo from "../../vos/ReportsVo";
import ReportVo from "../../vos/ReportVo";

export default class ReportsRepositoryImpl
  extends BaseRepository
  implements ReportsRepository
{
  getAll = async (args: { page: number; limit: number }) => {
    const path = `?page=${args.page}&limit=${args.limit}`;
    const result = await this.get({ path });
    return new ReportsVo(result);
  };
  getById = async (args: { id: string }) => {
    const result = await this.get({ path: `/${args.id}` });
    return new ReportVo(result);
  };
}
