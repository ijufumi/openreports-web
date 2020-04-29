import { IUserRepository } from "../IUserRepository";
import UserStore from "../../stores/UserStore";
import BaseRepository from "../BaseRepository";


export default class UserRepository extends BaseRepository implements IUserRepository {
    login = async (args : { username: string, password: string }) =>  {
        return this.post(null, "", , "null");
    };
}
