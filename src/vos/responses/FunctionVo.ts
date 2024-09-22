export enum ActionType {
  Create = "create",
  Update = "update",
  Delete = "delete",
  Reference = "reference",
}

export interface Props {
  resource: string
  action: ActionType
}

export default class FunctionVo {
  readonly resource: string
  readonly action: ActionType

  constructor(props: Props) {
    this.resource = props.resource
    this.action = props.action
  }
}
