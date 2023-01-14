import BaseRepository from "../BaseRepository";
import RoleRepository from "../RoleRepository";
import Role from "../../vos/Role";

export default class RoleRepositoryImpl
  extends BaseRepository
  implements RoleRepository
{
  roles = async () => {
    const result = await this._get({ path: "/" });
    if (result) {
      return result.map((v: any) => new Role(v));
    }
    return undefined;
  };
}
