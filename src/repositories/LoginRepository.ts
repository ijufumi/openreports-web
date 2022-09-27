import UserVo from "../vos/UserVo";
import GoogleAuthUrlVo from "../vos/GoogleAuthUrlVo";

interface LoginRepository {
  login(args: { email: string; password: string }): Promise<UserVo | undefined>;

  getGoogleLoginUrl(): Promise<GoogleAuthUrlVo | undefined>;

  loginWithGoogle(args: { code: string }): Promise<UserVo | undefined>;

  logout(): Promise<undefined>;
}

export default LoginRepository;
