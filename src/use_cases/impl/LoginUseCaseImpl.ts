import LoginUseCase from "src/use_cases/LoginUseCase";
import LoginRepository from "src/repositories/LoginRepository";
import Credentials from "../../states/Credentials";
import UserVo from "src/vos/UserVo";
import UseCaseBase from "./UseCaseBase";
import { LoginUser } from "src/states/LoginUser";

class LoginUseCaseImpl extends UseCaseBase implements LoginUseCase {
  private readonly repository: LoginRepository;
  private readonly loginUser: LoginUser;

  constructor(repository: LoginRepository, loginUser: LoginUser) {
    super();
    this.repository = repository;
    this.loginUser = loginUser;
  }

  login = async (args: { email: string; password: string }) => {
    try {
      this.startLoader();
      const user = await this.repository.login(args);
      this._updateCredential(user);
      return user;
    } catch (e) {
      console.error(e);
      return undefined;
    } finally {
      this.stopLoader();
    }
  };

  getGoogleLoginUrl = async () => {
    try {
      this.startLoader();
      return await this.repository.getGoogleLoginUrl();
    } finally {
      this.stopLoader();
    }
  };

  loginWithGoogle = async (args: { code: string }) => {
    try {
      this.startLoader();
      const user = await this.repository.loginWithGoogle(args);
      this._updateCredential(user);
      return user;
    } finally {
      this.stopLoader();
    }
  };

  _updateCredential = (user: UserVo | undefined) => {
    if (user) {
      Credentials.setToken(user.apiToken);
      Credentials.setWorkspaceId(user.workspaces[0].id);
      this.loginUser.set(user);
    }
  };
}

export default LoginUseCaseImpl;
