import ReportsUseCase from "../ReportsUseCase";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import ReportsRepository from "../../repositories/ReportsRepository";

export default class ReportsUseCaseImpl implements ReportsUseCase {
  private repository: ReportsRepository;

  constructor() {
    this.repository = RepositoryFactory.createReportRepository();
  }
  reports = async (page: number, limit: number) => {
    return await this.repository.reports({ page, limit });
  };

  report = async (id: string) => {
    return await this.repository.report({ id });
  };
}
