import { API_ENDPOINT } from "../infrastructure/config/const"
import DataSourceRepository from "../domain/repositories/DataSourceRepository"
import DriverTypeRepository from "../domain/repositories/DriverTypeRepository"
import LoginRepository from "../domain/repositories/LoginRepository"
import MembersRepository from "../domain/repositories/MembersRepository"
import ReportRepository from "../domain/repositories/ReportRepository"
import ReportGroupRepository from "../domain/repositories/ReportGroupRepository"
import RoleRepository from "../domain/repositories/RoleRepository"
import TemplatesRepository from "../domain/repositories/TemplatesRepository"
import WorkspaceMemberRepository from "../domain/repositories/WorkspaceMemberRepository"
import WorkspaceRepository from "../domain/repositories/WorkspaceRepository"

import DataSourceRepositoryImpl from "../infrastructure/repositories/DataSourceRepositoryImpl"
import DriverTypeRepositoryImpl from "../infrastructure/repositories/DriverTypeRepositoryImpl"
import LoginRepositoryImpl from "../infrastructure/repositories/LoginRepositoryImpl"
import MembersRepositoryImpl from "../infrastructure/repositories/MembersRepositoryImpl"
import ReportRepositoryImpl from "../infrastructure/repositories/ReportRepositoryImpl"
import TemplatesRepositoryImpl from "../infrastructure/repositories/TemplatesRepositoryImpl"
import ReportGroupRepositoryImpl from "../infrastructure/repositories/ReportGroupRepositoryImpl"
import RoleRepositoryImpl from "../infrastructure/repositories/RoleRepositoryImpl"
import WorkspaceMemberRepositoryImpl from "../infrastructure/repositories/WorkspaceMemberRepositoryImpl"
import WorkspaceRepositoryImpl from "../infrastructure/repositories/WorkspaceRepositoryImpl"

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
