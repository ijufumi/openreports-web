import UserVo from "../vos/UserVo";
import GoogleAuthUrlVo from "../vos/GoogleAuthUrlVo";

interface LoginRepository {
  login(args: { email: string; password: string }): Promise<UserVo>;

  getGoogleLoginUrl(): Promise<GoogleAuthUrlVo | undefined>;

  loginWithGoogle(args: { code: string }): Promise<UserVo>;
}

export default LoginRepository;
