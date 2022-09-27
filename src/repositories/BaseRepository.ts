import credentials from "../states/Credentials";

enum Methods {
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
}

abstract class BaseRepository {
  private readonly apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  protected needsAuth = false;

  get = async (args: { path: string; headers?: Record<string, string> }) => {
    return await this._request(
      Methods.Get,
      this.apiEndpoint,
      args.path,
      undefined,
      args.headers
    );
  };

  post = async (args: {
    path: string;
    headers?: Record<string, string>;
    body?: object;
  }) => {
    const baseHeaders = { "Content-Type": "application/json;charset=utf-8" };
    return await this._request(
      Methods.Post,
      this.apiEndpoint,
      args.path,
      args.body,
      Object.assign(baseHeaders, args.headers ? args.headers : {})
    );
  };

  _request = async (
    method: Methods,
    apiEndpoint: string,
    path: string,
    body?: object,
    header?: Record<string, string>
  ) => {
    let baseHeaders = {};
    if (this.needsAuth) {
      baseHeaders = { Authorization: `Bearer ${credentials.getToken()}` };
    }
    return fetch(`${apiEndpoint}${path}`, {
      method: method.toString(),
      headers: Object.assign(baseHeaders, header ? header : {}),
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  };
}

export default BaseRepository;
