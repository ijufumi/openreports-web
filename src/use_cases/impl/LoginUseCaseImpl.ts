import LoginUseCase from "../LoginUseCase";
import LoginRepository from "../../repositories/LoginRepository";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import credentials from "../../states/Credentials";

class LoginUseCaseImpl implements LoginUseCase {
  private repository: LoginRepository;

  constructor() {
    this.repository = RepositoryFactory.createLoginRepository();
  }

  login = async (args: { email: string; password: string }) => {
    const user = await this.repository.login(args);
    if (user) {
      credentials.setToken(user.apiToken);
    }
    return user;
  };

  getGoogleLoginUrl = async () => {
    return await this.repository.getGoogleLoginUrl();
  };

  loginWithGoogle = async (args: { code: string }) => {
    const user = await this.repository.loginWithGoogle(args);
    if (user) {
      credentials.setToken(user.apiToken);
    }
    return user;
  };

  logout() {
    credentials.removeToken();
  }
}

export default LoginUseCaseImpl;
