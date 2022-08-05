import { ILoginRepository } from "../ILoginRepository";
import BaseRepository from "../BaseRepository";

export default class LoginRepository
  extends BaseRepository
  implements ILoginRepository
{
  login = async (args: { username: string; password: string }) => {
    const { username, password } = args;
    return this.post({ path: "/password", body: { username, password } });
  };

  getGoogleLoginUrl = async () => {
    return this.get({ path: "/google/authorization_url" });
  };

  loginWithGoogle = async (args: { code: string; state: string }) => {
    return this.post({ path: "/google", body: args });
  };
}
