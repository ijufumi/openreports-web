import UserStore from "../stores/UserStore";

export interface ILoginRepository {
  login(args: {
    username: string;
    password: string;
  }): Promise<UserStore | undefined>;

  getGoogleLoginUrl(): Promise<string | undefined>;

  loginWithGoogle(args: {
    code: string;
    state: string;
  }): Promise<UserStore | undefined>;
}
