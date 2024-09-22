import DataSourcesVo from "../vos/responses/DataSourcesVo"
import DataSourceVo from "../vos/responses/DataSourceVo"
import CreateDataSourceVo from "../vos/requests/CreateDataSourceVo"
import UpdateDataSourceVo from "../vos/requests/UpdateDataSourceVo"
import GetDataSourcesVo from "../vos/requests/GetDataSourcesVo"
import IdVo from "../vos/requests/IdVo"

export default interface DataSourceRepository {
  gets(args: GetDataSourcesVo): Promise<DataSourcesVo>

  getById(args: IdVo): Promise<DataSourceVo>

  register(args: CreateDataSourceVo): Promise<DataSourceVo>

  update(args: UpdateDataSourceVo): Promise<DataSourceVo>

  delete(args: IdVo): Promise<void>
}
