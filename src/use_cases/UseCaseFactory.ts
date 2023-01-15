import LoginUseCaseImpl from "./impl/LoginUseCaseImpl";
import MembersUseCaseImpl from "./impl/MembersUseCaseImpl";
import ReportsUseCaseImpl from "./impl/ReportsUseCaseImpl";
import ReportsUseCase from "./ReportsUseCase";
import MembersUseCase from "./MembersUseCase";
import LoginUseCase from "./LoginUseCase";
import useLoginUser from "../states/LoginUser";
import RepositoryFactory from "../repositories/RepositoryFactory";

const loginRepository = RepositoryFactory.createLoginRepository();
const memberRepository = RepositoryFactory.createMemberRepository();
const reportRepository = RepositoryFactory.createReportRepository();
const templateRepository = RepositoryFactory.createTemplateRepository();
const loginUser = useLoginUser();

class UseCaseFactory {
  static createLoginUseCase(): LoginUseCase {
    return new LoginUseCaseImpl(loginRepository, loginUser);
  }
  static createMembersUseCase(): MembersUseCase {
    return new MembersUseCaseImpl(memberRepository, loginUser);
  }
  static createReportsUseCase(): ReportsUseCase {
    return new ReportsUseCaseImpl(reportRepository, templateRepository);
  }
}

export default UseCaseFactory;
