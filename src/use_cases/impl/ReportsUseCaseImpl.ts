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

  reports = async (args: {
    page: number;
    limit: number;
    templateId?: string;
  }) => {
    try {
      this.startLoader();
      return await this.reportsRepository.getsByFilter(args);
    } finally {
      this.stopLoader();
    }
  };

  report = async (args: { id: string }) => {
    try {
      this.startLoader();
      return await this.reportsRepository.getById(args);
    } finally {
      this.stopLoader();
    }
  };

  outputReport = async (args: { id: string }) => {
    try {
      this.startLoader();
      return await this.reportsRepository.output(args);
    } finally {
      this.stopLoader();
    }
  };

  deleteReport = async (args: { id: string }) => {
    try {
      this.startLoader();
      return await this.reportsRepository.delete(args);
    } finally {
      this.stopLoader();
    }
  };

  updateReport = async (args: {
    id: string;
    name: string;
    templateId: string;
  }) => {
    try {
      this.startLoader();
      return await this.reportsRepository.update(args);
    } finally {
      this.stopLoader();
    }
  };

  templates = async (args: { page: number; limit: number }) => {
    try {
      this.startLoader();
      return await this.templatesRepository.getAll(args);
    } finally {
      this.stopLoader();
    }
  };

  template = async (args: { id: string }) => {
    try {
      this.startLoader();
      return await this.templatesRepository.getById(args);
    } finally {
      this.stopLoader();
    }
  };

  registerTemplate = async (args: { name: string; file: File }) => {
    try {
      this.startLoader();
      return await this.templatesRepository.register(args);
    } catch (e) {
      console.error(e);
      return undefined;
    } finally {
      this.stopLoader();
    }
  };

  updateTemplate = async (args: { id: string; name: string }) => {
    try {
      this.startLoader();
      return await this.templatesRepository.update(args);
    } catch (e) {
      console.error(e);
      return undefined;
    } finally {
      this.stopLoader();
    }
  };

  deleteTemplate = async (args: { id: string }) => {
    try {
      this.startLoader();
      await this.templatesRepository.delete(args);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      this.stopLoader();
    }
  };
}
