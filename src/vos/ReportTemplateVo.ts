import DateUtils from "../components/utils/DateUtils";

export interface Props {
  id: string;
  name: string;
  filePath: string;
  storageType: string;
  fileSize: number;
  createdAt: number;
  updatedAt: number;
}

export default class ReportTemplateVo {
  readonly id: string;
  readonly name: string;
  readonly filePath: string;
  readonly storageType: string;
  readonly fileSize: number;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.filePath = props.filePath;
    this.storageType = props.storageType;
    this.fileSize = props.fileSize;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get formattedCreatedAt() {
    return DateUtils.format(this.createdAt);
  }

  get formattedUpdatedAt() {
    return DateUtils.format(this.updatedAt);
  }
}
