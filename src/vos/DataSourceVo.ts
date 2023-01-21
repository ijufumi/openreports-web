import DateUtils from "../components/utils/date/DateUtils";

export interface Props {
  id: string;
  name: string;
  url: string;
  username: string;
  password: string;
  driverTypeId: string;
  createdAt: number;
  updatedAt: number;
}

export default class DataSourceVo {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly username: string;
  readonly password: string;
  readonly driverTypeId: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(prop: Props) {
    this.id = prop.id;
    this.name = prop.name;
    this.url = prop.url;
    this.username = prop.username;
    this.password = prop.password;
    this.driverTypeId = prop.driverTypeId;
    this.createdAt = prop.createdAt;
    this.updatedAt = prop.updatedAt;
  }

  get formattedCreatedAt() {
    return DateUtils.format(this.createdAt);
  }

  get formattedUpdatedAt() {
    return DateUtils.format(this.updatedAt);
  }
}
