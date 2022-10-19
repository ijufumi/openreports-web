import ReportTemplateVo from "./ReportTemplateVo";

export interface ListProps {
  items: Array<any>;

  offset: number;

  limit: number;

  count: number;
}

export abstract class ListVo {
  items: Array<any>;

  offset: number;

  limit: number;

  count: number;

  constructor(props: ListProps) {
    this.offset = props.offset;
    this.limit = props.limit;
    this.count = props.count;
    this.items = this.getItems(props);
  }

  abstract getItems(props: ListProps): Array<any>;
}
