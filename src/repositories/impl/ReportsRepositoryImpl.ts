import BaseRepository from "./BaseRepository";
import ReportsRepository from "../ReportsRepository";
import ReportsVo from "../../vos/ReportsVo";
import ReportVo from "../../vos/ReportVo";

export default class ReportsRepositoryImpl
  extends BaseRepository
  implements ReportsRepository
{
  getsByFilter = async (args: {
    page: number;
    limit: number;
    templateId?: string;
  }) => {
    let path = `?page=${args.page}&limit=${args.limit}`;
    if (args.templateId) {
      path = `${path}&templateId=${args.templateId}`;
    }

    const result = await this._get({ path });
    return new ReportsVo(result);
  };

  getById = async (args: { id: string }) => {
    const result = await this._get({ path: `/${args.id}` });
    return new ReportVo(result);
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
    return new ReportVo(result);
  };

  output = async (args: { id: string }) => {
    return await this._download({ path: `/outputs/${args.id}` });
  };

  delete = async (args: { id: string }) => {
    return await this._delete({ path: `/${args.id}` });
  };
}
