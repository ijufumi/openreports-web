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
    try {
      this.startLoader();
      return await this.reportsRepository.getById({ id });
    } finally {
      this.stopLoader();
    }
  };

  outputReport = async (id: string) => {
    try {
      this.startLoader();
      return await this.reportsRepository.output({ id });
    } finally {
      this.stopLoader();
    }
  };

  deleteReport = async (id: string) => {
    try {
      this.startLoader();
      return await this.reportsRepository.delete({ id });
    } finally {
      this.stopLoader();
    }
  };

  updateReport = async (id: string, name: string, reportTemplateId: string) => {
    try {
      this.startLoader();
      return await this.reportsRepository.update({
        id,
        name,
        reportTemplateId,
      });
    } finally {
      this.stopLoader();
    }
  };

  reportTemplates = async (page: number, limit: number) => {
    try {
      this.startLoader();
      return await this.reportTemplatesRepository.getAll({ page, limit });
    } finally {
      this.stopLoader();
    }
  };

  reportTemplate = async (id: string) => {
    try {
      this.startLoader();
      return await this.reportTemplatesRepository.getById({ id });
    } finally {
      this.stopLoader();
    }
  };
}
