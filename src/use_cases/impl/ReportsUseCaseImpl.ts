import ReportsUseCase from "src/use_cases/ReportsUseCase";
import ReportsRepository from "src/repositories/ReportsRepository";
import TemplatesRepository from "src/repositories/TemplatesRepository";
import BaseUseCase from "./BaseUseCase";

export default class ReportsUseCaseImpl
  extends BaseUseCase
  implements ReportsUseCase
{
  private readonly reportsRepository: ReportsRepository;
  private readonly templatesRepository: TemplatesRepository;

  constructor(
    reportsRepository: ReportsRepository,
    templatesRepository: TemplatesRepository
  ) {
    super();
    this.reportsRepository = reportsRepository;
    this.templatesRepository = templatesRepository;
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
      await this.templatesRepository.delete({ id });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      this.stopLoader();
    }
  };
}
