import { ILoginRepository } from "../ILoginRepository";
import BaseRepository from "../BaseRepository";

export default class LoginRepository
  extends BaseRepository
  implements ILoginRepository
{
  login = async (args: { email: string; password: string }) => {
    return this.post({ path: "/password", body: args });
  };

  getGoogleLoginUrl = async () => {
    return this.get({ path: "/google/authorization_url" });
  };

  loginWithGoogle = async (args: { code: string }) => {
    return this.post({ path: "/google", body: args });
  };
}
