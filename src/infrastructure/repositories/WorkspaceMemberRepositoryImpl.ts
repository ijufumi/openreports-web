import BaseRepository from "../http/BaseRepository"
import WorkspaceMemberRepository from "../../domain/repositories/WorkspaceMemberRepository"
import WorkspaceMembersVo from "../../application/dto/vos/responses/WorkspaceMembersVo"
import WorkspaceMemberVo from "../../application/dto/vos/responses/WorkspaceMemberVo"
import GetWorkspaceMembersVo from "../../application/dto/vos/requests/GetWorkspaceMembersVo"
import GetWorkspaceMemberByMemberIdVo from "../../application/dto/vos/requests/GetWorkspaceMemberByMemberIdVo"
import UpdateWorkspaceMemberVo from "../../application/dto/vos/requests/UpdateWorkspaceMemberVo"

export default class WorkspaceMemberRepositoryImpl
  extends BaseRepository
  implements WorkspaceMemberRepository
{
  gets = async (args: GetWorkspaceMembersVo) => {
    const path = `?page=${args.page}&limit=${args.limit}`
    const result = await this._get({ path, hasResponse: true })
    return new WorkspaceMembersVo(result)
  }

  getByMemberId = async (args: GetWorkspaceMemberByMemberIdVo) => {
    const result = await this._get({
      path: `/${args.memberId}`,
      hasResponse: true,
    })
    return new WorkspaceMemberVo(result)
  }

  update = async (args: UpdateWorkspaceMemberVo) => {
    const body = {}
    const { roleId } = args
    const result = await this._put({
      path: `/${args.memberId}`,
      body: { roleId },
    })
    return new WorkspaceMemberVo(result)
  }
}
