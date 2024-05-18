import LoginRepositoryImpl from "./impl/LoginRepositoryImpl"
import MembersRepositoryImpl from "./impl/MembersRepositoryImpl"
import { API_ENDPOINT } from "../config/const"
import ReportsRepositoryImpl from "./impl/ReportsRepositoryImpl"
import TemplatesRepositoryImpl from "./impl/TemplatesRepositoryImpl"
import LoginRepository from "./LoginRepository"
import MembersRepository from "./MembersRepository"
import ReportsRepository from "./ReportsRepository"
import ReportGroupRepository from "./ReportGroupRepository"
import ReportGroupRepositoryImpl from "./impl/ReportGroupRepositoryImpl"
import TemplatesRepository from "./TemplatesRepository"
import RoleRepository from "./RoleRepository"
import RoleRepositoryImpl from "./impl/RoleRepositoryImpl"
import WorkspaceMemberRepository from "./WorkspaceMemberRepository"
import WorkspaceMemberRepositoryImpl from "./impl/WorkspaceMemberRepositoryImpl"
import WorkspaceRepository from "./WorkspaceRepository"
import WorkspaceRepositoryImpl from "./impl/WorkspaceRepositoryImpl"
import DataSourceRepository from "./DataSourceRepository"
import DataSourceRepositoryImpl from "./impl/DataSourceRepositoryImpl"
import DriverTypeRepository from "./DriverTypeRepository"
import DriverTypeRepositoryImpl from "./impl/DriverTypeRepositoryImpl"

class RepositoryFactory {
  static createLoginRepository(): LoginRepository {
    return new LoginRepositoryImpl(`${API_ENDPOINT}/login`)
  }
  static createMemberRepository(): MembersRepository {
    return new MembersRepositoryImpl(`${API_ENDPOINT}/members`, true)
  }
  static createReportRepository(): ReportsRepository {
    return new ReportsRepositoryImpl(`${API_ENDPOINT}/reports`, true)
  }
  static createReportGroupRepository(): ReportGroupRepository {
    return new ReportGroupRepositoryImpl(`${API_ENDPOINT}/report-groups`, true)
  }
  static createTemplateRepository(): TemplatesRepository {
    return new TemplatesRepositoryImpl(`${API_ENDPOINT}/templates`, true)
  }
  static createRoleRepository(): RoleRepository {
    return new RoleRepositoryImpl(`${API_ENDPOINT}/roles`)
  }
  static createWorkspaceMemberRepository(): WorkspaceMemberRepository {
    return new WorkspaceMemberRepositoryImpl(
      `${API_ENDPOINT}/workspace_members`,
      true
    )
  }
  static createWorkspaceRepository(): WorkspaceRepository {
    return new WorkspaceRepositoryImpl(`${API_ENDPOINT}/workspaces`, true)
  }
  static createDataSourceRepository(): DataSourceRepository {
    return new DataSourceRepositoryImpl(`${API_ENDPOINT}/data_sources`, true)
  }
  static createDriverTypeRepository(): DriverTypeRepository {
    return new DriverTypeRepositoryImpl(`${API_ENDPOINT}/driver_types`)
  }
}

export default RepositoryFactory
