import DateUtils from "../../../infrastructure/utils/date/DateUtils"

export interface Props {
  id: string
  name: string
  createdAt: number
  updatedAt: number
}

export default class ReportGroupVo {
  readonly id: string
  readonly name: string
  readonly createdAt: number
  readonly updatedAt: number

  constructor(props: Props) {
    this.id = props.id
    this.name = props.name
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  get formattedCreatedAt() {
    return DateUtils.format(this.createdAt)
  }

  get formattedUpdatedAt() {
    return DateUtils.format(this.updatedAt)
  }
}
