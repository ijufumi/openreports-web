export interface ListProps<T> {
  items: Array<T>

  offset: number

  limit: number

  count: number
}

export abstract class ListVo<P, C> {
  abstract items: Array<C>

  offset: number

  limit: number

  count: number

  protected constructor(props: ListProps<P>) {
    this.offset = props.offset
    this.limit = props.limit
    this.count = props.count
  }

  abstract getItems(props: ListProps<P>): Array<C>
}
