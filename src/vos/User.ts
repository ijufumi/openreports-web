import Workspace, { Props as WorkspaceProps } from "./Workspace";

interface Props {
  id: string;
  email: string;
  name: string;
  apiToken: string;
  workspaces: Array<WorkspaceProps>;
}

export default class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly apiToken: string;
  readonly workspaces: Array<Workspace>;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.apiToken = props.apiToken;
    if (props.workspaces) {
      this.workspaces = props.workspaces.map((w) => new Workspace(w));
    } else {
      this.workspaces = [];
    }
  }
}
