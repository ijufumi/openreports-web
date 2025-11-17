import LoginUseCaseImpl from "../application/usecases/LoginUseCaseImpl"
import MembersUseCaseImpl from "../application/usecases/MembersUseCaseImpl"
import ReportsUseCaseImpl from "../application/usecases/ReportsUseCaseImpl"
import ReportsUseCase from "../application/ports/ReportsUseCase"
import MembersUseCase from "../application/ports/MembersUseCase"
import LoginUseCase from "../application/ports/LoginUseCase"
import useLoginUser from "../infrastructure/state/LoginUser"
import RepositoryFactory from "./RepositoryFactory"
import WorkspaceUseCase from "../application/ports/WorkspaceUseCase"
import WorkspaceUseCaseImpl from "../application/usecases/WorkspaceUseCaseImpl"
import DataSourceUseCase from "../application/ports/DataSourceUseCase"
import DataSourceUseCaseImpl from "../application/usecases/DataSourceUseCaseImpl"

const loginRepository = RepositoryFactory.createLoginRepository()
const memberRepository = RepositoryFactory.createMemberRepository()
const reportRepository = RepositoryFactory.createReportRepository()
const templateRepository = RepositoryFactory.createTemplateRepository()
const workspaceRepository = RepositoryFactory.createWorkspaceRepository()
const workspaceMemberRepository =
  RepositoryFactory.createWorkspaceMemberRepository()
const roleRepository = RepositoryFactory.createRoleRepository()
const dataSourceRepository = RepositoryFactory.createDataSourceRepository()
const driverTypeRepository = RepositoryFactory.createDriverTypeRepository()

const loginUser = useLoginUser()

class UseCaseFactory {
  static createLoginUseCase(): LoginUseCase {
    return new LoginUseCaseImpl(loginRepository, loginUser)
  }

  static createMembersUseCase(): MembersUseCase {
    return new MembersUseCaseImpl(memberRepository, loginUser)
  }

  static createReportsUseCase(): ReportsUseCase {
    return new ReportsUseCaseImpl(reportRepository, templateRepository)
  }

  static createWorkspaceUseCase(): WorkspaceUseCase {
    return new WorkspaceUseCaseImpl(
      roleRepository,
      workspaceRepository,
      workspaceMemberRepository
    )
  }

  static createDataSourceUseCase(): DataSourceUseCase {
    return new DataSourceUseCaseImpl(dataSourceRepository, driverTypeRepository)
  }
}

export default UseCaseFactory
