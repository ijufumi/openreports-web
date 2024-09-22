interface Props {
  url: string
}

export default class GoogleAuthUrlVo {
  readonly url: string

  constructor(props: Props) {
    this.url = props.url
  }
}
