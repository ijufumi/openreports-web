import UserVo from "../vos/responses/UserVo"
import GoogleAuthUrlVo from "../vos/responses/GoogleAuthUrlVo"

interface LoginRepository {
  login(args: { email: string; password: string }): Promise<UserVo>

  getGoogleLoginUrl(): Promise<GoogleAuthUrlVo | undefined>

  loginWithGoogle(args: { code: string }): Promise<UserVo>
}

export default LoginRepository
