import { RootRepository } from "../repositories/RootRepository";

class Action {
  readonly rootRepository: RootRepository;
  constructor(rootRepository: RootRepository) {
    this.rootRepository = rootRepository;
  }

  login = async (username: string, password: string) => {
    return await this.rootRepository.login.login({ username, password });
  };

  googleLogin = async () => {
    return await this.rootRepository.login.getGoogleLoginUrl();
  };
}

const actions = new Action(new RootRepository());

export default actions;
