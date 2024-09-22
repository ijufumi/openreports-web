import BaseRepository from "./BaseRepository"
import RoleRepository from "../RoleRepository"
import RoleVo from "../../vos/responses/RoleVo"

export default class RoleRepositoryImpl
  extends BaseRepository
  implements RoleRepository
{
  roles = async () => {
    const result = await this._get({ path: "/", hasResponse: true })
    return result.map((v: any) => new RoleVo(v))
  }
}
