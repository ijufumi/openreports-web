export interface Props {
  id: string;
  name: string;
  reportTemplateName: string;
}

export default class ReportVo {
  id: string;
  name: string;
  reportTemplateName: string;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.reportTemplateName = props.reportTemplateName;
  }
}
