import { IUserRepository } from "../IUserRepository";
import UserStore from "../../stores/UserStore";


export default class UserRepository implements IUserRepository {
    login = async (args : { username: string, password: string }) =>  {
        return Promise.resolve(undefined);
    };
}
