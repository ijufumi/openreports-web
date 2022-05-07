import UserStore from "../stores/UserStore";

export interface IUserRepository {
    login(args : { username: string, password: string }): Promise<UserStore>
}
