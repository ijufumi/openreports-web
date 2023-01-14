import BaseRepository from "../BaseRepository";
import ReportsRepository from "../ReportsRepository";
import Reports from "../../vos/Reports";
import Report from "../../vos/Report";

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
    if (result) {
      return new Reports(result);
    }
    return undefined;
  };

  getById = async (args: { id: string }) => {
    const result = await this._get({ path: `/${args.id}` });
    if (result) {
      return new Report(result);
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
      return new Report(result);
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
