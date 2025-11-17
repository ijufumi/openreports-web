import MembersRepository from "../../domain/repositories/MembersRepository"
import BaseRepository from "../http/BaseRepository"
import FunctionVo from "../../application/dto/vos/responses/FunctionVo"
import UpdateMemberVo from "../../application/dto/vos/requests/UpdateMemberVo"
import UserVo from "../../application/dto/vos/responses/UserVo"

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
