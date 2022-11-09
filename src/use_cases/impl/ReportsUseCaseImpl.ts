import ReportsUseCase from "../ReportsUseCase";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import ReportsRepository from "../../repositories/ReportsRepository";
import ReportTemplatesRepository from "../../repositories/ReportTemplatesRepository";

export default class ReportsUseCaseImpl implements ReportsUseCase {
  private reportsRepository: ReportsRepository;
  private reportTemplatesRepository: ReportTemplatesRepository;

  constructor() {
    this.reportsRepository = RepositoryFactory.createReportRepository();
    this.reportTemplatesRepository =
      RepositoryFactory.createReportTemplateRepository();
  }

  reports = async (page: number, limit: number) => {
    return await this.reportsRepository.getAll({ page, limit });
  };

  report = async (id: string) => {
    return await this.reportsRepository.getById({ id });
  };

  outputReport = async (id: string) => {
    return await this.reportsRepository.output({ id });
  };

  updateReport = async (id: string, name: string, reportTemplateId: string) => {
    return await this.reportsRepository.update({ id, name, reportTemplateId });
  };

  reportTemplates = async (page: number, limit: number) => {
    return await this.reportTemplatesRepository.getAll({ page, limit });
  };

  reportTemplate = async (id: string) => {
    return await this.reportTemplatesRepository.getById({ id });
  };
}
