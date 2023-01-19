import BaseRepository from "./BaseRepository";
import WorkspaceRepository from "../WorkspaceRepository";
import WorkspaceVo from "../../vos/WorkspaceVo";
import WorkspacesVo from "../../vos/WorkspacesVo";

export default class WorkspaceRepositoryImpl
  extends BaseRepository
  implements WorkspaceRepository
{
  getById = async (args: { id: string }) => {
    const path = `/${args.id}`;
    const result = await this._get({ path });
    return new WorkspaceVo(result);
  };

  update = async (args: { id: string; name: string }) => {
    const path = `/${args.id}`;
    const body = { name: args.name };
    const result = await this._put({ path, body });
    return new WorkspaceVo(result);
  };
}
