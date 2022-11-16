import LoginUseCase from "../LoginUseCase";
import LoginRepository from "../../repositories/LoginRepository";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import credentials from "../../states/Credentials";
import useLoginUser from "../../states/LoginUser";
import UserVo from "../../vos/UserVo";
import UseCaseBase from "./UseCaseBase";

class LoginUseCaseImpl extends UseCaseBase implements LoginUseCase {
  private repository: LoginRepository;
  private loginUser;

  constructor() {
    super();
    this.repository = RepositoryFactory.createLoginRepository();
    this.loginUser = useLoginUser();
  }

  login = async (args: { email: string; password: string }) => {
    try {
      this.startLoader();
      const user = await this.repository.login(args);
      this._updateCredential(user);
      return user;
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
      credentials.setToken(user.apiToken);
      credentials.setWorkspaceId(user.workspaces[0].id);
      this.loginUser.set(user);
    }
  };
}

export default LoginUseCaseImpl;
