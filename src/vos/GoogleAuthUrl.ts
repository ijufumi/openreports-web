interface GoogleAuthUrlProps {
  url: string;
}

export default class GoogleAuthUrl {
  readonly url: string;

  constructor(props: GoogleAuthUrlProps) {
    this.url = props.url;
  }
}
