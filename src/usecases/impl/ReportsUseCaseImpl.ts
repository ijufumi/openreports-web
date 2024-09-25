import ReportsUseCase from "../ReportsUseCase"
import ReportRepository from "../../repositories/ReportRepository"
import TemplatesRepository from "src/repositories/TemplatesRepository"
import BaseUseCase from "./BaseUseCase"
import { LoginUser } from "../../states/LoginUser"
import GetReportsVo from "../../vos/requests/GetReportsVo"
import IdVo from "../../vos/requests/IdVo"
import UpdateReportVo from "../../vos/requests/UpdateReportVo"

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

  outputReport = async (args: IdVo) => {
    try {
      this.startLoader()
      return await this.reportsRepository.output(args)
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

  updateReport = async (args: UpdateReportVo) => {
    try {
      this.startLoader()
      return await this.reportsRepository.update(args)
    } finally {
      this.stopLoader()
    }
  }

  templates = async (args: { page: number; limit: number }) => {
    try {
      this.startLoader()
      return await this.templatesRepository.getAll(args)
    } finally {
      this.stopLoader()
    }
  }

  template = async (args: { id: string }) => {
    try {
      this.startLoader()
      return await this.templatesRepository.getById(args)
    } finally {
      this.stopLoader()
    }
  }

  registerTemplate = async (args: { name: string; file: File }) => {
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

  updateTemplate = async (args: { id: string; name: string }) => {
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

  deleteTemplate = async (args: { id: string }) => {
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
}
