import credentials from "../states/Credentials";

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

  get = async (args: {
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

  post = async (args: {
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

  put = async (args: {
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

  _request = async (
    method: Methods,
    apiEndpoint: string,
    path: string,
    auth?: boolean,
    body?: object,
    header?: Record<string, string>
  ) => {
    let baseHeaders = {};
    if (auth || this.needsAuth) {
      baseHeaders = {
        Authorization: `Bearer ${credentials.getToken()}`,
        WorkspaceId: credentials.getWorkspaceId(),
      };
    }

    console.info(body);
    return fetch(`${apiEndpoint}${path}`, {
      method: method.toString(),
      headers: Object.assign(baseHeaders, header ? header : {}),
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return undefined;
      });
  };
}

export default BaseRepository;
