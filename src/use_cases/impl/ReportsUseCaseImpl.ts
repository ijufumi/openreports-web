import ReportsUseCase from "../ReportsUseCase";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import ReportsRepository from "../../repositories/ReportsRepository";
import ReportTemplatesRepository from "../../repositories/ReportTemplatesRepository";
import UseCaseBase from "./UseCaseBase";

export default class ReportsUseCaseImpl
  extends UseCaseBase
  implements ReportsUseCase
{
  private reportsRepository: ReportsRepository;
  private reportTemplatesRepository: ReportTemplatesRepository;

  constructor() {
    super();
    this.reportsRepository = RepositoryFactory.createReportRepository();
    this.reportTemplatesRepository =
      RepositoryFactory.createReportTemplateRepository();
  }

  reports = async (page: number, limit: number) => {
    try {
      this.startLoader();
      return await this.reportsRepository.getAll({ page, limit });
    } finally {
      this.stopLoader();
    }
  };

  report = async (id: string) => {
    return await this.reportsRepository.getById({ id });
  };

  outputReport = async (id: string) => {
    return await this.reportsRepository.output({ id });
  };

  deleteReport = async (id: string) => {
    return await this.reportsRepository.delete({ id });
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
