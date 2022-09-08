import LoginUseCase from "../LoginUseCase";
import LoginRepository from "../../repositories/LoginRepository";
import RepositoryFactory from "../../repositories/RepositoryFactory";

class LoginUseCaseImpl implements LoginUseCase {
  private repository: LoginRepository;

  constructor() {
    this.repository = RepositoryFactory.createLoginRepository();
  }

  login = async (args: { email: string; password: string }) => {
    return this.repository.login(args);
  };

  getGoogleLoginUrl = async () => {
    return await this.repository.getGoogleLoginUrl();
  };

  loginWithGoogle = async (args: { code: string }) => {
    return await this.repository.loginWithGoogle(args);
  };
}

export default LoginUseCaseImpl;
