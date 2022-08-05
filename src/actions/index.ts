import { RootRepository } from "../repositories/RootRepository";

export default class Action {
  readonly rootRepository: RootRepository;
  constructor(rootRepository: RootRepository) {
    this.rootRepository = rootRepository;
  }

  login = async (username: string, password: string) => {
    return await this.rootRepository.login.login({ username, password });
  };
}
