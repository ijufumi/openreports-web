import LoginRepositoryImpl from "./impl/LoginRepositoryImpl";
import MembersRepositoryImpl from "./impl/MembersRepositoryImpl";
import { API_ENDPOINT } from "../config/const";

class RepositoryFactory {
  static createLoginRepository = () => {
    return new LoginRepositoryImpl(`${API_ENDPOINT}/login`);
  };
  static createMemberRepository = () => {
    return new MembersRepositoryImpl(`${API_ENDPOINT}/members`);
  };
}

export default RepositoryFactory;
