import BaseRepository from "./BaseRepository";
import RoleRepository from "../RoleRepository";
import RoleVo from "../../vos/RoleVo";

export default class RoleRepositoryImpl
  extends BaseRepository
  implements RoleRepository
{
  roles = async () => {
    const result = await this._get({ path: "/" });
    return result.map((v: any) => new RoleVo(v));
  };
}
