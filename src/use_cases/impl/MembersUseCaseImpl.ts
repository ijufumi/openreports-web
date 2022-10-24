import MembersUseCase from "../MembersUseCase";
import MembersRepository from "../../repositories/MembersRepository";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import credentials from "../../states/Credentials";
import useLoginUser from "../../states/LoginUser";
import UserVo from "../../vos/UserVo";

class MembersUseCaseImpl implements MembersUseCase {
  private repository: MembersRepository;
  private loginUser;

  constructor() {
    this.repository = RepositoryFactory.createMemberRepository();
    this.loginUser = useLoginUser();
  }

  logout = async () => {
    await this.repository.logout();
    credentials.removeToken();
    credentials.removeWorkspaceId();
    this.loginUser.clear();
  };

  isLoggedIn = async () => {
    if (!credentials.hasToken()) {
      return false;
    }
    const user = await this.repository.status();
    if (!user) {
      return false;
    }
    this._updateCredential(user);
    return true;
  };

  _updateCredential = (user: UserVo | undefined) => {
    if (user) {
      credentials.setToken(user.apiToken);
      credentials.setWorkspaceId(user.workspaces[0].id);
      this.loginUser.set(user);
    }
  };
}

export default MembersUseCaseImpl;
