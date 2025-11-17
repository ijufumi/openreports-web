import WorkspaceUseCase from "../ports/WorkspaceUseCase"
import BaseUseCase from "./BaseUseCase"
import RoleRepository from "../../domain/repositories/RoleRepository"
import WorkspaceMemberRepository from "../../domain/repositories/WorkspaceMemberRepository"
import WorkspaceRepository from "../../domain/repositories/WorkspaceRepository"
import { LoginUser } from "../../infrastructure/state/LoginUser"
import GetWorkspaceMemberByMemberIdVo from "../dto/vos/requests/GetWorkspaceMemberByMemberIdVo"
import GetWorkspaceMembersVo from "../dto/vos/requests/GetWorkspaceMembersVo"
import UpdateWorkspaceMemberVo from "../dto/vos/requests/UpdateWorkspaceMemberVo"
import IdVo from "../dto/vos/requests/IdVo"
import UpdateWorkspaceVo from "../dto/vos/requests/UpdateWorkspaceVo"

export default class WorkspaceUseCaseImpl
  extends BaseUseCase
  implements WorkspaceUseCase
{
  private readonly roleRepository: RoleRepository
  private readonly workspaceRepository: WorkspaceRepository
  private readonly workspaceMemberRepository: WorkspaceMemberRepository

  constructor(
    roleRepository: RoleRepository,
    workspaceRepository: WorkspaceRepository,
    workspaceMemberRepository: WorkspaceMemberRepository
  ) {
    super(null)
    this.roleRepository = roleRepository
    this.workspaceRepository = workspaceRepository
    this.workspaceMemberRepository = workspaceMemberRepository
  }

  deleteWorkspaceMember = async (args: { memberId: string }) => {
    return undefined
  }

  getRoles = async () => {
    return await this.roleRepository.roles()
  }

  getWorkspace = async (args: IdVo) => {
    return this.workspaceRepository.getById(args)
  }

  getWorkspaceMember = async (args: GetWorkspaceMemberByMemberIdVo) => {
    const { memberId } = args
    return this.workspaceMemberRepository.getByMemberId({ memberId })
  }

  getWorkspaceMembers = async (args: GetWorkspaceMembersVo) => {
    const { limit, page } = args
    return this.workspaceMemberRepository.gets({ limit, page })
  }

  updateWorkspace = async (args: UpdateWorkspaceVo) => {
    return this.workspaceRepository.update(args)
  }

  updateWorkspaceMember = async (args: UpdateWorkspaceMemberVo) => {
    const { memberId, roleId } = args
    return this.workspaceMemberRepository.update({ memberId, roleId })
  }
}
