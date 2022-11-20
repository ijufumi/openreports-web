import LoginRepositoryImpl from "./impl/LoginRepositoryImpl";
import MembersRepositoryImpl from "./impl/MembersRepositoryImpl";
import { API_ENDPOINT } from "../config/const";
import ReportsRepositoryImpl from "./impl/ReportsRepositoryImpl";
import TemplatesRepositoryImpl from "./impl/TemplatesRepositoryImpl";

class RepositoryFactory {
  static createLoginRepository = () => {
    return new LoginRepositoryImpl(`${API_ENDPOINT}/login`);
  };
  static createMemberRepository = () => {
    return new MembersRepositoryImpl(`${API_ENDPOINT}/members`, true);
  };
  static createReportRepository = () => {
    return new ReportsRepositoryImpl(`${API_ENDPOINT}/reports`, true);
  };
  static createTemplateRepository = () => {
    return new TemplatesRepositoryImpl(`${API_ENDPOINT}/templates`, true);
  };
}

export default RepositoryFactory;
