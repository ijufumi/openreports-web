enum Methods {
    Get = "GET",
    Put = "PUT",
    Post = "POST",
    Delete = "DELETE"
}
abstract class BaseRepository {
    private readonly apiEndpoint: string;

    constructor(apiEndpoint: string) {
        this.apiEndpoint = apiEndpoint;
    }

    get = async (args: { path: string, headers?: object }) => {
        return await this._request(Methods.Get, this.apiEndpoint, args.path, null, args.headers);
    }
    post = async (args: { path: string, headers?: object, body?: object}) => {
        return await this._request(Methods.Post, this.apiEndpoint, args.path, args.body, args.headers);
    }

    _request = async (method: Methods, apiEndpoint: string, path: string,
        body?: object, header?: object) => {

        return fetch(
            apiEndpoint,
            {
                method: method.toString(),
                body: body ? JSON.stringify(body) : "",
            }
        )
            .then((res) => res.json())
            .catch(e => console.log(e));
    }
}

export default BaseRepository;
