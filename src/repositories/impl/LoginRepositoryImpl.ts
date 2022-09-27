import LoginRepository from "../LoginRepository";
import BaseRepository from "../BaseRepository";

export default class LoginRepositoryImpl
  extends BaseRepository
  implements LoginRepository
{
  login = async (args: { email: string; password: string }) => {
    return await this.post({ path: "/password", body: args });
  };

  getGoogleLoginUrl = async () => {
    return await this.get({ path: "/google/authorization_url" });
  };

  loginWithGoogle = async (args: { code: string }) => {
    return await this.post({ path: "/google", body: args });
  };

  logout = async () => {
    return await this.get({ path: "/logout", auth: true });
  };
}
