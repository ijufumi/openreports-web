import LoginRepositoryImpl from "./impl/LoginRepositoryImpl";
import { API_ENDPOINT } from "../config/const";

class RepositoryFactory {
  static createLoginRepository = () => {
    return new LoginRepositoryImpl(`${API_ENDPOINT}/login`);
  };
}

export default RepositoryFactory;
