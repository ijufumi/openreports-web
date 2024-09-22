import BaseRepository from "./BaseRepository"
import DataSourceRepository from "../DataSourceRepository"
import DataSourceVo from "../../vos/responses/DataSourceVo"
import DataSourcesVo from "../../vos/responses/DataSourcesVo"
import CreateDataSourceVo from "../../vos/requests/CreateDataSourceVo"
import UpdateDataSourceVo from "../../vos/requests/UpdateDataSourceVo"

export default class DataSourceRepositoryImpl
  extends BaseRepository
  implements DataSourceRepository
{
  delete = async (args: { id: string }) => {
    const path = `/${args.id}`
    await this._delete({ path })
  }

  getById = async (args: { id: string }) => {
    const path = `/${args.id}`
    const result = await this._get({ path, hasResponse: true })
    return new DataSourceVo(result)
  }

  gets = async (args: { page: number; limit: number }) => {
    const path = `?page=${args.page}&limit=${args.limit}`
    const result = await this._get({ path, hasResponse: true })
    return new DataSourcesVo(result)
  }

  register = async (args: CreateDataSourceVo) => {
    const result = await this._post({ path: "/", body: args })
    return new DataSourceVo(result)
  }

  update = async (args: UpdateDataSourceVo) => {
    const path = `/${args.id}`
    const result = await this._put({ path, body: args })
    return new DataSourceVo(result)
  }
}
