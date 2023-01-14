import BaseRepository from "../BaseRepository";
import TemplatesRepository from "../TemplatesRepository";
import Templates from "../../vos/Templates";
import Template from "../../vos/Template";

export default class TemplatesRepositoryImpl
  extends BaseRepository
  implements TemplatesRepository
{
  getAll = async (args: { page: number; limit: number }) => {
    const path = `?page=${args.page}&limit=${args.limit}`;
    const result = await this._get({ path });
    return new Templates(result);
  };

  getById = async (args: { id: string }) => {
    const result = await this._get({ path: `/${args.id}` });
    return new Template(result);
  };

  register = async (args: { name: string; file: File }) => {
    const formData = new FormData();
    formData.append("name", args.name);
    formData.append("file", args.file);
    const result = await this._upload({ path: "/", body: formData });
    return new Template(result);
  };

  update = async (args: { id: string; name: string }) => {
    const { id, name } = args;
    const result = await this._put({
      path: `/${id}`,
      body: { name },
    });
    if (result) {
      return new Template(result);
    }
    return undefined;
  };

  delete = async (args: { id: string }) => {
    const { id } = args;

    return await this._delete({
      path: `/${id}`,
    });
  };
}
