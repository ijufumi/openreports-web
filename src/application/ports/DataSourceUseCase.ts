import DataSourcesVo from "../dto/vos/responses/DataSourcesVo"
import DataSourceVo from "../dto/vos/responses/DataSourceVo"
import DriverTypeVo from "../dto/vos/responses/DriverTypeVo"
import CreateDataSourceVo from "../dto/vos/requests/CreateDataSourceVo"
import GetDataSourcesVo from "../dto/vos/requests/GetDataSourcesVo"
import IdVo from "../dto/vos/requests/IdVo"
import UpdateDataSourceVo from "../dto/vos/requests/UpdateDataSourceVo"

export default interface DataSourceUseCase {
  gets(args: GetDataSourcesVo): Promise<DataSourcesVo | undefined>

  getById(args: IdVo): Promise<DataSourceVo | undefined>

  register(args: CreateDataSourceVo): Promise<DataSourceVo | undefined>

  update(args: UpdateDataSourceVo): Promise<DataSourceVo | undefined>

  delete(args: IdVo): Promise<boolean>

  getDriverTypes(): Promise<Array<DriverTypeVo>>
}
