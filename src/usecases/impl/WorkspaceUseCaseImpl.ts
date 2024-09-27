import WorkspaceUseCase from "../WorkspaceUseCase"
import BaseUseCase from "./BaseUseCase"
import RoleRepository from "src/repositories/RoleRepository"
import WorkspaceMemberRepository from "src/repositories/WorkspaceMemberRepository"
import WorkspaceRepository from "src/repositories/WorkspaceRepository"
import { LoginUser } from "../../states/LoginUser"
import GetWorkspaceMemberByMemberIdVo from "../../vos/requests/GetWorkspaceMemberByMemberIdVo"
import GetWorkspaceMembersVo from "../../vos/requests/GetWorkspaceMembersVo"
import UpdateWorkspaceMemberVo from "../../vos/requests/UpdateWorkspaceMemberVo"
import IdVo from "../../vos/requests/IdVo"
import UpdateWorkspaceVo from "../../vos/requests/UpdateWorkspaceVo"

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
