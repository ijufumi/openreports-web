import DriverTypeRepository from "../DriverTypeRepository"
import BaseRepository from "./BaseRepository"
import DriverTypeVo from "../../vos/responses/DriverTypeVo"

export default class DriverTypeRepositoryImpl
  extends BaseRepository
  implements DriverTypeRepository
{
  getAll = async () => {
    const result = await this._get({ path: "/", hasResponse: true })
    return result.map((v: any) => new DriverTypeVo(v))
  }
}
