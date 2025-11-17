import DateUtils from "../../../infrastructure/utils/date/DateUtils"
import DriverTypeVo from "./DriverTypeVo"

export interface Props {
  id: string
  name: string
  url: string
  username: string
  password: string
  driverTypeId: string
  driverTypeName: string
  driverType: DriverTypeVo
  createdAt: number
  updatedAt: number
}

export default class DataSourceVo {
  readonly id: string
  readonly name: string
  readonly url: string
  readonly username: string
  readonly password: string
  readonly driverTypeId: string
  readonly driverTypeName: string
  readonly createdAt: number
  readonly updatedAt: number

  constructor(prop: Props) {
    this.id = prop.id
    this.name = prop.name
    this.url = prop.url
    this.username = prop.username
    this.password = prop.password
    this.driverTypeId = prop.driverTypeId
    this.driverTypeName = prop.driverType?.name
    this.createdAt = prop.createdAt
    this.updatedAt = prop.updatedAt
  }

  get formattedCreatedAt() {
    return DateUtils.format(this.createdAt)
  }

  get formattedUpdatedAt() {
    return DateUtils.format(this.updatedAt)
  }
}
