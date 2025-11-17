import BaseRepository from "../http/BaseRepository"
import DataSourceRepository from "../../domain/repositories/DataSourceRepository"
import DataSourceVo from "../../application/dto/vos/responses/DataSourceVo"
import DataSourcesVo from "../../application/dto/vos/responses/DataSourcesVo"
import CreateDataSourceVo from "../../application/dto/vos/requests/CreateDataSourceVo"
import UpdateDataSourceVo from "../../application/dto/vos/requests/UpdateDataSourceVo"
import GetDataSourcesVo from "../../application/dto/vos/requests/GetDataSourcesVo"
import IdVo from "../../application/dto/vos/requests/IdVo"

export default class DataSourceRepositoryImpl
  extends BaseRepository
  implements DataSourceRepository
{
  delete = async (args: IdVo) => {
    const path = `/${args.id}`
    await this._delete({ path })
  }

  getById = async (args: IdVo) => {
    const path = `/${args.id}`
    const result = await this._get({ path, hasResponse: true })
    return new DataSourceVo(result)
  }

  gets = async (args: GetDataSourcesVo) => {
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
