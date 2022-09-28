import MembersRepository from "../MembersRepository";
import BaseRepository from "../BaseRepository";

export default class MembersRepositoryImpl
  extends BaseRepository
  implements MembersRepository
{
  logout = async () => {
    return await this.get({ path: "/logout", auth: true });
  };

  status = async () => {
    return await this.get({ path: "/status" });
  };
}
