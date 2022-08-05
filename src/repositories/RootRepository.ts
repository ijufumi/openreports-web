import { IMemberRepository } from "./IMemberRepository";
import MemberRepository from "./impl/MemberRepository";
import { API_ENDPOINT } from "../config/const";

export class RootRepository {
  readonly user: IMemberRepository;

  constructor() {
    this.user = new MemberRepository(`${API_ENDPOINT}/members`);
  }
}
