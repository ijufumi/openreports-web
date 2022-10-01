import ReportsUseCase from "../ReportsUseCase";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import ReportsRepository from "../../repositories/ReportsRepository";

export default class ReportsUseCaseImpl implements ReportsUseCase {
  private repository: ReportsRepository;

  constructor() {
    this.repository = RepositoryFactory.createReportRepository();
  }
  reports = async () => {
    return await this.repository.reports();
  };
}
