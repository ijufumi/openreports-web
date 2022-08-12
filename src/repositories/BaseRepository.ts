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
    return fetch(`${apiEndpoint}${path}`, {
      method: method.toString(),
      headers: header,
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  };
}

export default BaseRepository;
