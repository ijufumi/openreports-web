import DataSourcesVo from "../vos/responses/DataSourcesVo"
import DataSourceVo from "../vos/responses/DataSourceVo"

export default interface DataSourceRepository {
  gets(args: { page: number; limit: number }): Promise<DataSourcesVo>

  getById(args: { id: string }): Promise<DataSourceVo>

  register(args: {
    name: string
    url: string
    username: string
    password: string
    driverTypeId: string
  }): Promise<DataSourceVo>

  update(args: {
    id: string
    name: string
    url: string
    username: string
    password: string
    driverTypeId: string
  }): Promise<DataSourceVo>

  delete(args: { id: string }): Promise<void>
}
