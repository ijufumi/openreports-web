interface Props {
  id: string
  name: string
  jdbcDriverClass: string
}

export default class DriverTypeVo {
  readonly id: string
  readonly name: string
  readonly jdbcDriverClass: string

  constructor(props: Props) {
    this.id = props.id
    this.name = props.name
    this.jdbcDriverClass = props.jdbcDriverClass
  }
}
