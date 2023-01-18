import WorkspacesVo from "../vos/WorkspacesVo";
import WorkspaceVo from "../vos/WorkspaceVo";

export default interface DataSourceUseCase {
  gets(args: {
    page: number;
    limit: number;
  }): Promise<WorkspacesVo | undefined>;

  getById(args: { id: string }): Promise<WorkspaceVo | undefined>;

  register(args: {
    name: string;
    url: string;
    username: string;
    password: string;
    driverTypeId: string;
  }): Promise<WorkspaceVo | undefined>;

  update(args: {
    id: string;
    name: string;
    url: string;
    username: string;
    password: string;
    driverTypeId: string;
  }): Promise<WorkspaceVo | undefined>;

  delete(args: { id: string }): Promise<boolean>;
}
