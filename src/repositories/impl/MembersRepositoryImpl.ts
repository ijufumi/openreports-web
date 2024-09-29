import MembersRepository from "../MembersRepository"
import BaseRepository from "./BaseRepository"
import FunctionVo from "../../vos/responses/FunctionVo"
import UpdateMemberVo from "../../vos/requests/UpdateMemberVo"
import UserVo from "../../vos/responses/UserVo"

export default class MembersRepositoryImpl
  extends BaseRepository
  implements MembersRepository
{
  update = async (args: UpdateMemberVo) => {
    return await this._put({ path: "/update", body: args })
  }

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
