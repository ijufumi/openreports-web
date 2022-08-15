import UserVo from "../vos/UserVo";
import GoogleAuthUrl from "../vos/GoogleAuthUrl";

export interface ILoginRepository {
  login(args: {
    username: string;
    password: string;
  }): Promise<UserVo | undefined>;

  getGoogleLoginUrl(): Promise<GoogleAuthUrl | undefined>;

  loginWithGoogle(args: { code: string }): Promise<UserVo | undefined>;
}
