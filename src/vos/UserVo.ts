interface Props {
  username: string;
}

export default class UserVo {
  readonly username: string;

  constructor(props: Props) {
    this.username = props.username;
  }
}
