import credentials from "../states/Credentials";
import {
  UnexpectedError,
  ClientError,
  ServerError,
} from "../components/errors";

enum Methods {
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
}

abstract class BaseRepository {
  private readonly apiEndpoint: string;
  private readonly needsAuth: boolean;

  constructor(apiEndpoint: string, needsAuth = false) {
    this.apiEndpoint = apiEndpoint;
    this.needsAuth = needsAuth;
  }

  _get = async (args: {
    path: string;
    auth?: boolean;
    headers?: Record<string, string>;
  }) => {
    return await this._request(
      Methods.Get,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers
    );
  };

  _delete = async (args: {
    path: string;
    auth?: boolean;
    headers?: Record<string, string>;
  }) => {
    return await this._request(
      Methods.Delete,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers
    );
  };

  _post = async (args: {
    path: string;
    auth?: boolean;
    headers?: Record<string, string>;
    body?: object;
  }) => {
    const baseHeaders = { "Content-Type": "application/json;charset=utf-8" };
    return await this._request(
      Methods.Post,
      this.apiEndpoint,
      args.path,
      args.auth,
      args.body,
      Object.assign(baseHeaders, args.headers ? args.headers : {})
    );
  };

  _put = async (args: {
    path: string;
    auth?: boolean;
    headers?: Record<string, string>;
    body?: object;
  }) => {
    const baseHeaders = { "Content-Type": "application/json;charset=utf-8" };
    return await this._request(
      Methods.Put,
      this.apiEndpoint,
      args.path,
      args.auth,
      args.body,
      Object.assign(baseHeaders, args.headers ? args.headers : {})
    );
  };

  _download = async (args: {
    path: string;
    auth?: boolean;
    headers?: Record<string, string>;
  }) => {
    return await this._request(
      Methods.Get,
      this.apiEndpoint,
      args.path,
      args.auth,
      undefined,
      args.headers,
      true
    );
  };

  _request = async (
    method: Methods,
    apiEndpoint: string,
    path: string,
    auth?: boolean,
    body?: object,
    header?: Record<string, string>,
    asBlob?: boolean
  ) => {
    let baseHeaders = {};
    if (auth || this.needsAuth) {
      baseHeaders = {
        Authorization: `Bearer ${credentials.getToken()}`,
        WorkspaceId: credentials.getWorkspaceId(),
      };
    }

    const response = await fetch(`${apiEndpoint}${path}`, {
      method: method.toString(),
      headers: Object.assign(baseHeaders, header ? header : {}),
      body: body ? JSON.stringify(body) : undefined,
    }).catch((e) => {
      throw new UnexpectedError(`No response error with ${e}`);
    });

    if (response.ok) {
      if (asBlob) {
        return response.blob();
      }
      return response.json();
    }
    if (response.status < 500) {
      throw new ClientError(`ClientError with ${response}`);
    }
    throw new ServerError(`ServerError with ${response}`);
  };
}

export default BaseRepository;
