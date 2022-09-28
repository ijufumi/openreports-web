import LoginUseCaseImpl from "./impl/LoginUseCaseImpl";
import MembersUseCaseImpl from "./impl/MembersUseCaseImpl";

class UseCaseFactory {
  static createLoginUseCase = () => {
    return new LoginUseCaseImpl();
  };
  static createMembersUseCase = () => {
    return new MembersUseCaseImpl();
  };
}

export default UseCaseFactory;
