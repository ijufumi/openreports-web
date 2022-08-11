interface UserVoProps {
  username: string;
}

export default class UserVo {
  readonly username: string;

  constructor(props: UserVoProps) {
    this.username = props.username;
  }
}
