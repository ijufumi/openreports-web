import WorkspaceUseCase from "../WorkspaceUseCase";
import UseCaseBase from "./UseCaseBase";
import RoleRepository from "../../repositories/RoleRepository";
import WorkspaceMemberRepository from "../../repositories/WorkspaceMemberRepository";

export default class WorkspaceUseCaseImpl
  extends UseCaseBase
  implements WorkspaceUseCase
{
  private readonly roleRepository: RoleRepository;
  private readonly workspaceMemberRepository: WorkspaceMemberRepository;

  constructor(
    roleRepository: RoleRepository,
    workspaceMemberRepository: WorkspaceMemberRepository
  ) {
    super();
    this.roleRepository = roleRepository;
    this.workspaceMemberRepository = workspaceMemberRepository;
  }

  deleteWorkspaceMember = async (args: { memberId: string }) => {
    return undefined;
  };

  getRoles = async () => {
    return await this.roleRepository.roles();
  };

  getWorkspace = async (args: { id: string }) => {
    return undefined;
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
    return undefined;
  };

  updateWorkspaceMember = async (args: {
    memberId: string;
    roleId: string;
  }) => {
    const { memberId, roleId } = args;
    return this.workspaceMemberRepository.update({ memberId, roleId });
  };
}
