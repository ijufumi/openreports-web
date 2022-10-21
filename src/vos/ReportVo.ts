import DateUtil from "../components/utils/DateUtil";

export interface Props {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  reportTemplateId: string;
  reportTemplateName: string;
}

export default class ReportVo {
  readonly id: string;
  readonly name: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly reportTemplateId: string;
  readonly reportTemplateName: string;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.reportTemplateId = props.reportTemplateId;
    this.reportTemplateName = props.reportTemplateName;
  }

  get formattedCreatedAt() {
    return DateUtil.format(this.createdAt);
  }

  get formattedUpdatedAt() {
    return DateUtil.format(this.updatedAt);
  }
}
