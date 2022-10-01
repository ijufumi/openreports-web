import LoginUseCaseImpl from "./impl/LoginUseCaseImpl";
import MembersUseCaseImpl from "./impl/MembersUseCaseImpl";
import ReportsUseCaseImpl from "./impl/ReportsUseCaseImpl";

class UseCaseFactory {
  static createLoginUseCase = () => {
    return new LoginUseCaseImpl();
  };
  static createMembersUseCase = () => {
    return new MembersUseCaseImpl();
  };
  static createReportsUseCase = () => {
    return new ReportsUseCaseImpl();
  };
}

export default UseCaseFactory;
