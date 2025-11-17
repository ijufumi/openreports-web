import BaseUseCase from "./BaseUseCase"
import DataSourceUseCase from "../ports/DataSourceUseCase"
import DataSourceRepository from "../../domain/repositories/DataSourceRepository"
import DriverTypeRepository from "../../domain/repositories/DriverTypeRepository"
import DriverTypeVo from "../dto/vos/responses/DriverTypeVo"
import { LoginUser } from "../../infrastructure/state/LoginUser"
import CreateDataSourceVo from "../dto/vos/requests/CreateDataSourceVo"
import UpdateDataSourceVo from "../dto/vos/requests/UpdateDataSourceVo"
import GetDataSourcesVo from "../dto/vos/requests/GetDataSourcesVo"
import IdVo from "../dto/vos/requests/IdVo"

export default class DataSourceUseCaseImpl
  extends BaseUseCase
  implements DataSourceUseCase
{
  private readonly repository: DataSourceRepository
  private readonly driverTypeRepository: DriverTypeRepository

  constructor(
    repository: DataSourceRepository,
    driverTypeRepository: DriverTypeRepository
  ) {
    super(null)
    this.repository = repository
    this.driverTypeRepository = driverTypeRepository
  }

  delete = async (args: IdVo) => {
    try {
      await this.repository.delete(args)
      return true
    } catch (e) {
      console.error(e)
    }
    return false
  }

  getById = async (args: IdVo) => {
    try {
      return this.repository.getById(args)
    } catch (e) {
      console.error(e)
    }
    return undefined
  }

  gets = async (args: GetDataSourcesVo) => {
    try {
      this.startLoader()
      return this.repository.gets(args)
    } catch (e) {
      console.error(e)
    } finally {
      this.stopLoader()
    }
    return undefined
  }

  register = async (args: CreateDataSourceVo) => {
    try {
      return this.repository.register(args)
    } catch (e) {
      console.error(e)
    }
    return undefined
  }

  update = async (args: UpdateDataSourceVo) => {
    try {
      return this.repository.update(args)
    } catch (e) {
      console.error(e)
    }
    return undefined
  }

  getDriverTypes = async () => {
    const result = await this.driverTypeRepository.getAll()
    return result.map((v) => new DriverTypeVo(v))
  }
}
