import BaseRepository from "../BaseRepository";
import ReportTemplatesRepository from "../ReportTemplatesRepository";
import ReportTemplatesVo from "../../vos/ReportTemplatesVo";
import ReportTemplateVo from "../../vos/ReportTemplateVo";

export default class ReportTemplatesRepositoryImpl
  extends BaseRepository
  implements ReportTemplatesRepository
{
  getAll = async (args: { page: number; limit: number }) => {
    const path = `?page=${args.page}&limit=${args.limit}`;
    const result = await this._get({ path });
    return new ReportTemplatesVo(result);
  };

  getById = async (args: { id: string }) => {
    const result = await this._get({ path: `/${args.id}` });
    return new ReportTemplateVo(result);
  };
}
