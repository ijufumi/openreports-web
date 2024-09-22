export interface ListProps {
  items: Array<any>

  offset: number

  limit: number

  count: number
}

export abstract class ListVo {
  abstract items: Array<any>

  offset: number

  limit: number

  count: number

  protected constructor(props: ListProps) {
    this.offset = props.offset
    this.limit = props.limit
    this.count = props.count
  }

  abstract getItems(props: ListProps): Array<any>
}
