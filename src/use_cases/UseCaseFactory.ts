import LoginUseCaseImpl from "./impl/LoginUseCaseImpl";
import MembersUseCaseImpl from "./impl/MembersUseCaseImpl";
import ReportsUseCaseImpl from "./impl/ReportsUseCaseImpl";
import ReportsUseCase from "./ReportsUseCase";
import MembersUseCase from "./MembersUseCase";
import LoginUseCase from "./LoginUseCase";

class UseCaseFactory {
  static createLoginUseCase(): LoginUseCase {
    return new LoginUseCaseImpl();
  }
  static createMembersUseCase(): MembersUseCase {
    return new MembersUseCaseImpl();
  }
  static createReportsUseCase(): ReportsUseCase {
    return new ReportsUseCaseImpl();
  }
}

export default UseCaseFactory;
