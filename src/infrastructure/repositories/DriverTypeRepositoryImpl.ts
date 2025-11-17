import DriverTypeRepository from "../../domain/repositories/DriverTypeRepository"
import BaseRepository from "../http/BaseRepository"
import DriverTypeVo from "../../application/dto/vos/responses/DriverTypeVo"

export default class DriverTypeRepositoryImpl
  extends BaseRepository
  implements DriverTypeRepository
{
  getAll = async () => {
    const result = await this._get({ path: "/", hasResponse: true })
    return result.map((v: any) => new DriverTypeVo(v))
  }
}
