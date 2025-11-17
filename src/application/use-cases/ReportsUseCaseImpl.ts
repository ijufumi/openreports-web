import ReportsUseCase from "../ports/ReportsUseCase"
import ReportRepository from "../../domain/repositories/ReportRepository"
import TemplatesRepository from "../../domain/repositories/TemplatesRepository"
import BaseUseCase from "./BaseUseCase"
import { LoginUser } from "../../infrastructure/state/LoginUser"
import GetReportsVo from "../dto/vos/requests/GetReportsVo"
import IdVo from "../dto/vos/requests/IdVo"
import UpdateReportVo from "../dto/vos/requests/UpdateReportVo"
import GetTemplatesVo from "../dto/vos/requests/GetTemplatesVo"
import CreateTemplateVo from "../dto/vos/requests/CreateTemplateVo"
import UpdateTemplateVo from "../dto/vos/requests/UpdateTemplateVo"
import CreateReportVo from "../dto/vos/requests/CreateReportVo"
import ReportVo from "../dto/vos/responses/ReportVo"

export default class ReportsUseCaseImpl
  extends BaseUseCase
  implements ReportsUseCase
{
  private readonly reportsRepository: ReportRepository
  private readonly templatesRepository: TemplatesRepository

  constructor(
    reportsRepository: ReportRepository,
    templatesRepository: TemplatesRepository
  ) {
    super(null)
    this.reportsRepository = reportsRepository
    this.templatesRepository = templatesRepository
  }

  reports = async (args: GetReportsVo) => {
    try {
      this.startLoader()
      return await this.reportsRepository.getsByFilter(args)
    } finally {
      this.stopLoader()
    }
  }

  report = async (args: IdVo) => {
    try {
      this.startLoader()
      return await this.reportsRepository.getById(args)
    } finally {
      this.stopLoader()
    }
  }

  registerReport = async (args: CreateReportVo) => {
    try {
      this.startLoader()
      return await this.reportsRepository.register(args)
    } catch (e) {
      console.error(e)
      return undefined
    } finally {
      this.stopLoader()
    }
  }

  updateReport = async (args: UpdateReportVo) => {
    try {
      this.startLoader()
      return await this.reportsRepository.update(args)
    } finally {
      this.stopLoader()
    }
  }

  deleteReport = async (args: IdVo) => {
    try {
      this.startLoader()
      return await this.reportsRepository.delete(args)
    } finally {
      this.stopLoader()
    }
  }

  templates = async (args: GetTemplatesVo) => {
    try {
      this.startLoader()
      return await this.templatesRepository.getAll(args)
    } finally {
      this.stopLoader()
    }
  }

  template = async (args: IdVo) => {
    try {
      this.startLoader()
      return await this.templatesRepository.getById(args)
    } finally {
      this.stopLoader()
    }
  }

  registerTemplate = async (args: CreateTemplateVo) => {
    try {
      this.startLoader()
      return await this.templatesRepository.register(args)
    } catch (e) {
      console.error(e)
      return undefined
    } finally {
      this.stopLoader()
    }
  }

  updateTemplate = async (args: UpdateTemplateVo) => {
    try {
      this.startLoader()
      return await this.templatesRepository.update(args)
    } catch (e) {
      console.error(e)
      return undefined
    } finally {
      this.stopLoader()
    }
  }

  deleteTemplate = async (args: IdVo) => {
    try {
      this.startLoader()
      await this.templatesRepository.delete(args)
      return true
    } catch (e) {
      console.error(e)
      return false
    } finally {
      this.stopLoader()
    }
  }

  outputReport = async (args: { id: string, asPDF?: boolean }) => {
    try {
      this.startLoader()
      return await this.reportsRepository.output(args)
    } finally {
      this.stopLoader()
    }
  }
}
