import UserVo from "../vos/UserVo";
import GoogleAuthUrlVo from "../vos/GoogleAuthUrlVo";

interface LoginUseCase {
  login(args: { email: string; password: string }): Promise<UserVo | undefined>;

  getGoogleLoginUrl(): Promise<GoogleAuthUrlVo | undefined>;

  loginWithGoogle(args: { code: string }): Promise<UserVo | undefined>;
}

export default LoginUseCase;
