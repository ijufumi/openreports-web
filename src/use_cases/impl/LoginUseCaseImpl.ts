import LoginUseCase from "../LoginUseCase";
import LoginRepository from "../../repositories/LoginRepository";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import credentials from "../../states/Credentials";
import UserVo from "../../vos/UserVo";

class LoginUseCaseImpl implements LoginUseCase {
  private repository: LoginRepository;

  constructor() {
    this.repository = RepositoryFactory.createLoginRepository();
  }

  login = async (args: { email: string; password: string }) => {
    const user = await this.repository.login(args);
    this._updateCredential(user);
    return user;
  };

  getGoogleLoginUrl = async () => {
    return await this.repository.getGoogleLoginUrl();
  };

  loginWithGoogle = async (args: { code: string }) => {
    const user = await this.repository.loginWithGoogle(args);
    this._updateCredential(user);
    return user;
  };

  _updateCredential = (user: UserVo | undefined) => {
    if (user) {
      credentials.setToken(user.apiToken);
      credentials.setWorkspaceId(user.workspaces[0].id);
    }
  };
}

export default LoginUseCaseImpl;
