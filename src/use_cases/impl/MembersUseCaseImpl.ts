import MembersUseCase from "../MembersUseCase";
import MembersRepository from "../../repositories/MembersRepository";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import credentials from "../../states/Credentials";
import useLoginUser from "../../states/LoginUser";
import User from "../../vos/User";
import UseCaseBase from "./UseCaseBase";

class MembersUseCaseImpl extends UseCaseBase implements MembersUseCase {
  private repository: MembersRepository;
  private loginUser;

  constructor() {
    super();
    this.repository = RepositoryFactory.createMemberRepository();
    this.loginUser = useLoginUser();
  }

  logout = async () => {
    try {
      await this.repository.logout();
    } catch (e) {
      console.error(e);
    }
    credentials.removeToken();
    credentials.removeWorkspaceId();
    this.loginUser.clear();
  };

  isLoggedIn = async () => {
    try {
      if (!credentials.hasToken()) {
        return false;
      }
      const user = await this.repository.status();
      if (!user) {
        return false;
      }
      this._updateCredential(user);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  _updateCredential = (user: User | undefined) => {
    if (user) {
      credentials.setToken(user.apiToken);
      credentials.setWorkspaceId(user.workspaces[0].id);
      this.loginUser.set(user);
    }
  };
}

export default MembersUseCaseImpl;
