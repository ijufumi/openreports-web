import BaseRepository from "../BaseRepository";
import WorkspaceRepository from "../WorkspaceRepository";
import WorkspaceVo from "../../vos/WorkspaceVo";

export default class WorkspaceRepositoryImpl
  extends BaseRepository
  implements WorkspaceRepository
{
  getById = async (args: { id: string }) => {
    const path = `/${args.id}`;
    const result = await this._get({ path });
    if (result) {
      return new WorkspaceVo(result);
    }
    return undefined;
  };

  getByMemberId = async (args: { memberId: string }) => {
    return Promise.resolve(undefined);
  };

  update = async (args: { id: string; name: string }) => {
    const path = `/${args.id}`;
    const body = { name: args.name };
    const result = await this._put({ path, body });
    if (result) {
      return new WorkspaceVo(result);
    }
    return undefined;
  };
}
