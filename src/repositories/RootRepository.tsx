import {IUserRepository} from "./IUserRepository";
import UserRepository from "./impl/UserRepository";

export class RootRepository {
    readonly  user: IUserRepository;

    constructor() {
        this.user = new UserRepository();
    }
}
