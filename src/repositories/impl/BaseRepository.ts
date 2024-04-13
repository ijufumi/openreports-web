import credentials from "../../states/Credentials"
import {
  UnexpectedError,
  ClientError,
  ServerError,
} from "../../components/errors"

enum Methods {
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
}

abstract class BaseRepository {
  private readonly apiEndpoint: string
  private readonly needsAuth: boolean

  constructor(apiEndpoint: string, needsAuth = false) {
    this.apiEndpoint = apiEndpoint
    this.needsAuth = needsAuth
  }

  _get = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    afterCb?: (response: Response) => void
  }) => {
    return await this._request(
      Methods.Get,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers,
      false,
      true,
      args.afterCb
    )
  }

  _delete = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    afterCb?: (response: Response) => void
  }) => {
    return await this._request(
      Methods.Delete,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers,
      false,
      true,
      args.afterCb
    )
  }

  _post = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    body?: object
    afterCb?: (response: Response) => void
  }) => {
    const baseHeaders = { "Content-Type": "application/json;charset=utf-8" }
    return await this._request(
      Methods.Post,
      this.apiEndpoint,
      args.path,
      args.auth,
      args.body,
      Object.assign(baseHeaders, args.headers ? args.headers : {}),
      false,
      true,
      args.afterCb
    )
  }

  _put = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    body?: object
    afterCb?: (response: Response) => void
  }) => {
    const baseHeaders = { "Content-Type": "application/json;charset=utf-8" }
    return await this._request(
      Methods.Put,
      this.apiEndpoint,
      args.path,
      args.auth,
      args.body,
      Object.assign(baseHeaders, args.headers ? args.headers : {}),
      false,
      true,
      args.afterCb
    )
  }

  _download = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    afterCb?: (response: Response) => void
  }) => {
    return await this._request(
      Methods.Get,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers,
      true,
      false,
      args.afterCb
    )
  }

  _upload = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    body: FormData
    afterCb?: (response: Response) => void
  }) => {
    return await this._request(
      Methods.Post,
      this.apiEndpoint,
      args.path,
      args.auth,
      args.body,
      Object.assign({}, args.headers ? args.headers : {}),
      false,
      true,
      args.afterCb
    )
  }

  _request = async (
    method: Methods,
    apiEndpoint: string,
    path: string,
    auth?: boolean,
    body?: object | FormData,
    header?: Record<string, string>,
    responseAsBlob?: boolean,
    requestAsForm?: boolean,
    afterCb?: (response: Response) => void
  ) => {
    let baseHeaders = {}
    if (auth || this.needsAuth) {
      baseHeaders = {
        Authorization: `Bearer ${credentials.getToken()}`,
        "X-Workspace-Id": credentials.getWorkspaceId(),
      }
    }

    let bodyData = undefined
    if (body) {
      bodyData = requestAsForm ? (body as FormData) : JSON.stringify(body)
    }
    const response = await fetch(`${apiEndpoint}${path}`, {
      method: method.toString(),
      headers: Object.assign(baseHeaders, header ? header : {}),
      body: bodyData,
    }).catch((e) => {
      throw new UnexpectedError(`No response error with ${e}`)
    })

    if (response.ok) {
      if (responseAsBlob) {
        return response.blob()
      }
      if (afterCb) {
        afterCb(response)
      }
      return response.json()
    }
    if (response.status < 500) {
      throw new ClientError(`ClientError with ${response}`)
    }
    throw new ServerError(`ServerError with ${response}`)
  }
}

export default BaseRepository
