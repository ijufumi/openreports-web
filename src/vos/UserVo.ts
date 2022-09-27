interface Props {
  id: string;
  email: string;
  name: string;
  apiToken: string;
}

export default class UserVo {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly apiToken: string;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.apiToken = props.apiToken;
  }
}
