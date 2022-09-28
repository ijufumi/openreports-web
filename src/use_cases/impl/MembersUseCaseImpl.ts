import MembersUseCase from "../MembersUseCase";
import MembersRepository from "../../repositories/MembersRepository";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import credentials from "../../states/Credentials";

class MembersUseCaseImpl implements MembersUseCase {
  private repository: MembersRepository;

  constructor() {
    this.repository = RepositoryFactory.createMemberRepository();
  }

  logout = async () => {
    await this.repository.logout();
    credentials.removeToken();
  };

  isLoggedIn = async () => {
    if (!credentials.hasToken()) {
      return false;
    }
    const user = await this.repository.status();
    if (!user) {
      return false;
    }
    credentials.setToken(user.apiToken);
    return true;
  };
}

export default MembersUseCaseImpl;
