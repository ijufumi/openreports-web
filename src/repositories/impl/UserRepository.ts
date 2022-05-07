import { IUserRepository } from "../IUserRepository";
import BaseRepository from "../BaseRepository";


export default class UserRepository extends BaseRepository implements IUserRepository {
    login = async (args : { username: string, password: string }) =>  {
        const { username, password } = args;
        return this.post({ path: "", body: {username, password}});
    };
}