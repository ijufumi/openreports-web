import DataSourcesVo from "../vos/responses/DataSourcesVo"
import DataSourceVo from "../vos/responses/DataSourceVo"
import CreateDataSourceVo from "../vos/requests/CreateDataSourceVo"
import UpdateDataSourceVo from "../vos/requests/UpdateDataSourceVo"

export default interface DataSourceRepository {
  gets(args: { page: number; limit: number }): Promise<DataSourcesVo>

  getById(args: { id: string }): Promise<DataSourceVo>

  register(args: CreateDataSourceVo): Promise<DataSourceVo>

  update(args: UpdateDataSourceVo): Promise<DataSourceVo>

  delete(args: { id: string }): Promise<void>
}
