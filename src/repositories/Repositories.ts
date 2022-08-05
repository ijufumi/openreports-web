import { ILoginRepository } from "./ILoginRepository";
import LoginRepository from "./impl/LoginRepository";
import { API_ENDPOINT } from "../config/const";

class Repositories {
  readonly login: ILoginRepository;

  constructor() {
    this.login = new LoginRepository(`${API_ENDPOINT}/login`);
  }
}

const repos = new Repositories();
export default repos;
