interface Props {
  url: string;
}

export default class GoogleAuthUrl {
  readonly url: string;

  constructor(props: Props) {
    this.url = props.url;
  }
}
