import UserStore from "../stores/UserStore";

export interface IMemberRepository {
  login(args: { username: string; password: string }): Promise<UserStore>;

  getGoogleLoginUrl(): Promise<string>;

  loginWithGoogle(args: { code: string; state: string }): Promise<UserStore>;
}
