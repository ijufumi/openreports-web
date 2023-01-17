import BaseRepository from "./BaseRepository";
import DataSourceRepository from "../DataSourceRepository";
import DataSourceVo from "../../vos/DataSourceVo";
import DataSourcesVo from "../../vos/DataSources";

export default class DataSourceRepositoryImpl
  extends BaseRepository
  implements DataSourceRepository
{
  delete = async (args: { id: string }) => {
    return Promise.resolve(undefined);
  };

  getById = async (args: { id: string }) => {
    const path = `/${args.id}`;
    const result = await this._get({ path });
    return new DataSourceVo(result);
  };

  gets = async (args: { page: number; limit: number }) => {
    const path = `?page=${args.page}&limit=${args.limit}`;
    const result = await this._get({ path });
    return new DataSourcesVo(result);
  };

  register = async (args: {
    name: string;
    url: string;
    username: string;
    password: string;
    driverTypeId: string;
  }) => {
    const result = await this._post({ path: "/", body: args });
    return new DataSourceVo(result);
  };

  update = async (args: {
    id: string;
    name: string;
    url: string;
    username: string;
    password: string;
    driverTypeId: string;
  }) => {
    const path = `/${args.id}`;
    const result = await this._put({ path, body: args });
    return new DataSourceVo(result);
  };
}
