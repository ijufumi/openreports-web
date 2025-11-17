import UserVo from "../dto/vos/responses/UserVo"
import GoogleAuthUrlVo from "../dto/vos/responses/GoogleAuthUrlVo"

interface LoginUseCase {
  login(args: { email: string; password: string }): Promise<UserVo | undefined>

  getGoogleLoginUrl(): Promise<GoogleAuthUrlVo | undefined>

  loginWithGoogle(args: { code: string }): Promise<UserVo | undefined>
}

export default LoginUseCase
