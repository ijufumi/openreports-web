import { IUserRepository } from "./IUserRepository";
import UserRepository from "./impl/UserRepository";
import { API_ENDPOINT } from "../config/const";

export class RootRepository {
  readonly user: IUserRepository;

  constructor() {
    this.user = new UserRepository(`${API_ENDPOINT}`);
  }
}
