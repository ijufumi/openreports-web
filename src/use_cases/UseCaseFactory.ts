import LoginUseCaseImpl from "./impl/LoginUseCaseImpl"
import MembersUseCaseImpl from "./impl/MembersUseCaseImpl"
import ReportsUseCaseImpl from "./impl/ReportsUseCaseImpl"
import ReportsUseCase from "./ReportsUseCase"
import MembersUseCase from "./MembersUseCase"
import LoginUseCase from "./LoginUseCase"
import useLoginUser from "../states/LoginUser"
import RepositoryFactory from "../repositories/RepositoryFactory"
import WorkspaceUseCase from "./WorkspaceUseCase"
import WorkspaceUseCaseImpl from "./impl/WorkspaceUseCaseImpl"
import DataSourceUseCase from "./DataSourceUseCase"
import DataSourceUseCaseImpl from "./impl/DataSourceUseCaseImpl"

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
