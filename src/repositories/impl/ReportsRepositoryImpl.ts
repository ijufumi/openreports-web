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
    const result = await this._get({ path });
    if (result) {
      return new ReportsVo(result);
    }
    return undefined;
  };

  getById = async (args: { id: string }) => {
    const result = await this._get({ path: `/${args.id}` });
    if (result) {
      return new ReportVo(result);
    }
    return undefined;
  };

  update = async (args: {
    id: string;
    name: string;
    reportTemplateId: string;
  }) => {
    const { name, reportTemplateId } = args;
    const result = await this._put({
      path: `/${args.id}`,
      body: { name, reportTemplateId },
    });
    if (result) {
      return new ReportVo(result);
    }
    return undefined;
  };

  output = async (args: { id: string }) => {
    return await this._download({ path: `/outputs/${args.id}` });
  };

  delete = async (args: { id: string }) => {
    return await this._delete({ path: `/${args.id}` });
  };
}
