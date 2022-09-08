import LoginUseCaseImpl from "./impl/LoginUseCaseImpl";

class UseCaseFactory {
  static createLoginUseCase = () => {
    return new LoginUseCaseImpl();
  };
}

export default UseCaseFactory;
