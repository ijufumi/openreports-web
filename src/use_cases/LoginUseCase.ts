import UserVo from "../vos/responses/UserVo"
import GoogleAuthUrlVo from "../vos/responses/GoogleAuthUrlVo"

interface LoginUseCase {
  login(args: { email: string; password: string }): Promise<UserVo | undefined>

  getGoogleLoginUrl(): Promise<GoogleAuthUrlVo | undefined>

  loginWithGoogle(args: { code: string }): Promise<UserVo | undefined>
}

export default LoginUseCase
