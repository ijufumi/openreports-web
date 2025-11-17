import DataSourcesVo from "../../application/dto/vos/responses/DataSourcesVo"
import DataSourceVo from "../../application/dto/vos/responses/DataSourceVo"
import CreateDataSourceVo from "../../application/dto/vos/requests/CreateDataSourceVo"
import UpdateDataSourceVo from "../../application/dto/vos/requests/UpdateDataSourceVo"
import GetDataSourcesVo from "../../application/dto/vos/requests/GetDataSourcesVo"
import IdVo from "../../application/dto/vos/requests/IdVo"

export default interface DataSourceRepository {
  gets(args: GetDataSourcesVo): Promise<DataSourcesVo>

  getById(args: IdVo): Promise<DataSourceVo>

  register(args: CreateDataSourceVo): Promise<DataSourceVo>

  update(args: UpdateDataSourceVo): Promise<DataSourceVo>

  delete(args: IdVo): Promise<void>
}
