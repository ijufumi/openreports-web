import DateUtil from "../components/utils/DateUtil";

export interface Props {
  id: string;
  name: string;
  filePath: string;
  createdAt: number;
  updatedAt: number;
}

export default class ReportTemplateVo {
  readonly id: string;
  readonly name: string;
  readonly filePath: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.filePath = props.filePath;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get formattedCreatedAt() {
    return DateUtil.format(this.createdAt);
  }

  get formattedUpdatedAt() {
    return DateUtil.format(this.updatedAt);
  }
}
