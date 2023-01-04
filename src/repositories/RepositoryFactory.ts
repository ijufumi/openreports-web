import LoginRepositoryImpl from "./impl/LoginRepositoryImpl";
import MembersRepositoryImpl from "./impl/MembersRepositoryImpl";
import { API_ENDPOINT } from "../config/const";
import ReportsRepositoryImpl from "./impl/ReportsRepositoryImpl";
import TemplatesRepositoryImpl from "./impl/TemplatesRepositoryImpl";
import LoginRepository from "./LoginRepository";
import MembersRepository from "./MembersRepository";
import ReportsRepository from "./ReportsRepository";
import TemplatesRepository from "./TemplatesRepository";

class RepositoryFactory {
  static createLoginRepository(): LoginRepository {
    return new LoginRepositoryImpl(`${API_ENDPOINT}/login`);
  }
  static createMemberRepository(): MembersRepository {
    return new MembersRepositoryImpl(`${API_ENDPOINT}/members`, true);
  }
  static createReportRepository(): ReportsRepository {
    return new ReportsRepositoryImpl(`${API_ENDPOINT}/reports`, true);
  }
  static createTemplateRepository(): TemplatesRepository {
    return new TemplatesRepositoryImpl(`${API_ENDPOINT}/templates`, true);
  }
}

export default RepositoryFactory;
