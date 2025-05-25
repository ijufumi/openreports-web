export default class FileVo {
  readonly blob: Blob
  readonly filename: string
  constructor(blob: Blob, filename: string) {
    this.blob = blob
    this.filename = filename
  }
}