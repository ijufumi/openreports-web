import { API_ENDPOINT } from "../config/const"
import DataSourceRepository from "./DataSourceRepository"
import DriverTypeRepository from "./DriverTypeRepository"
import LoginRepository from "./LoginRepository"
import MembersRepository from "./MembersRepository"
import ReportRepository from "./ReportRepository"
import ReportGroupRepository from "./ReportGroupRepository"
import RoleRepository from "./RoleRepository"
import TemplatesRepository from "./TemplatesRepository"
import WorkspaceMemberRepository from "./WorkspaceMemberRepository"
import WorkspaceRepository from "./WorkspaceRepository"

import DataSourceRepositoryImpl from "./impl/DataSourceRepositoryImpl"
import DriverTypeRepositoryImpl from "./impl/DriverTypeRepositoryImpl"
import LoginRepositoryImpl from "./impl/LoginRepositoryImpl"
import MembersRepositoryImpl from "./impl/MembersRepositoryImpl"
import ReportRepositoryImpl from "./impl/ReportRepositoryImpl"
import TemplatesRepositoryImpl from "./impl/TemplatesRepositoryImpl"
import ReportGroupRepositoryImpl from "./impl/ReportGroupRepositoryImpl"
import RoleRepositoryImpl from "./impl/RoleRepositoryImpl"
import WorkspaceMemberRepositoryImpl from "./impl/WorkspaceMemberRepositoryImpl"
import WorkspaceRepositoryImpl from "./impl/WorkspaceRepositoryImpl"

class RepositoryFactory {
  static createLoginRepository(): LoginRepository {
    return new LoginRepositoryImpl(`${API_ENDPOINT}/login`)
  }
  static createMemberRepository(): MembersRepository {
    return new MembersRepositoryImpl(`${API_ENDPOINT}/members`, true)
  }
  static createReportRepository(): ReportRepository {
    return new ReportRepositoryImpl(`${API_ENDPOINT}/reports`, true)
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
      `${API_ENDPOINT}/workspace-members`,
      true
    )
  }
  static createWorkspaceRepository(): WorkspaceRepository {
    return new WorkspaceRepositoryImpl(`${API_ENDPOINT}/workspaces`, true)
  }
  static createDataSourceRepository(): DataSourceRepository {
    return new DataSourceRepositoryImpl(`${API_ENDPOINT}/data-sources`, true)
  }
  static createDriverTypeRepository(): DriverTypeRepository {
    return new DriverTypeRepositoryImpl(`${API_ENDPOINT}/driver-types`)
  }
}

export default RepositoryFactory
