import WorkspaceUseCase from "../WorkspaceUseCase";
import UseCaseBase from "./UseCaseBase";
import RoleRepository from "../../repositories/RoleRepository";
import WorkspaceMemberRepository from "../../repositories/WorkspaceMemberRepository";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";

export default class WorkspaceUseCaseImpl
  extends UseCaseBase
  implements WorkspaceUseCase
{
  private readonly roleRepository: RoleRepository;
  private readonly workspaceRepository: WorkspaceRepository;
  private readonly workspaceMemberRepository: WorkspaceMemberRepository;

  constructor(
    roleRepository: RoleRepository,
    workspaceRepository: WorkspaceRepository,
    workspaceMemberRepository: WorkspaceMemberRepository
  ) {
    super();
    this.roleRepository = roleRepository;
    this.workspaceRepository = workspaceRepository;
    this.workspaceMemberRepository = workspaceMemberRepository;
  }

  deleteWorkspaceMember = async (args: { memberId: string }) => {
    return undefined;
  };

  getRoles = async () => {
    return await this.roleRepository.roles();
  };

  getWorkspace = async (args: { id: string }) => {
    return this.workspaceRepository.getById(args);
  };

  getWorkspaceMember = async (args: { memberId: string }) => {
    const { memberId } = args;
    return this.workspaceMemberRepository.getByMemberId({ memberId });
  };

  getWorkspaceMembers = async (args: { limit: number; page: number }) => {
    const { limit, page } = args;
    return this.workspaceMemberRepository.gets({ limit, page });
  };

  updateWorkspace = async (args: { id: string; name: string }) => {
    return this.workspaceRepository.update(args);
  };

  updateWorkspaceMember = async (args: {
    memberId: string;
    roleId: string;
  }) => {
    const { memberId, roleId } = args;
    return this.workspaceMemberRepository.update({ memberId, roleId });
  };
}
