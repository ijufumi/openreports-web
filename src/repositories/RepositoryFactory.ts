import LoginRepositoryImpl from "./impl/LoginRepositoryImpl";
import MembersRepositoryImpl from "./impl/MembersRepositoryImpl";
import { API_ENDPOINT } from "../config/const";
import ReportsRepositoryImpl from "./impl/ReportsRepositoryImpl";

class RepositoryFactory {
  static createLoginRepository = () => {
    return new LoginRepositoryImpl(`${API_ENDPOINT}/login`);
  };
  static createMemberRepository = () => {
    return new MembersRepositoryImpl(`${API_ENDPOINT}/members`);
  };
  static createReportRepository = () => {
    return new ReportsRepositoryImpl(`${API_ENDPOINT}/reports`);
  };
}

export default RepositoryFactory;
