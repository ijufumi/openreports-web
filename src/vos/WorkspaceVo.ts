export interface Props {
  id: string;
  name: string;
}

export default class WorkspaceVo {
  readonly id: string;
  readonly name: string;

  constructor({ id, name }: Props) {
    this.id = id;
    this.name = name;
  }
}
