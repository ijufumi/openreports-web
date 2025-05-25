import Credentials from "../../states/Credentials"
import {
  UnexpectedError,
  ClientError,
  ServerError,
} from "../../components/errors"
import FileVo from "../../vos/responses/FileVo"

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
    hasResponse?: boolean
  }) => {
    return await this._request(
      Methods.Get,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers,
      false,
      args.hasResponse
    )
  }

  _delete = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
  }) => {
    return await this._request(
      Methods.Delete,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers,
      false,
      true
    )
  }

  _post = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    body?: object
    form?: boolean
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
      true
    )
  }

  _put = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    body?: object
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
      true
    )
  }

  _download = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
  }) => {
    return await this._request(
      Methods.Get,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers,
      true,
      false
    )
  }

  _upload = async (args: {
    path: string
    auth?: boolean
    headers?: Record<string, string>
    body: FormData
  }) => {
    return await this._request(
      Methods.Post,
      this.apiEndpoint,
      args.path,
      args.auth,
      args.body,
      Object.assign({}, args.headers ? args.headers : {}),
      false,
      false
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
    responseAsJson?: boolean
  ) => {
    let baseHeaders = {}
    if (!!auth || this.needsAuth) {
      baseHeaders = {
        Authorization: `Bearer ${Credentials.getToken()}`,
        "X-Workspace-Id": Credentials.getWorkspaceId(),
        "X-Refresh-Token": Credentials.getRefreshToken(),
      }
    }

    let bodyData = undefined
    if (body) {
      bodyData = body.isPrototypeOf(FormData)
        ? (body as FormData)
        : JSON.stringify(body)
    }
    let filename = ""
    const responseData = await fetch(`${apiEndpoint}${path}`, {
      method: method.toString(),
      headers: Object.assign(baseHeaders, header ? header : {}),
      cache: "no-cache",
      mode: "cors",
      body: bodyData,
    })
      .catch((e) => {
        throw new UnexpectedError(`No response error with ${e}`)
      })
      .then((response) => {
        if (response.ok) {
          let apiToken = null
          let refreshToken = null
          response.headers.forEach((v, k) => {
            if (k === "x-api-token") {
              apiToken = v
            } else if (k === "x-refresh-token") {
              refreshToken = v
            } else if (k === "content-disposition") {
              const disposition = v.split(";")
              if (disposition.length > 1) {
                filename = disposition[1].split("=")[1]
              }
            }
          })

          if (!!apiToken) {
            Credentials.setToken(apiToken)
          }
          if (!!refreshToken) {
            Credentials.setRefreshToken(refreshToken)
          }

          if (!!responseAsBlob) {
            return response.blob()
          }

          if (!!responseAsJson) {
            return response.json()
          }
          return undefined
        }
        if (response.status < 500) {
          throw new ClientError(`ClientError with ${response.statusText}`)
        }
        throw new ServerError(`ServerError with ${response.statusText}`)
      })

    if (!!responseAsBlob) {
      return {
        blob: responseData as Blob,
        filename,
      } as FileVo
    }
    return responseData
  }
}

export default BaseRepository
