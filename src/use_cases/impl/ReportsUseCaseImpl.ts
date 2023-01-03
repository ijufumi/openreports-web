import ReportsUseCase from "../ReportsUseCase";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import ReportsRepository from "../../repositories/ReportsRepository";
import TemplatesRepository from "../../repositories/TemplatesRepository";
import UseCaseBase from "./UseCaseBase";

export default class ReportsUseCaseImpl
  extends UseCaseBase
  implements ReportsUseCase
{
  private reportsRepository: ReportsRepository;
  private templatesRepository: TemplatesRepository;

  constructor() {
    super();
    this.reportsRepository = RepositoryFactory.createReportRepository();
    this.templatesRepository = RepositoryFactory.createTemplateRepository();
  }

  reports = async (page: number, limit: number, templateId?: string) => {
    try {
      this.startLoader();
      return await this.reportsRepository.getsByFilter({
        page,
        limit,
        templateId,
      });
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

  templates = async (page: number, limit: number) => {
    try {
      this.startLoader();
      return await this.templatesRepository.getAll({ page, limit });
    } finally {
      this.stopLoader();
    }
  };

  template = async (id: string) => {
    try {
      this.startLoader();
      return await this.templatesRepository.getById({ id });
    } finally {
      this.stopLoader();
    }
  };

  registerTemplate = async (name: string, file: File) => {
    try {
      this.startLoader();
      return await this.templatesRepository.register({ name, file });
    } catch (e) {
      console.error(e);
      return undefined;
    } finally {
      this.stopLoader();
    }
  };

  updateTemplate = async (id: string, name: string) => {
    try {
      this.startLoader();
      return await this.templatesRepository.update({ id, name });
    } catch (e) {
      console.error(e);
      return undefined;
    } finally {
      this.stopLoader();
    }
  };

  deleteTemplate = async (id: string) => {
    try {
      this.startLoader();
      return await this.templatesRepository.delete({ id });
    } catch (e) {
      console.error(e);
    } finally {
      this.stopLoader();
    }
  };
}
