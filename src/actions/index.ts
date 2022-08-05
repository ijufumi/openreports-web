import { Repositories } from "../repositories/Repositories";

class Action {
  readonly repos: Repositories;
  constructor(repos: Repositories) {
    this.repos = repos;
  }

  login = async (username: string, password: string) => {
    return await this.repos.login.login({ username, password });
  };

  googleLogin = async () => {
    return await this.repos.login.getGoogleLoginUrl();
  };
}

const actions = new Action(new Repositories());

export default actions;
