import User from "../vos/User";
import GoogleAuthUrl from "../vos/GoogleAuthUrl";

interface LoginRepository {
  login(args: { email: string; password: string }): Promise<User | undefined>;

  getGoogleLoginUrl(): Promise<GoogleAuthUrl | undefined>;

  loginWithGoogle(args: { code: string }): Promise<User | undefined>;
}

export default LoginRepository;
