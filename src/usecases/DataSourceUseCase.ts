import DataSourcesVo from "../vos/responses/DataSourcesVo"
import DataSourceVo from "../vos/responses/DataSourceVo"
import DriverTypeVo from "../vos/responses/DriverTypeVo"
import CreateDataSourceVo from "../vos/requests/CreateDataSourceVo"
import GetDataSourcesVo from "../vos/requests/GetDataSourcesVo"
import IdVo from "../vos/requests/IdVo"
import UpdateDataSourceVo from "../vos/requests/UpdateDataSourceVo"

export default interface DataSourceUseCase {
  gets(args: GetDataSourcesVo): Promise<DataSourcesVo | undefined>

  getById(args: IdVo): Promise<DataSourceVo | undefined>

  register(args: CreateDataSourceVo): Promise<DataSourceVo | undefined>

  update(args: UpdateDataSourceVo): Promise<DataSourceVo | undefined>

  delete(args: IdVo): Promise<boolean>

  getDriverTypes(): Promise<Array<DriverTypeVo>>
}
