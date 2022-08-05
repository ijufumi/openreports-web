import { IMemberRepository } from "../IMemberRepository";
import BaseRepository from "../BaseRepository";

export default class MemberRepository
  extends BaseRepository
  implements IMemberRepository
{
  login = async (args: { username: string; password: string }) => {
    const { username, password } = args;
    return this.post({ path: "/login", body: { username, password } });
  };

  getGoogleLoginUrl = async () => {
    return this.get({ path: "/google/authorization_url" });
  };

  loginWithGoogle = async (args: { code: string; state: string }) => {
    return this.post({ path: "/google/login", body: args });
  };
}
