import BaseRepository from "../BaseRepository";
import WorkspaceMemberRepository from "../WorkspaceMemberRepository";
import WorkspaceMembersVo from "../../vos/WorkspaceMembersVo";
import WorkspaceMemberVo from "../../vos/WorkspaceMemberVo";

export default class WorkspaceMemberRepositoryImpl
  extends BaseRepository
  implements WorkspaceMemberRepository
{
  gets = async (args: { limit: number; page: number }) => {
    const path = `?page=${args.page}&limit=${args.limit}`;
    const result = await this._get({ path });
    return new WorkspaceMembersVo(result);
  };

  getByMemberId = async (args: { memberId: string }) => {
    const result = await this._get({ path: `/${args.memberId}` });
    if (result) {
      return new WorkspaceMemberVo(result);
    }
    return undefined;
  };

  update = async (args: { memberId: string; roleId: string }) => {
    const body = {};
    const { roleId } = args;
    const result = await this._put({
      path: `/${args.memberId}`,
      body: { roleId },
    });
    return new WorkspaceMemberVo(result);
  };
}
