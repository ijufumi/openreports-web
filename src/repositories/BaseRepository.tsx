enum Methods {
    Get = "GET",
    Put = "PUT",
    Post = "POST",
    Delete = "DELETE"
}
abstract class BaseRepository {
    get = async (args: { apiEndpoint: string, path: string, headers: object }) => {
        return await this._request(Methods.Get, args.apiEndpoint, args.path, null, args.headers);
    }
    post = async (args: { apiEndpoint: string, path: string, headers: object, body: string}) => {
        return await this._request(Methods.Post, args.apiEndpoint, args.path, args.body, args.headers);
    }

    _request = async (method: Methods, apiEndpoint: string, path: string,
        body: string, header: object) => {
        const response = fetch(
            apiEndpoint,
            {
                method: method.toString(),
                body: body,
            }
        )
            .then((res) => res.json())
            .catch(e => console.log(e))

        return response;
    }
}

export default BaseRepository;
