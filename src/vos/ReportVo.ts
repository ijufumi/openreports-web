import DateUtil from "../components/utils/DateUtil";

export interface Props {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  reportTemplateName: string;
}

export default class ReportVo {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  reportTemplateName: string;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.reportTemplateName = props.reportTemplateName;
  }

  get formattedCreatedAt() {
    return DateUtil.format(this.createdAt);
  }

  get formattedUpdatedAt() {
    return DateUtil.format(this.updatedAt);
  }
}
