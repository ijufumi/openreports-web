import MembersRepository from "../MembersRepository"
import BaseRepository from "./BaseRepository"
import FunctionVo from "../../vos/FunctionVo"

export default class MembersRepositoryImpl
  extends BaseRepository
  implements MembersRepository
{
  logout = async () => {
    await this._get({ path: "/logout" })
  }

  status = async () => {
    return await this._get({ path: "/status", hasResponse: true })
  }

  permissions = async () => {
    return await this._get({ path: "/permissions", hasResponse: true })
  }

  accessToken = async () => {
    await this._post({ path: "/access-token" })
  }
}
