import LoginRepository from "../LoginRepository"
import BaseRepository from "./BaseRepository"

export default class LoginRepositoryImpl
  extends BaseRepository
  implements LoginRepository
{
  login = async (args: { email: string; password: string }) => {
    return await this._post({ path: "/password", body: args })
  }

  getGoogleLoginUrl = async () => {
    return await this._get({
      path: "/google/authorization_url",
      hasResponse: true,
    })
  }

  loginWithGoogle = async (args: { code: string }) => {
    return await this._post({ path: "/google", body: args })
  }
}
