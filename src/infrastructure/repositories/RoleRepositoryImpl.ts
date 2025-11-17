import BaseRepository from "../http/BaseRepository"
import RoleRepository from "../../domain/repositories/RoleRepository"
import RoleVo from "../../application/dto/vos/responses/RoleVo"

export default class RoleRepositoryImpl
  extends BaseRepository
  implements RoleRepository
{
  roles = async () => {
    const result = await this._get({ path: "/", hasResponse: true })
    return result.map((v: any) => new RoleVo(v))
  }
}
