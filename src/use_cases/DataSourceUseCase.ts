import DataSourcesVo from "../vos/DataSources";
import DataSourceVo from "../vos/DataSourceVo";

export default interface DataSourceUseCase {
  gets(args: {
    page: number;
    limit: number;
  }): Promise<DataSourcesVo | undefined>;

  getById(args: { id: string }): Promise<DataSourceVo | undefined>;

  register(args: {
    name: string;
    url: string;
    username: string;
    password: string;
    driverTypeId: string;
  }): Promise<DataSourceVo | undefined>;

  update(args: {
    id: string;
    name: string;
    url: string;
    username: string;
    password: string;
    driverTypeId: string;
  }): Promise<DataSourceVo | undefined>;

  delete(args: { id: string }): Promise<boolean>;
}
